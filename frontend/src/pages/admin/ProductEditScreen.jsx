import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  
  // State definitions
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description || ''); // Default empty string agar null ho
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { 
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${userInfo.token}` 
        } 
      };
      
      await axios.put(
        `/api/products/${productId}`, 
        { name, price, brand, category, countInStock, description, image }, 
        config
      );
      
      alert('Product Updated Successfully!');
      navigate('/admin/productlist'); // Success ke baad redirect
    } catch (error) {
      alert(error.response?.data?.message || 'Update Failed');
    }
  };

  return (
    <div className="container mx-auto p-10 max-w-2xl">
      <Link to="/admin/productlist" className="text-blue-600 font-bold mb-5 block hover:underline">
        ← Go Back
      </Link>
      
      <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter text-gray-900">
        Edit <span className="text-blue-600">Product</span>
      </h1>
      
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-[2rem] shadow-2xl space-y-6 border border-gray-100">
        {/* Name Input */}
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Product Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" 
          />
        </div>

        {/* Price & Stock Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Price (₹)</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Stock Count</label>
            <input 
              type="number" 
              value={countInStock} 
              onChange={(e) => setCountInStock(e.target.value)} 
              className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" 
            />
          </div>
        </div>

        {/* Brand & Category Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Brand</label>
            <input 
              type="text" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)} 
              className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Category</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" 
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Description</label>
          <textarea 
            rows="4" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" 
            placeholder="Enter high-quality product details..."
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gray-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEditScreen;