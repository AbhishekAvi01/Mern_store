// const Order = require('../models/orderModel');

// // @desc    Create new order
// const addOrderItems = async (req, res) => {
//   const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error('No order items');
//   } else {
//     const order = new Order({
//       orderItems: orderItems.map((x) => ({ ...x, product: x._id, _id: undefined })),
//       user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice,
//     });
//     const createdOrder = await order.save();
//     res.status(201).json(createdOrder);
//   }
// };

// // @desc    Get logged in user orders
// const getMyOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.json(orders);
// };

// // @desc    Get order by ID
// const getOrderById = async (req, res) => {
//   const order = await Order.findById(req.params.id).populate('user', 'name email');
//   if (order) { res.json(order); } 
//   else { res.status(404); throw new Error('Order not found'); }
// };

// // @desc    Get all orders (Admin only)
// const getOrders = async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name');
//   res.json(orders);
// };

// // @desc    Update order to delivered
// const updateOrderToDelivered = async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();
//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404); throw new Error('Order not found');
//   }
// };



// // FIXED: Sabhi functions ko yahan export karna zaroori hai
// module.exports = { 
//   addOrderItems, 
//   getMyOrders, 
//   getOrderById, 
//   getOrders, 
//   updateOrderToDelivered 
// };






const Order = require('../models/orderModel');

// @desc    Naya order create karna
// @route   POST /api/orders
// @access  Private
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
      // Nayi IDs generate karne ke liye purani IDs ko undefined karein
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

// @desc    Logged-in user ke apne orders nikalna
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    ID se order dhundna
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) { 
    res.json(order); 
  } else { 
    res.status(404); 
    throw new Error('Order not found'); 
  }
};

// @desc    Saare orders nikalna (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

// @desc    Order ko delivered mark karna
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
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

// Sabhi functions ko export karna zaroori hai taaki route crash na ho
module.exports = { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  getOrders, 
  updateOrderToDelivered 
};