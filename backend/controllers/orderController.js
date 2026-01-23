
const Order = require('../models/orderModel');

const addOrderItems = async (req, res) => {
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice 
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      
      orderItems: orderItems.map((x) => ({ 
        ...x, 
        product: x._id, 
        _id: undefined 
      })),
      user: req.user._id, 
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};


const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};


const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) { 
    res.json(order); 
  } else { 
    res.status(404); 
    throw new Error('Order not found'); 
  }
};

const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404); 
    throw new Error('Order not found');
  }
};


module.exports = { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  getOrders, 
  updateOrderToDelivered 
};
