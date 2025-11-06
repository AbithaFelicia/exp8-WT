import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vendors');
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVendor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Vendors</h2>
      <Link to="/vendors/add">Add Vendor</Link>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor._id}>
            {vendor.name} - {vendor.email}
            <Link to={`/vendors/edit/${vendor._id}`}>Edit</Link>
            <button onClick={() => deleteVendor(vendor._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorList;
