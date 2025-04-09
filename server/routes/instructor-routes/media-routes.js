const express=require('express')
const router=express.Router()

 const multer=require('multer')
 const upload=multer({dest:'uploads/'})

 const uploadController=require('../../controllers/Instructor/uploadFilesController').module
 const deleteController=require('../../controllers/Instructor/deleteFilesController').module
 const bulkUploadController=require('../../controllers/Instructor/Course/uploadBulkCourses').module


 router.post('/upload',upload.single('file'),uploadController)
 router.delete('/delete/:id',deleteController)
 router.post('/bulk-upload',upload.array('files',10),bulkUploadController)

 exports.module=router