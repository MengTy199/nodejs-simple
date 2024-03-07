const Product = require("../models/product.model.js")

const getProducts = async (req, res) => {
    try {
      const product = await Product.find({});
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const getProduct = async (req, res) =>{
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
}

const createProduct= async (req, res) => {
    try {
      const product = await Product.create(req.body);
  
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}


const updateProduct = async (req, res) => {
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
  }

const  deleteProduct =  async (req, res)=>{
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
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}