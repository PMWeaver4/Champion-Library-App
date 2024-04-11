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
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,12),

    
        });
        const newUser = await user.save();


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });

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

//Get user's ID
router.get("/email/:email", async (req, res) => {
    try {
        let results = await User.find({email: req.params.email});
        res.status(200).json({
            Results: results,
        })
    } catch(err){
        console.log(err);

        res.status(500).json({
            Error: err,
        });
    }
});

// Admin access

router.use((req, res, next) => {
    try {
        const userId = req.userId;
        const user = await.findById(userId);

        if (user === null) {
            return res.status(401).json({ error: "Access Denied"});
        }
        req.isAdmin = user.isAdmin;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "User Not Found"});
    }
});


//login
router.post("/login/", async (req,res) => {
    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if(!user) throw new Error("User not found");

        let passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) throw new Error("Invalid Details");

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
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

router.put("/update/",Validate, async (req,res) => {
    try {
        const email = req.user.email;

        const usersUpdatedInformation = req.body;
        const updatedUser = await User.findOne({email: email});
        console.log(updatedUser);
        if (updatedUser === null) {
            res.status(404).json({error: "User not found Wahoooo whooa yah."});
            return;
        }
        if (usersUpdatedInformation.password !== undefined) {
            const salt = bcrypt.genSaltSync();
            usersUpdatedInformation.password = bcrypt.hashSync(usersUpdatedInformation.password, salt);
        }
       
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

router.delete("/delete/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

            if (!user) throw new Error("User not found");

            res.status(200).json({
                Deleted: 1,
            });
        } catch (err) {
            res.status(500).json({
                Error: err,
            });
        }
    });

module.exports = router;