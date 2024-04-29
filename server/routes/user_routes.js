const router = require("express").Router();

//Importing bcrypt
const bcrypt = require("bcrypt");

//Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//Importing User Table
const User = require("../models/user");

const Validate = require("../middleware/validate");

const PASS = process.env.PASS;

//const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");
const user = require("../models/user");

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: PASS,
  },
});
async function mail(toEmail, emailSubject, emailText) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "info@demomailtrap.com", // sender address
    to: toEmail, // list of receivers
    subject: emailSubject, // Subject line
    text: emailText, // plain text body
  });
}

//creating Username
router.post("/create/", async (req, res) => {
  try {
    //get info for a new user schema
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
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
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      approved: newUser.approved,
    };

    let usersToEmail = await User.find({ isAdmin: true });
    let toEmail = usersToEmail.map((obj) => obj.email); //not just 0th element!
    let emailSubject = `New User Request from ${newUser.firstName} ${newUser.lastName}`;
    let emailText = `${newUser.firstName} ${newUser.lastName} is requesting to join South Meadows Library with ${newUser.email} as their username/email`;
    console.log(toEmail, emailSubject, emailText);
    mail(toEmail, emailSubject, emailText);

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

// Display all users
router.get("/all/", async (req, res) => {
  try {
    //show all users, display the populate info
    let results = await User.find()
      .populate(["firstName", "lastName", "email"])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

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
    const user = await User.findOne({ email: email });
    //if no match
    if (!user) throw new Error("User not found");
    //check the password
    let passwordMatch = await bcrypt.compare(password, user.password);
    //if no match
    if (!passwordMatch) throw new Error("Invalid Details");
    //assign a new web token for a day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });

    res.status(200).json({
      Msg: "User signed in!",
      User: user,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err.message,
    });
  }
});

// Add password recovery
router.post("/forgotPassword", async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({ email });
     if(!user) {
      return res.json({Status: "User does not exist."})
    }
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({email: user.email, id: user._id},secret,{expiresIn: "10min"});
    const link = `http://localhost:3001/react/resetPassword/${user._id}/${token}`;
  } catch (error) {}
});


router.get("/resetPassword/:_id/:token", async (req, res) => {
  const {id, token} = req.params
  const user = await User.findOne({ email });
  if(!user) {
   return res.json({Status: "User does not exist."})
 }
 const secret = JWT_SECRET + user.password;
 try{
  const verify =jwt.verify(token, secret);
  const encryptedPassword= await bcrypt.hash(password,10);
  await User.updateOne(
    {
    _id:id,
    },
    {
      $set: {
        password: encryptedPassword,
      },
    }
  );
  res.json({ status: "Password Updated"});
 
  }catch (error) {
    res.json({status: "Something went wrong"})
  } 
});
 





  // let usersToEmail = await User.find({ isAdmin: true });
  // let toEmail = usersToEmail.map((obj) => obj.email); //not just 0th element!
  // let emailSubject = `New User Request from ${newUser.firstName} ${newUser.lastName}`;
  // let emailText = `${newUser.firstName} ${newUser.lastName} is requesting to join South Meadows Library with ${newUser.email} as their username/email`;
  // console.log(toEmail, emailSubject, emailText);
  // mail(toEmail, emailSubject, emailText);




//Update user's information
//need to insert validate middleware declared above because of user_routes' position before validation in the index.js
router.put("/update/", Validate, async (req, res) => {
  try {
    //accessing validate allows us to get the current user's email
    const email = req.user.email;
    //get the info to update user
    const usersUpdatedInformation = req.body;
    //match the user by email
    const updatedUser = await User.findOne({ email: email });
    //if no user match
    if (updatedUser === null) {
      res.status(404).json({ error: "User not found Wahoooo whooa yah." });
      return;
    }
    //if no password match
    if (usersUpdatedInformation.password !== undefined) {
      const salt = bcrypt.genSaltSync();
      usersUpdatedInformation.password = bcrypt.hashSync(
        usersUpdatedInformation.password,
        salt
      );
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
      const oldUser = await User.findOne({ email: email });
      //match the user by email
      const updatedUser = await User.findOne({ email: email });
      //if no user match
      if (updatedUser === null) {
        res.status(404).json({ error: "User not found Wahoooo whooa yah." });
        return;
      }

      //otherwise, update that user w/ new info
      await User.updateOne({ _id: updatedUser._id }, usersUpdatedInformation);

      if (
        usersUpdatedInformation.approved == true &&
        oldUser.approved == false
      ) {
        let userToEmail = await User.find({ email: email });
        let toEmail = userToEmail[0].email;
        let emailSubject = `Welcome to South Meadows Library`;
        let emailText = `Congratulations! You have been approved to use the South Meadows Library.`;
        mail(toEmail, emailSubject, emailText);
      }

      res.status(200).json({
        status: "User information updated successfully",
        firstName: usersUpdatedInformation.firstName,
        lastName: usersUpdatedInformation.lastName,
        email: usersUpdatedInformation.email,
        password: usersUpdatedInformation.password,
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


