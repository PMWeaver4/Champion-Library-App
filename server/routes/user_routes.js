const router = require("express").Router();

//Importing bcrypt
const bcrypt = require("bcrypt");

//Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//Importing User Table
const User = require("../models/user");

const Validate = require("../middleware/validate");

//creating Username
router.post("/create/", async(req,res) => {
    try{
        //get info for a new user schema
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            //use bcrypt to encrypt password
            password: bcrypt.hashSync(req.body.password,12),
        });
        //save that user with new info
        const newUser = await user.save();

        //create a web token that will allow the user to navigate throughout web application
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });
        //display user data and token - this is helpful in postman
        res.status(200).json({
            Created: newUser,
            Token: token,
        });
    }catch(err){
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
        let results = await User.find().populate( ["firstName", "lastName", "email"])
        .select({
            text: 1,
            createdAt: 1,
            updatedAt: 1,
        });

        res.status(200).json({
            Created: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});

//Get user's email - we're using email as username
router.get("/email/:email", Validate, async (req, res) => {
    try {
        if (req.user.isAdmin == true){
        //find by parameter
        let results = await User.find({email: req.params.email});
        res.status(200).json({
            Results: results,
        })
    } 
    }catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});



//login
router.post("/login/", async (req,res) => {
    try {
        //get email and password from the request
        let { email, password } = req.body;
        //find the use based on email
        const user = await User.findOne({ email: email });
        //if no match
        if(!user) throw new Error("User not found");
        //check the password
        let passwordMatch = await bcrypt.compare(password, user.password);
        //if no match
        if(!passwordMatch) throw new Error("Invalid Details");
        //assign a new web token for a day
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "30 days",
        });

        res.status(200).json({
            Msg: "User signed in!",
            User: user,
            Token: token
        });

      

    } catch(err){
        console.log(err);
        res.status(500).json({
            Error: err.message,
        });
    }
});

// Add password recovery
//router.put("/passwordreset/", async (req, res) => {
//    try { 
//        let { passwordreset } = req.body;
//        password: bcrypt.hashSync(req.body.password,12),

//    }
// });

//Update user's information
//need to insert validate middleware declared above because of user_routes' position before validation in the index.js
router.put("/update/",Validate, async (req,res) => {
    try {
        //accessing validate allows us to get the current user's email
        const email = req.user.email;
        //get the info to update user
        const usersUpdatedInformation = req.body;
        //match the user by email
        const updatedUser = await User.findOne({email: email});
        //if no user match
        if (updatedUser === null) {
            res.status(404).json({error: "User not found Wahoooo whooa yah."});
            return;
        }
        //if no password match
        if (usersUpdatedInformation.password !== undefined) {
            const salt = bcrypt.genSaltSync();
            usersUpdatedInformation.password = bcrypt.hashSync(usersUpdatedInformation.password, salt);
        }
       //otherwise, update that user w/ new info
       await User.updateOne({_id: updatedUser._id}, usersUpdatedInformation);
        

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
router.put("/adminUpdate/:email",Validate, async (req,res) => {
    try {
        if (req.user.isAdmin == true){
  
        //accessing validate allows us to get the current user's email
        const email = req.params.email;
        //get the info to update user
        const usersUpdatedInformation = req.body;
        //match the user by email
        const updatedUser = await User.findOne({email: email});
         //if no user match
        if (updatedUser === null) {
            res.status(404).json({error: "User not found Wahoooo whooa yah."});
            return;
        }

       //otherwise, update that user w/ new info
       await User.updateOne({_id: updatedUser._id}, usersUpdatedInformation);
        
    
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
        if (!req.user.isAdmin){
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