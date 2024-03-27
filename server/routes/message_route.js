const router = require("express").Router();

const Message = require("../models/message");


//display all in a room
router.get("/get_room/:room", async(req,res) => {
    try{       
        let filtered = await Message.find({room: req.params.room}).populate("room").select(["when", "user", "body"])
        
        res.status(200).json({
            Results: filtered
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            Error:err,
    });
}
})

// create a message
router.post("/create/", async(req,res) => {
    
    try{
        //create a count to give messages incremental id number, might be useful later...
        const Count = await Message.countDocuments({});
        
        let post = new Message({
            msg_id: Count,
            room: req.body.room_id,
            body: req.body.body,
            user: req.user._id,
        });
        
        //save created object to the database
        const newPost = await post.save();
        console.log(Count);
        res.status(200).json({
            Created: newPost,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            Error:err,
        });
    }
});


//update
router.put("/update/:room/:id", async (req, res) => {
    try {
        //use params to match message with request to update
        const filter = {room: req.params.room, msg_id: req.params.id};
        const update = {room: req.body.room,body: req.body.body};
        
        //update in mongoose
        const updated = await Message.findOneAndUpdate(filter, update,{new: true});
        //display updated message
        res.status(200).json({
            Results: updated,

        });
    } catch (err) {
        res.status(500).json({
            Error: err,
        });
    }
});

//delete......
router.delete("/delete/:id", async (req, res) => {
    try {
        //find the requested message and delete it
        const message = await Message.findByIdAndDelete(req.params.id);


            if (!message) throw new Error("Message not found");

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