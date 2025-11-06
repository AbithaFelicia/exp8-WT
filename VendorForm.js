import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (id) {
      fetchVendor();
    }
  }, [id]);

  const fetchVendor = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/vendors/${id}`);
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
        await axios.put(`http://localhost:5000/api/vendors/${id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/vendors', form);
      }
      navigate('/vendors');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Vendor' : 'Add Vendor'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default VendorForm;
