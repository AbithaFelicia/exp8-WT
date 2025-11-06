const express = require('express');
const router = express.Router();

module.exports = (productsFile, vendorsFile, readData, writeData) => {
  // GET all products
  router.get('/', (req, res) => {
    try {
      const products = readData(productsFile);
      const vendors = readData(vendorsFile);
      const populatedProducts = products.map(p => ({
        ...p,
        vendor: vendors.find(v => v.id === p.vendor)
      }));
      res.json(populatedProducts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET single product
  router.get('/:id', (req, res) => {
    try {
      const products = readData(productsFile);
      const product = products.find(p => p.id === req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      const vendors = readData(vendorsFile);
      product.vendor = vendors.find(v => v.id === product.vendor);
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST new product
  router.post('/', (req, res) => {
    try {
      const products = readData(productsFile);
      const newProduct = {
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        vendor: req.body.vendor,
        category: req.body.category,
        stock: req.body.stock,
        createdAt: new Date()
      };
      products.push(newProduct);
      writeData(productsFile, products);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PUT update product
  router.put('/:id', (req, res) => {
    try {
      const products = readData(productsFile);
      const index = products.findIndex(p => p.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Product not found' });
      products[index] = { ...products[index], ...req.body };
      writeData(productsFile, products);
      res.json(products[index]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // DELETE product
  router.delete('/:id', (req, res) => {
    try {
      const products = readData(productsFile);
      const index = products.findIndex(p => p.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Product not found' });
      products.splice(index, 1);
      writeData(productsFile, products);
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
