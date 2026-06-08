const productService = require("../services/product.service");

class ProductController {
  // GET /api/products
  getAllProducts(req, res) {
    try {
      const products = productService.findAll();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/products/:id
  getProductById(req, res) {
    try {
      const product = productService.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // POST /api/products
  createProduct(req, res) {
    try {
      const newProduct = productService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/products/:id/status
  updateProductStatus(req, res) {
    try {
      const updatedProduct = productService.updateStatus(
        Number(req.params.id),
        req.body.status,
      );
      res.status(200).json({
        success: true,
        message: "Product status updated",
        data: updatedProduct,
      });
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  updateProduct(req, res) {
    try {
      const updatedProduct = productService.updateProduct(
        req.params.id,
        req.body,
      );

      res.status(200).json({
        success: true,
        message: "Product updated",
        data: updatedProduct,
      });
    } catch (error) {
      if (error.message === "Product not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  deleteProduct(req, res) {
  try {
    const deletedProduct = productService.deleteById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Product deleted",
      data: deletedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
}

module.exports = new ProductController();
