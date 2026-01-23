import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate('/shipping');
    else if (!cart.paymentMethod) navigate('/payment');
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`); // Success ke baad redirect
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto p-10 min-h-screen">
      <Toaster />
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border shadow-sm">
          <h2 className="text-xl font-black uppercase italic mb-6">Review Bag</h2>
          {cart.cartItems.map((item, index) => (
            <div key={index} className="flex justify-between py-4 border-b last:border-0">
              <span className="font-bold text-[10px] uppercase">{item.name} x {item.qty}</span>
              <span className="font-black text-blue-600 italic">₹{(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#111827] text-white p-10 rounded-[3rem] shadow-2xl h-fit">
          <h2 className="text-2xl font-black mb-8 border-b border-gray-800 pb-4 italic tracking-tighter uppercase">Summary</h2>
          <div className="flex justify-between text-2xl font-black text-blue-500 mb-8 italic">
            <span>Total Bill:</span> <span>₹{cart.totalPrice}</span>
          </div>
          <button onClick={placeOrderHandler} disabled={isLoading || cart.cartItems.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all">
            {isLoading ? 'Processing...' : 'Place Order Now →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;