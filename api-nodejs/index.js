
require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;


let products = [
  {
    id: 1,
    name: "HP Laptop",
    price: 50,
    status: "active",
  },
  {
    id: 2,
    name: "Keyboard",
    price: 120,
    status: "inactive",
  },
];

//health check 
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    environment: NODE_ENV,
    message: "Server is healthy",
  });
});

//get all products
app.get("/api/products", (req, res) => {
  res.status(200).json({
    success: true,
    data: products,
  });
});

//get product by id
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

//post new product
app.post("/api/products", (req, res) => {
  const { name, price, status } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "name and price are required",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    status: status || "active",
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
});

//update product status
app.put("/api/products/:id/status", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "status is required",
    });
  }

  product.status = status;

  res.status(200).json({
    success: true,
    message: "Product status updated",
    data: product,
  });
});

//start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});