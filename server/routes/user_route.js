const router = require("express").Router();

//Importing bcrypt
const bcrypt = require("bcrypt");

//Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//Importing User Table
const User = require("../models/user");

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

//login
router.post("/login", async (req,res) => {
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