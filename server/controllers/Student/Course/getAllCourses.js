
const Course=require('../../../models/courseModel').module

//getting courses added by instructor in student view not student opted courses

const getAllStudentViewCourses=async(req,res)=>{
  
   const {category=[],level=[],primaryLanguage=[],sortBy='price-lowtohigh'}=req.query
    // console.log('category',category)
    // console.log('level',level)
   const filters={}
   let sort={}


    if(category.length){
        filters.category={$in:category.split(',')}
    }
    if(level.length){
        filters.level={$in:level.split(',')}
    }
    if(primaryLanguage.length){
       filters.primaryLanguage={$in:primaryLanguage.split(',')}
    }

  
    switch(sortBy){
        case 'price-lowtohigh':
          sort.pricing=1
          break;
        case 'price-hightolow':
            sort.pricing=-1
            break;
        case 'title-atoz':
            sort.title=1
            break;
       case 'title-ztoa':
             sort.title=-1
             break;
       default:
           sort.pricing=1
           break;
    }

    // console.log('filters',filters)
    // console.log('sort',sort)

    try {
        const coursesList=await Course.find(filters).sort(sort)
    
        res.json({
            data:coursesList,
            success:true,
            error:false,
            message:'successfully fetched studentView courses list'
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

exports.module= getAllStudentViewCourses