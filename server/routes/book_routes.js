const router = require("express").Router();
const Book = require("../models/book");


router.post("/create/", async(req,res) => {
    console.log(req);
    try{     
            let book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            user: req.user.email,
            rentedUser: "",
            checkedout: "",
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


//[PUT] Adding Update Endpoint
router.put("/update/:isbn", async (req, res) => {
    try {
        //pluck the book out of available books

        //make sure user can update this book
        if(req.user.email === Book.user)
        { const bookToUpdate = await Book.findOne({isbn: req.params.isbn}).exec()
    } else {throw error;}
        


        const bookUpdated = await bookToUpdate.updateOne( {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            genre: req.body.genre,
            condition: req.body.condition,
            rentedUser: req.body.rentedUser,
            checkedout: req.body.checkedOut,
        }  ).exec();

        const bookReturnUPdated = await Book.findOne({isbn: req.body.isbn}).exec();

        res.status(200).json({
            Updated: bookReturnUPdated,
            Results: bookReturnUPdated,
        });
    } catch (err) {
        res.status(500).json({
            Error: err,
        });
    }
});

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

