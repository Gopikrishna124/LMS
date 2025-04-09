import { createSlice } from "@reduxjs/toolkit"


const initialState={
   data:[
    {
        title: "",
        videoUrl: "",
        freePreview: false,
        public_id: "",
    }
   ]
}


const  CurriculumFormData=createSlice({
    name:'Curriculum',
    initialState,
    reducers:{
        changeCurriculumReduxData:(state,action)=>{
           state.data=action.payload
        },
        addNewLecture:(state,action)=>{
            state.data.push({
                
                title: "",
                videoUrl: "",
                freePreview: false,
                public_id: "",
                
            })
        },
        refresh:(state,action)=>{
          state.data=[
            {
                title: "",
                videoUrl: "",
                freePreview: false,
                public_id: "",
            }
          ]
        }
    }
})

export const {changeCurriculumReduxData,addNewLecture,refresh}=CurriculumFormData.actions
export default CurriculumFormData.reducer