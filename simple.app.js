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

//get all products
app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({message:`No product by Id : ${id}`})
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);


    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update product by id
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(400).json({ message: "Product not found!" });
    }

    const updateProduct = await Product.findById(id);

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete product by id

app.delete("/api/products/:id" , async (req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({message : "Product not Found"})
        }
        res.status(201).json(product)

    }catch (error){
        res.status(500).json({message: "Product deleted successfully"})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
