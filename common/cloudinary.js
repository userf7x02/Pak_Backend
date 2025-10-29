const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file) => {
  try {
    console.log("📤 Uploading to Cloudinary...");
    
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'car-ads',
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    console.log("✅ Cloudinary Upload Success:", result.secure_url);
    
    // Temporary file delete karo
    const fs = require('fs');
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    
    return result.secure_url;
    
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

module.exports = { cloudinary, uploadToCloudinary };