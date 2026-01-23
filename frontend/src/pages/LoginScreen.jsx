import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { setCredentials } from '../slices/authSlice'; // Action
import api from '../utils/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check karein ki user pehle se login to nahi hai
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Backend se login request
      const { data } = await api.post('/users/login', { email, password });
      
      // Redux Store aur LocalStorage dono mein data save hoga
      dispatch(setCredentials({ ...data })); 
      
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-50">
      <form onSubmit={submitHandler} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-4xl font-black mb-8 text-center text-gray-900 tracking-tighter">SIGN IN</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="example@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input 
            type="password" 
            placeholder="********" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-black hover:bg-gray-900 transition-all shadow-lg shadow-blue-100 uppercase tracking-widest">
          Login Now
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;