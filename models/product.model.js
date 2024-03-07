const mongoose = require("mongoose")


//create schema
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
    },

    quantity: {
      type: Number,
      required: [true, "Please provide a product quantity"],
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, //this will create createdAt and updatedAt as
  }
);

//create product modal 
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;