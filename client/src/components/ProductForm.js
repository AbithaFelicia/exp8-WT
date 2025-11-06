import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', price: '', vendor: '', category: '', stock: 0 });
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchVendors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vendors');
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/products', form);
      }
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
        <select name="vendor" value={form.vendor} onChange={handleChange} required>
          <option value="">Select Vendor</option>
          {vendors.map(vendor => (
            <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
          ))}
        </select>
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
