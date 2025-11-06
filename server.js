const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage paths
const vendorsFile = path.join(__dirname, 'data', 'vendors.json');
const productsFile = path.join(__dirname, 'data', 'products.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Helper functions
const readData = (file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]');
  }
  return JSON.parse(fs.readFileSync(file));
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Routes
app.use('/api/vendors', require('./routes/vendors-file')(vendorsFile, readData, writeData));
app.use('/api/products', require('./routes/products-file')(productsFile, vendorsFile, readData, writeData));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
