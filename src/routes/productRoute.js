import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("List of products");
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`Details of product with ID: ${productId}`);
});

router.post("/", (req, res) => {
  res.send("Create a new product");
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`Update product with ID: ${productId}`);
});

router.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  res.send(`Delete product with ID: ${productId}`);
});

export default router;
