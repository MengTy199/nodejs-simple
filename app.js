const express = require("express");
//mongoose
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const Product = require("./models/product.model.js");

const ProductRoute = require('./routes/product.route.js')

//middleware 
app.use(express.json());
app.use(express.urlencoded( { extended: false } )); //for access to req.body

// routes
app.use("/api/products", ProductRoute)


mongoose
  .connect(
    "mongodb+srv://limmengti:HlqXqnypsdZtalaT@cluster0.sw74j3n.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected!"))
  .catch(() => {
    console.log("err");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
