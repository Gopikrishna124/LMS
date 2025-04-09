const mongoose=require('mongoose')

const {Schema}=mongoose


const lectureSchema=new Schema({
    title:String,
    videoUrl:String,
    public_id:String,
    freePreview:Boolean
})

const courseModel=new Schema({
     instructorId:String,
     instructorName:String,
     date:Date,
     title:String,
     category:String,
     level:String,
     primaryLanguage:String,
     subtitle:String,
     description:String,
     pricing:Number,
     images:String,
     welcomeMessage:String,
     objectives:String,
    students:[
        {
            studentId:String,
            studentName:String,
            studentEmail:String
        }
    ],
    curriculum:[lectureSchema],
    isPublished:Boolean
})

const Course=mongoose.model('Course',courseModel)
exports.module=Course