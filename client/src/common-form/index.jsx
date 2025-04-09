
import { Button } from "@/components/ui/button.jsx"
import FormControls from "./form-controls.jsx"


function CommonForm({handleSubmit,formControls=[],formData,setFormData,ButtonText,isbuttonDisabled,moveToNextRef}){
    return (
      <form onSubmit={handleSubmit}>
          <FormControls formControls={formControls} formData={formData} setFormData={setFormData} moveToNextRef={moveToNextRef}/>
        
         <Button type='submit' className='mt-5 w-full' disabled={isbuttonDisabled} >{ButtonText || 'Submit'}</Button>
      </form>
    )
}

export default CommonForm