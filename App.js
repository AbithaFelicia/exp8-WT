import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VendorList from './components/VendorList.js';
import VendorForm from './components/VendorForm.js';
import ProductList from './components/ProductList.js';
import ProductForm from './components/ProductForm.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Multi-Vendor Marketplace</h1>
          <nav>
            <Link to="/vendors">Vendors</Link>
            <Link to="/products">Products</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendors/add" element={<VendorForm />} />
            <Route path="/vendors/edit/:id" element={<VendorForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
