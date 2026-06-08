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
    products.find((p) => p.id === Number(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  create(productData) {
    const { id, status, ...rest } = productData;

    const newProduct = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...rest,
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
  
  updateProduct(id, productData) {
    const product = this.findById(Number(id));

    const { id: _, ...safeData } = productData;

    Object.assign(product, safeData);

    return product;
  }

  deleteById(id) {
    const index = products.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      throw new Error("Product not found");
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    return deletedProduct;
  }
}

module.exports = new ProductService();
