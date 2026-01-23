// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2; // Sahi tarika require ke liye
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const router = express.Router();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'mern_store_products',
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//   },
// });

// const upload = multer({ storage });

// router.post('/', upload.single('image'), (req, res) => {
//   if (req.file) {
//     res.send(req.file.path);
//   } else {
//     res.status(400).send({ message: 'No file uploaded' });
//   }
// });

// module.exports = router;







const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    url: req.file.path, // Yeh URL aapko Postman mein wapas milega
  });
});

module.exports = router;