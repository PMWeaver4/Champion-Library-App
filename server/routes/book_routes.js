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

//get specific book
router.get("/book/:_id", async (req, res) => {
    try {
        let results = await Book.find({_id: req.params._id});
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


//filter
router.get("/filter/", async (req, res) => {
    try {

        
    const {genre,author,user} = req.query;
    const whatever = {}
    if(genre != null) {
        whatever.genre=genre
    }
    if(author!=null) {
        whatever.author=author
    }
    if(user!=null){
        whatever.user=user
    }
    
    

    //
       console.log(`this is the ${genre} and the ${author}`);
       
        let results = await Book.find(whatever)     
        .sort({createdAt: 1});

        res.status(200).json({
            Results: results,
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            Error: err,
        });
    }
}
)


//[PUT] Adding Update Endpoint
router.put("/update/:_id", async (req, res) => {
    try {
        const bookToUpdate = await Book.findOne({_id: req.params._id}).exec()
        const updatedValues = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            genre: req.body.genre,
            condition: req.body.condition,
            rentedUser: req.body.rentedUser,
            checkedout: req.body.checkedOut,
        }  
       await bookToUpdate.updateOne(updatedValues).exec();

        res.status(200).json({
            Updated: updatedValues,
            Results: updatedValues,
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

