const express = require("express");
const mongoose = require("mongoose");
// const customMiddleware  = require("./middleware/index")


const app = express();

// conenction to mongodb
mongoose.connect('mongodb+srv://admin:admin45@cluster0.xnt75bz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
// app.use(customMiddleware);


app.use(express.json())

// routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))
app.use(require("./routes/user"))

// server configurations....
app.listen(3000, () => console.log("Server started listening on port: 3000"));
