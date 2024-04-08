//? Importing dotenv, and applying it (giving us access to process.env)
require('dotenv').config();

//? Importing Express
const express = require("express");

//? Importing Cors
const cors = require("cors");

//? Importing Mongoose
const mongoose = require("mongoose");

// //? Connection string URL variable from .env file
const MONGODB = process.env.MONGOOSE_STRING + process.env.DB_NAME;

//? Assign Express
const app = express();

//? Import controller/s
 const { bookRoutes, userRoutes, itemRoutes, fetchRoutes, libraryRoutes  } = require("./routes");

//? Import validation middleware
const validateSession = require("./middleware/validate");

mongoose.connect(MONGODB);
//? sTORING THE CONNECTION STATUS
// const db = mongoose.connection;

//? Assigning a variable from .env
const PORT = process.env.PORT;

//? Middleware to allow JSON to be accepted by our HTTP server
app.use(express.json());

//? Allow parsing of query strings
app.use(express.urlencoded({ extended: true }));

//? Allow our endpoints to be interacted with via web browser
app.use(cors());

//? Using the controllers
app.use("/user", userRoutes);
app.use(validateSession);
//validate before doing postcontroller
app.use("/book", bookRoutes);
app.use("/item", itemRoutes);
app.use("/fetch", fetchRoutes);
app.use("/library", libraryRoutes);


//? Initial spin up of the Express server
app.listen(PORT, () => {
    try {
      console.log("*".repeat(10));
      console.log(`Server is connected: ${PORT}`);
    } catch (err) {
      console.log("Error connecting", err);
    }
  });
