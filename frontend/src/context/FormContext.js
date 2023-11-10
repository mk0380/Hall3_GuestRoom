import { createContext, useState } from "react";

export const FormContext = createContext({})


const FormProvider = ({children})=>{


    const [no_person_global, set_no_person_global] = useState(0)
    const [name1_global, set_name1_global] = useState("")
    const [room_no_global, set_room_no_global] = useState("")
    const [room_type_global, set_room_type_global] = useState("")
    const [name2_global, set_name2_global] = useState("")
    const [name3_global, set_name3_global] = useState("")
    const [mobile1_global, set_mobile1_global] = useState(0)
    const [mobile2_global, set_mobile2_global] = useState(0)
    const [mobile3_global, set_mobile3_global] = useState(0)
    const [purpose_global, set_purpose_global] = useState("")
    const [relationship1_global, set_relationship1_global] = useState("")
    const [relationship2_global, set_relationship2_global] = useState("")
    const [relationship3_global, set_relationship3_global] = useState("")
    const [name_global, set_name_global] = useState("")
    const [roll_global, set_roll_global] = useState(0)
    const [email_global, set_email_global] = useState("")
    const [mobile_global, set_mobile_global] = useState(0)



    return(<FormContext.Provider value={{room_type_global, set_room_type_global,room_no_global, set_room_no_global,no_person_global, mobile3_global, relationship3_global,name3_global, set_name3_global, set_relationship3_global, set_mobile3_global, set_no_person_global,name1_global, set_name1_global,name2_global, set_name2_global,mobile1_global, set_mobile1_global,mobile2_global, set_mobile2_global,relationship1_global, set_relationship1_global,purpose_global, set_purpose_global,relationship2_global, set_relationship2_global,name_global, set_name_global,roll_global, set_roll_global,email_global, set_email_global,mobile_global, set_mobile_global}}>
        {children}
    </FormContext.Provider>)
}

export default FormProvider