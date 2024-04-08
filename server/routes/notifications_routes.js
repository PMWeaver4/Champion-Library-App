const router = require("express").Router();
const notifications = require("../models/notifications");


router.all("/user/", async(req,res) => {
    try {
        let user = new Notifications ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,12),

    
        });
        const notifications = await user.save();


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

router.delete("", async(req,res) => {
    try {
        const notifications = await User.findByIdAndDelete(req.params.id);

        if (!notifications) throw new Error("Book/item not found");

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