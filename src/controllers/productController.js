import productService from "../services/productService.js";


const getProducts = async (req, res) => {
  //request query
  const products = await productService.getProducts(req.query);
  console.log(req.headers.cookie);

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  console.log (req.user);
  try {
    const data = await productService.createProduct(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await productService.updateProduct(id, req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await productService.deleteProduct(id);
    
    res.status(200).send("product deleted successfully");
  } catch (error) {
    error.status(500).send("Product not deleted");
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
