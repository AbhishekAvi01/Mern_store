import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice'; // Path confirm karein
import api from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCartHandler = (p) => {
    dispatch(addToCart({ ...p, qty: 1 }));
    toast.success(`${p.name} added to cart!`, {
      position: 'top-center',
      style: { borderRadius: '12px', background: '#111', color: '#fff', fontSize: '11px', fontWeight: 'bold' }
    });
  };

  if (loading) return <div className="text-center py-20 font-black text-gray-300">LOADING...</div>;

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-10">
      <Toaster />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-black mb-10 text-gray-900 uppercase tracking-tighter border-l-4 border-blue-600 pl-4">
          LATEST <span className="text-blue-600">COLLECTION</span>
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((p) => (
            <div key={p._id} className="group bg-white rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 h-full">
              
              {/* Product Image Holder */}
              <Link to={`/product/${p._id}`} className="bg-gray-50/50 aspect-square flex items-center justify-center p-6 overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 text-[7px] font-black uppercase tracking-widest rounded shadow-sm ${p.countInStock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {p.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </Link>

              {/* Info Section - No Description for Clean Look */}
              <div className="p-4 flex flex-col flex-grow text-center">
                <Link to={`/product/${p._id}`}>
                  <h2 className="text-[10px] font-black text-gray-900 uppercase truncate mb-1 hover:text-blue-600">{p.name}</h2>
                </Link>
                <p className="text-blue-600 font-black text-sm mb-4 italic">₹{p.price}</p>
                
                <button 
                  onClick={() => addToCartHandler(p)}
                  disabled={p.countInStock === 0}
                  className={`mt-auto py-2.5 rounded-xl font-black uppercase tracking-widest text-[8px] transition-all transform active:scale-95 ${
                    p.countInStock > 0 ? 'bg-gray-900 text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;