import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";

const createProduct = async (data, files) => {
  const uploadedFiles = await uploadFile(files);




  const createdProduct = await Product.create({
    ...data,
    imageUrls: uploadedFiles.map((item) => item?.url),

  });
 await createdProduct.save();
  return createdProduct;
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);

  

  await Product.findByIdAndDelete(id);
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found.",
    };
  }

  if (product.stock < 1) {
    throw {
      message: "Product not available",
    };
  }

  return product;
};

const getProducts = async (query) => {
  const { brands, category, min, max, limit, name, offset, createdBy } = query;

  const sort = JSON.parse(query.sort || "{}");
  const filters = {};

  if (brands) filters.brand = { $in: brands.split(",") };
  if (category) filters.category = category;
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (name) filters.name = { $regex: name, $options: "i" };

  if (createdBy) filters.createdBy = createdBy;

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

  return products;
};

const updateProduct = async (id, data, files) => {
  const product = await getProductById(id);



  const updateData = data;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles.map((item) => item?.url);
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedProduct;
};

export default {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
};