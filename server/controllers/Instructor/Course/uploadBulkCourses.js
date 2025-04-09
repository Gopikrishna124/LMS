
const Course=require('../../../models/courseModel').module
const cloudinary=require('../../../helpers/cloudinary').module


const uploadMediaToCloudinary=async(filePath)=>{
    try {
    const result=await cloudinary.uploader.upload(filePath,{
        resource_type:"auto",
    })
    return result;      
    } catch (error) {
        console.log(error)
        throw new Error('Error uploading to cloudinary')
    }
}

const bulkUploadController=async(req,res)=>{
    try {
        
        const uploadPromises=req.files.map((file)=>(
            uploadMediaToCloudinary(file.path)
        ))

        const result=await Promise.all(uploadPromises)

         res.json(({
            data:result,
            message:'bulk upload successfull',
            error:false,
            success:true
        }))
    
    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

exports.module=bulkUploadController