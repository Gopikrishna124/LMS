import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

const FormControls=({formControls=[],formData,setFormData,moveToNextRef,changeSelect})=>{
    console.log('formData',formData)
    
     
    //......................................

    function renderComponentByType(controlItem){
        let element=null;
       switch(controlItem.componentType){
        case 'input':
             element= <Input
             id={controlItem.name}
             name={controlItem.name}
             placeholder={controlItem.placeholder}
             type={controlItem.type}
             value={formData[`${controlItem.name}`]}
             onChange={(e)=>setFormData(e,controlItem.name)}
             onKeyDown={moveToNextRef}
             />
         
       
             break;
        case 'select':
            element= <Select  value={formData[`${controlItem.name}`]} onValueChange={(e)=>changeSelect(controlItem.name,e)}>
                <SelectTrigger>
                    <SelectValue placeholder={controlItem.label}/>
                </SelectTrigger>
                <SelectContent>
                    {
                      controlItem.options && controlItem.options.length>0 ?
                       controlItem.options.map((option)=>(
                           <SelectItem id={option.id} value={option.id}>{option.label}</SelectItem>
                       )) : null
                    }
                </SelectContent>
            </Select>;
            break;
        case 'textarea':
            element= <Textarea
            id={controlItem.name}
            value={formData[`${controlItem.name}`]}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            onChange={(e)=>setFormData(e,controlItem.name)}
            onKeyDown={moveToNextRef}/>
        
            break;
        default:
            element=<Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}/>;
            break;
       }
      return element;
    }
    return(
        <div className="flex flex-col gap-3"> 
            {
                formControls.map((controlItem)=>{
                   return <div key={controlItem.name}>
                     <Label>{controlItem.label}</Label>
                      
                      {renderComponentByType(controlItem)}

                    </div>
                })
            }
        </div>

    )

}

export default FormControls