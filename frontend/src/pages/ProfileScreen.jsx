// frontend/src/pages/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // Backend API call
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Orders load nahi huye:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">My Order History</h2>
      
      {loading ? (
        <p>Checking your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-blue-50 p-10 rounded-[2rem] text-center">
          <p className="text-xl font-bold text-blue-900">Aapne abhi tak koi order nahi kiya hai.</p>
          <button onClick={() => window.location.href='/'} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl">Shop Now</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 font-mono">ID: {order._id}</p>
                <p className="font-bold text-lg">Total: ₹{order.totalPrice}</p>
                <p className="text-sm text-gray-500">Date: {order.createdAt.substring(0, 10)}</p>
              </div>
              <div className="text-right">
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {order.isPaid ? 'PAID' : 'NOT PAID'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;