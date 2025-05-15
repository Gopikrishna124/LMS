const mongoose=require('mongoose')

const {Schema}=mongoose


const lectureSchema=new Schema({
    lectureId:String,
    viewed:Boolean,
    dateViewed:Date
})
const ProgressSchema=new Schema({
    userId:String,
    courseId:String,
    completed:Boolean,
    completionDate:Date,
    lecturesProgress:[lectureSchema],
    
})

const Progress=mongoose.model('Progress',ProgressSchema)
exports.module=Progress
