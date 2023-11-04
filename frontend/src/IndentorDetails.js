import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'

const IndentorDetails = ({tabChange, tab}) => {

  const [check1, setcheck1] = useState(false)
  const [check2, setcheck2] = useState(false)

  const [indentor, setIndentor] = useState({
    name:"",
    phone:"",
    roll:"",
    email:"",
  })

  const changeHandler = (ev)=>{
    setIndentor({...indentor, [ev.target.name]:ev.target.value})
    // console.log(visitor);
  }

  const checkIndentor = ()=>{
    if(indentor.name.trim().length===0 || indentor.email.trim().length===0 || indentor.roll.trim().length===0 || indentor.phone.trim().length===0 || !check1 || !check2){
      return true
    }
    return false
  }

  return (
    <div className={""+((tab==="1" || tab==="2")?"hidden":"")}>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          required
          name='name'
          value={indentor.name}
          onChange={changeHandler}
          error={indentor.name.trim().length===0}
          id="outlined-required"
          label="Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Roll no"
          type='number'
          name='roll'
          value={indentor.roll}
          onChange={changeHandler}
          error={indentor.roll.trim().length===0}
        />
      </Box>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Email (IITK)"
          type='email'
          name='email'
          value={indentor.email}
          onChange={changeHandler}
          error={indentor.email.trim().length===0}
        />
        <TextField
          required
          id="outlined-required"
          label="Phone"
          type='number'
          name='phone'
          value={indentor.phone}
          onChange={changeHandler}
          error={indentor.phone.trim().length===0}
        />
      </Box>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <p style={{margin:"1rem"}}>Booking request OTP will be send to : <span style={{fontWeight:"bold"}}>{indentor.email}</span></p>
      </Box>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch'},
        }}
        noValidate
        autoComplete="off">
        <FormGroup>
          <FormControlLabel checked={check1} control={<Checkbox value={check1} onChange={(_)=>setcheck1(!check1)}/>} label="I will be held responsible if any of these information is found false. I also undertake all the financial responsibility arising out of non-payment of loss or damage to the hall properties etc. I have read the rules and regulations of the guest room/ordinary room of Hall No. 3, and visitor and I will follow the same." />
          <FormControlLabel checked={check2} control={<Checkbox value={check2} onChange={(_)=>setcheck2(!check2)}/>} label="I declare my complete responsibility for the conduct of my guests throughout their stay in the Guest Room. I, hereby, submit to bear the consequences of any misconduct or damage on the part of my guest during their stay in the Guest Room." />
        </FormGroup>
      </Box>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <Button variant="outlined" style={{marginRight:"1rem", marginTop:"0.5rem"}} onClick={(_)=>tabChange('2')}>Prev</Button>
        <Button variant="outlined" disabled={checkIndentor()} style={{marginTop:"0.5rem"}}>Submit</Button>
      </Box>
    </div>
  )
}

export default IndentorDetails