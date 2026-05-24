import uploadToCloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";

// add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    // 1. Parse incoming text data (like name, price, description)
    let productData = JSON.parse(req.body.productData);
   
    // 2. Grab multiple files from multer (req.files)
    let images = req.files; 
   
    let imageUrls = [];

    // 3. If images exist, upload them sequentially or concurrently
    if (images && images.length > 0) {
      const uploadPromises = images.map(async (file) => {
        const cloudinaryResponse = await uploadToCloudinary(file.buffer);
       
        return cloudinaryResponse.secure_url; // Collect secure URL strings
      });

      // Wait for all images to upload completely
      imageUrls = await Promise.all(uploadPromises);
      
    }
    // 4. Merge text data with the newly created array of image URLs
    const newProduct = await Product.create({ 
      ...productData, 
      image: imageUrls 
    });

    // 5. Send back success response
    res.status(201).json({ 
      success: true, 
      message: "Product added successfully", 
      product: newProduct 
    });

  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// product list : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// individual product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// change product stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
