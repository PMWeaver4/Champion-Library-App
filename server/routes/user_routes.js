const router = require("express").Router();

//Importing bcrypt
const bcrypt = require("bcrypt");

//Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//
const crypto = require("crypto");

//Importing User Table
const User = require("../models/user");

const Validate = require("../middleware/validate");

const { Email, EmailTypes } = require("../Email/Email");

// password recovery
// validate that a user has that email and token function
async function validateTokenEmail(email, token) {
  const user = await User.findOne({ email: email.toLowerCase(), resetToken: token });
  if (user === null) {
    return false;
  }
  if (user.resetToken === undefined || user.resetTokenExp === undefined) {
    return false;
  }
  const date = new Date();
  if (date >= user.resetTokenExp) {
    return false;
  }
  return true;
}

// generate/reset new token
function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}

const EXPIRATION_DELAY = 1000 * 60 * 30; // 30 minutes expiration time

// create reset password token and send email
router.post("/requestResetPassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send();
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user === null) {
      return res.status(404).json({
        Error: "User not found",
      });
    }
    user.resetToken = generateResetToken();
    user.resetTokenExp = Date.now() + EXPIRATION_DELAY;
    await user.save();
    Email.sendWithTemplate({
      recipient: user.email,
      email_type: EmailTypes.PasswordReset,
      template_variables: {
        user_firstName: user.firstName,
        resetPasswordLink: `${process.env.FRONTEND_URL}resetPassword?email=${user.email}&resetToken=${user.resetToken}`,
      },
    });
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// update old password with new password
router.put("/resetPassword", async (req, res) => {
  try {
    const { email, resetToken, password } = req.body;
    if (!email || !resetToken || password === undefined || password.length === 0) {
      return res.status(400).send();
    }
    const user = await User.findOne({ email: email.toLowerCase(), resetToken: resetToken });
    if (user === null) {
      return res.status(404).send();
    }

    if (!validateTokenEmail(email, resetToken)) {
      return res.status(401).send();
    }
    user.password = bcrypt.hashSync(password, 12);
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// validate token and email association
router.post("/validateResetCredentials", async (req, res) => {
  try {
    const { email, resetToken } = req.body;
    if (!email || !resetToken) {
      return res.status(400).send();
    }
    const isValid = await validateTokenEmail(email.toLowerCase(), resetToken);
    if (!isValid) {
      return res.status(401).send();
    }
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//creating Username
router.post("/create/", async (req, res) => {
  try {
    //get info for a new user schema
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      //use bcrypt to encrypt password
      password: bcrypt.hashSync(req.body.password, 12),
    });
    //save that user with new info
    const newUser = await user.save();

    // removed token creation from here
    // returnData created because we should not be sending password information back (security issues)
    const returnData = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email.toLowerCase(),
      isAdmin: newUser.isAdmin,
      approved: newUser.approved,
    };
    // isolates admin emails so we can send admin related emails to admins
    const admins = await User.find({ isAdmin: true }, { email: true });
    const adminEmails = admins.map((admin) => admin.email);
    console.log(admins);
    console.log(adminEmails);

    // send email to the user signing up
    Email.sendWithTemplate({
      recipient: newUser.email,
      email_type: EmailTypes.NewUserPending,
      template_variables: {
        username: newUser.firstName,
      },
    });
    if (adminEmails.length > 0) {
      Email.bulkSendWithTemplate({
        recipients: adminEmails,
        email_type: EmailTypes.PendingUserNotifToAdmin,
        template_variables: {
          admin: "Admin",
          user_fullname: `${newUser.firstName} ${newUser.lastName}`,
          user_email: newUser.email,
          login_link: process.env.FRONTEND_URL,
        },
      });
    }
    res.status(200).json({
      // only contains necessary data
      Created: returnData,
      // token removed, we should not be sending the token back either at the creation of user since the user needs to be approved, token should be returned when user is allowed to login
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

// Display all accepted users
router.get("/allAccepted/", async (req, res) => {
  try {
    //show all users, display the populate info
    let results = await User.find({ approved: "Accepted" }, { firstName: 1, lastName: 1, email: 1 });

    res.status(200).json({
      Created: results,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

// Display all pending users
router.get("/allPending/", async (req, res) => {
  try {
    //show all users, display the populate info
    let results = await User.find({ approved: "Pending" }, { firstName: 1, lastName: 1, email: 1 });

    res.status(200).json({
      Created: results,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      Error: err,
    });
  }
});

//login
router.post("/login/", async (req, res) => {
  try {
    //get email and password from the request
    let { email, password } = req.body;
    //find the use based on email
    const user = await User.findOne({ email: email.toLowerCase() });
    //if no match
    if (!user) throw new Error("User not found");
    // if not approved
    if (user.approved != "Accepted") throw new Error("User is not approved yet.");
    //check the password
    let passwordMatch = await bcrypt.compare(password, user.password);
    //if no match
    if (!passwordMatch) throw new Error("Invalid Details");
    //assign a new web token for a day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });

    const userReturnInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      approved: user.approved,
    };

    res.status(200).json({
      Msg: "User signed in!",
      User: userReturnInfo,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err.message,
    });
  }
});

//Update user's information
//need to insert validate middleware declared above because of user_routes' position before validation in the index.js
router.put("/update/", Validate, async (req, res) => {
  try {
    //accessing validate allows us to get the current user's email
    const email = req.user.email;
    //get the info to update user
    const usersUpdatedInformation = req.body;
    //match the user by email
    const updatedUser = await User.findOne({ email: email.toLocaleLowerCase() });
    //if no user match
    if (updatedUser === null) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    //if no password match
    if (usersUpdatedInformation.password !== undefined) {
      const salt = bcrypt.genSaltSync();
      usersUpdatedInformation.password = bcrypt.hashSync(usersUpdatedInformation.password, salt);
    }
    //otherwise, update that user w/ new info
    await User.updateOne({ _id: updatedUser._id }, usersUpdatedInformation);

    res.status(200).json({
      status: "User information updated successfully",
      firstName: usersUpdatedInformation.firstName,
      lastName: usersUpdatedInformation.lastName,
      email: usersUpdatedInformation.email,
      password: usersUpdatedInformation.password,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
//Update user's information
//need to insert validate middleware declared above because of user_routes' position before validation in the index.js
router.put("/adminUpdate/:email", Validate, async (req, res) => {
  try {
    if (req.user.isAdmin == true) {
      //accessing validate allows us to get the current user's email
      const email = req.params.email;
      //get the info to update user
      const usersUpdatedInformation = req.body;
      //keep the old information to compare (important for if status was changed to approved)
      let user = await User.findOne({ email: email.toLocaleLowerCase() });
      //match the user by email
      //if no user match
      if (user === null) {
        res.status(404).json({ error: "User not found." });
        return;
      }

      const isApproving = usersUpdatedInformation.approved != "Pending" && user.approved == "Pending";
      user = await User.findOneAndUpdate({ email }, usersUpdatedInformation, { new: true });

      //otherwise, update that user w/ new info
      if (isApproving) {
        Email.sendWithTemplate({
          recipient: user.email,
          email_type: EmailTypes.NewUserAccountStatus,
          template_variables: {
            username: user.firstName,
            subject_status: user.approved,
            account_status: user.approved.toUpperCase(),
          },
        });
      }

      res.status(200).json({
        status: "User information updated successfully",
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/delete/:_id", Validate, async (req, res) => {
  try {
    //user can delete themselves
    if (!req.user.isAdmin) {
      //matches based on user id provided via Validate
      const user = await User.findByIdAndDelete(req.user.id);
      //oh, no user, no work
      if (!user) throw new Error("User not found");

      res.status(200).json({
        Deleted: 1,
      });
    } else {
      //if user is an admin, let them delete any user as specified in the parameter
      const user = await User.findByIdAndDelete(req.params._id);
      //oh, no user, no work
      if (!user) throw new Error("User not found");

      res.status(200).json({
        Deleted: 1,
      });
    }
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;

//Trang
