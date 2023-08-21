const cloudinary = require('cloudinary').v2; // Cloudinary Storage 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // A multer storage engine for Cloudinary.

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
  
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'yapCamp', // cloudinary에 있는 folder
        allowedFormats : ['jpg','jpeg','png']
    }
})

module.exports = {
    cloudinary,
    storage
}