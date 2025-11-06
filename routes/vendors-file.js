const express = require('express');
const router = express.Router();

module.exports = (vendorsFile, readData, writeData) => {
  // GET all vendors
  router.get('/', (req, res) => {
    try {
      const vendors = readData(vendorsFile);
      res.json(vendors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET single vendor
  router.get('/:id', (req, res) => {
    try {
      const vendors = readData(vendorsFile);
      const vendor = vendors.find(v => v.id === req.params.id);
      if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
      res.json(vendor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST new vendor
  router.post('/', (req, res) => {
    try {
      const vendors = readData(vendorsFile);
      const newVendor = {
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        createdAt: new Date()
      };
      vendors.push(newVendor);
      writeData(vendorsFile, vendors);
      res.status(201).json(newVendor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PUT update vendor
  router.put('/:id', (req, res) => {
    try {
      const vendors = readData(vendorsFile);
      const index = vendors.findIndex(v => v.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Vendor not found' });
      vendors[index] = { ...vendors[index], ...req.body };
      writeData(vendorsFile, vendors);
      res.json(vendors[index]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // DELETE vendor
  router.delete('/:id', (req, res) => {
    try {
      const vendors = readData(vendorsFile);
      const index = vendors.findIndex(v => v.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Vendor not found' });
      vendors.splice(index, 1);
      writeData(vendorsFile, vendors);
      res.json({ message: 'Vendor deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
