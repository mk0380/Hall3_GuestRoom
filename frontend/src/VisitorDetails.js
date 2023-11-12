import { Box, Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { FormContext } from './context/FormContext'

const VisitorDetails = ({tabChange, tab}) => {

  const {no_person_global, set_purpose_global, set_mobile1_global,set_mobile2_global,set_mobile3_global,set_name1_global,set_name2_global,set_name3_global,set_relationship1_global,set_relationship2_global,set_relationship3_global} = useContext(FormContext)

  const [visitor, setVisitor] = useState({
    name1:"",
    name2:"",
    name3:"",
    phone1:"",
    phone2:"",
    phone3:"",
    purpose:"",
    relationship1:"",
    relationship2:"",
    relationship3:""
  })

  const changeHandler = (ev)=>{
    setVisitor({...visitor, [ev.target.name]:ev.target.value})
    set_mobile1_global(visitor.phone1)
    set_relationship1_global(visitor.relationship1)
    set_purpose_global(visitor.purpose)
    set_name2_global(visitor.name2)
    set_mobile2_global(visitor.phone2)
    set_relationship2_global(visitor.relationship2)
    set_name3_global(visitor.name3)
    set_mobile3_global(visitor.phone3)
    set_relationship3_global(visitor.relationship3)
    set_name1_global(visitor.name1)
  }

  const checkVisitor = ()=>{

    var res1 = false
    var res2 = false
    var res3 = false
    
    if(visitor.name1.trim().length===0 || visitor.phone1.trim().length===0 || visitor.purpose.trim().length===0 || visitor.relationship1.trim().length===0){
      res1 = true
    }
    if(no_person_global>1 && (visitor.name2.trim().length===0 || visitor.phone2.trim().length===0 || visitor.relationship2.trim().length===0)){
      res2 = true
    }
    if(no_person_global>2 && (visitor.name3.trim().length===0 || visitor.phone3.trim().length===0 || visitor.relationship3.trim().length===0)){
      res2 = true
    }

    if(res1 || res2 || res3){
      return true
    }else{
      return false
    }
  }

  return (
    <div className={""+((tab==="1" || tab==="3")?"hidden":"")}>
      {/* <p className='info'>If Double Bed room is booked for two people, both names must be entered, else leave the space for Person 2</p> */}
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Person 1 Name"
          value={visitor.name1}
          name='name1'
          onkeydown="return /[a-z]/i.test(event.key)"
          onChange={changeHandler}
          error={visitor.name1.trim().length===0}
        />
        { no_person_global>1 && <TextField
          id="outlined-required"
          label="Person 2 Name"
          name='name2'
          value={visitor.name2}
          onChange={changeHandler}
          error={visitor.name2.trim().length===0}
        />}
        { no_person_global>2 && <TextField
          id="outlined-required"
          label="Person 3 Name"
          name='name3'
          value={visitor.name3}
          onChange={changeHandler}
          error={visitor.name3.trim().length===0}
        />}
      </Box>

      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
          <TextField
          id="outlined-number"
          label="Phone:Person 1"
          type="number"
          required
          name='phone1'
          value={visitor.phone1}
          onChange={changeHandler}
          error={visitor.phone1.trim().length===0}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />
        { no_person_global>1 && <TextField
          id="outlined-number"
          label="Phone:Person 2"
          type="number"
          required
          name='phone2'
          value={visitor.phone2}
          onChange={changeHandler}
          error={visitor.phone2.trim().length===0}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />}
        { no_person_global>2 && <TextField
          id="outlined-number"
          label="Phone:Person 3"
          type="number"
          required
          name='phone3'
          value={visitor.phone3}
          onChange={changeHandler}
          error={visitor.phone3.trim().length===0}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />}
        </Box>

      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
          <TextField
          id="outlined-number"
          label="Purpose of Visit"
          type="text"
          name='purpose'
          required
          value={visitor.purpose}
          onChange={changeHandler}
          error={visitor.purpose.trim().length===0}

        // InputLabelProps={{
        //   shrink: true,
        // }}
        />
        </Box>

      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete="off">
          <TextField
          id="outlined-number"
          label="Relationship of Person 1 with Indentor"
          type="text"
          name='relationship1'
          required
          value={visitor.relationship1}
          onChange={changeHandler}
          error={visitor.relationship1.trim().length===0}

        // InputLabelProps={{
        //   shrink: true,
        // }}
        />
        { no_person_global>1 && <TextField
          id="outlined-number"
          label="Relationship of Person 2 with Indentor"
          type="text"
          name='relationship2'
          required
          value={visitor.relationship2}
          onChange={changeHandler}
          error={visitor.relationship2.trim().length===0}
          
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />}
        { no_person_global>2 && <TextField
          id="outlined-number"
          label="Relationship of Person 3 with Indentor"
          type="text"
          name='relationship3'
          required
          value={visitor.relationship3}
          onChange={changeHandler}
          error={visitor.relationship3.trim().length===0}
          
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />}
        </Box>

      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
                  <Button variant="outlined" style={{marginRight:"1rem"}} onClick={(_)=>tabChange('1')}>Prev</Button>
                  <Button variant="outlined" disabled={checkVisitor()} onClick={(_)=>tabChange('3')}>Next</Button>
        </Box>
    </div>
  )
}

export default VisitorDetails
