let products = [
  {
    id: 1,
    name: "HP Laptop",
    price: 50,
    description: "A high-performance laptop for work and play.",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Keyboard",
    price: 100,
    description: "A mechanical keyboard with customizable RGB lighting.",
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "mouse",
    price: 50,
    description:
      "A wireless mouse with ergonomic design and long battery life.",
    status: "In Stock",
  },
  {
    id: 4,
    name: "table",
    price: 200,
    description:
      "A sturdy and stylish table for your workspace or dining area.",
    status: "Out of Stock",
  },
];

class ProductService {
  findAll() {
    return products;
  }

  findById(id) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  create(productData) {
    const { id, status, ...productWithoutIdAndStatus } = productData;
    const newProduct = {
      id: products.length + 1,
      ...productWithoutIdAndStatus,
      status: status || "In Stock",
    };

    products.push(newProduct);
    return newProduct;
  }

  updateStatus(id, status) {
    const product = this.findById(id);
    product.status = status;
    return product;
  }
}

module.exports = new ProductService();
