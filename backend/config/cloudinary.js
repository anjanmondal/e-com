import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    // 1. Use upload_stream for raw file buffers
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: "products",
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      }, 
      (error, result) => {
        if (error) return reject(error);
        resolve(result); // This contains the secure_url
      }
    );
    
    // 2. Write the buffer data into the stream
    uploadStream.end(buffer);
  });
};

export default uploadToCloudinary;