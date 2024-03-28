const router = require("express").Router();
const Book = require("../models/book");


router.post("/create/", async(req,res) => {
    try{     
            let book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            user: "test",
            rentedUser: "",
            isbn: req.body.isbn,
            genre: req.body.genre,
            img: req.body.img

        });

        const newBook = await book.save();

        res.status(200).json({
            Created: newBook,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            Error: err,
        });
    }
});

// Display all book endpoint
  router.get("/all", async (req, res) => {
    try {

        let results = await Book.find().populate( ["title", "author", "description", "user", "genre", "rentedUser", "isbn"])
        .select({
            text: 1,
            createdAt:1,
            updatedAt: 1,
        });

        // const newBook = await post.save();
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

// [PUT] Adding Update Endpoint
// router.put("/update/:name", async (req, res) => {
//     try {
//         //pluck the room out of available rooms
//         const roomToUpdate = await Room.findOne({name: req.params.name}).exec();
//         //add a user function
//         let newUsers = [...roomToUpdate.addedUsers];
//         newUsers.push(...req.body.addedUsers);
//         //remove a user function
//         newUsers = newUsers.filter((user) => !req.body.removedUsers.includes(user));
//         //update the room
//         const roomUpdated = await roomToUpdate.updateOne( {
//             name: req.body.name,
//             description: req.body.description,
//             addedUsers: newUsers,
            

//         }  ).exec();

//         const roomReturnUPdated = await Room.findOne({name: req.body.name}).exec();

//         res.status(200).json({
//             Updated: roomReturnUPdated,
//             Results: roomReturnUPdated,
//         });
//     } catch (err) {
//         res.status(500).json({
//             Error: err,
//         });
//     }
// });

// [DELETE] - Remove a book.
router.delete("/delete/:id", async (req, res) => {
    try {
        //find book and delete
        //**not used???!?!?!?!?!?!?!!?
        const book = await Book.findByIdAndDelete(req.params.id);

            if (!Book) throw new Error("Book not found");

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

