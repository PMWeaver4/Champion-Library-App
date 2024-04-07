
const router = require("express").Router();
const axios = require('axios');
const Book = require("../models/book");


router.get("/bookSearch/:isbn", async (req,res) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.params.isbn}`
      );
      const data = await response.json();
    
    res.status(200).json({
        Results: data,
      })

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
})

router.get("/searchSubmit/:isbn", async (req,res) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.params.isbn}`
      );
      const isbn = parseInt(req.params.isbn);
      console.log(isbn, typeof isbn);
      const data = await response.json();
      
      let book = new Book({
          ibsn: isbn,
        title: data.items[0].volumeInfo.title,
        author: data.items[0].volumeInfo.authors,
        description: data.items[0].volumeInfo.description,
        user: req.user.email,
        // ibsn: data.items[0].volumeInfo.industryIdentifiers[0].identifier,
        img:  data.items[0].volumeInfo.imageLinks.thumbnail,
        genre: data.items[0].volumeInfo.categories,

      });

      const newBook = await book.save();
    console.log(newBook.isbn);
    res.status(200).json({
        Created: newBook,
        
      })

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
})

router.get("/getImage/:isbn", async (req,res) => {
    try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.params.isbn}`
        );
        const data = await response.json(); 
        const imgLink = data.items[0].volumeInfo.imageLinks.thumbnail;
        const img = await axios.get(imgLink, { responseType: 'arraybuffer' })
        console.log(img);
        res.status(200).json({
           Results: "img"
        })
    } catch (error) {
        console.error('Error fetching data: ', error);
      }
})

module.exports = router;



