
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
    price: 100,
    status: "inactive",
  },
  {
    id: 3,
    name: "mouse",
    price: 50,
    status: "inactive",
  },
  {
    id: 4,
    name: "table",
    price: 200,
    status: "inactive",
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
      status: status || "active",
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
