const cloudinary=require('cloudinary').v2
const env=require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})



const deleteMediaFromCloudinary=async(publicId)=>{
   
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
        throw new Error("failed to delete asset from cloudinary")
    }
}  

exports.module=cloudinary
