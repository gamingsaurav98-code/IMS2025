import Product from "../models/Product.js";


const getProducts = async() => {
 const products = await Product.find();

  return products;
};

const getProductById = (id) => {

  const product = Product.findById(id);

  return product;
};

const createProduct = async(data) => await Product.create(data);



const updateProduct = async(id, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, data, { new:true });

  return updatedProduct;
};


const deleteProduct = async (id) => {

await Product.findByIdAndDelete(id);

};



export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
