const deleteMedia=require('../../helpers/cloudinary').deleteMediaFromCloudinary
const cloudinary=require('../../helpers/cloudinary').module

const deleteFilesController=async(req,res)=>{
    try {
        const id=req.params.id
        if(!id){
       throw new Error('Asset Id is required')
        }
 
       await cloudinary.uploader.destroy(id) 
         

        res.json({
            message:'Asset deleted successfully',
            success:true,
            error:false
          }) 
    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
           })            
    }
}

exports.module=deleteFilesController