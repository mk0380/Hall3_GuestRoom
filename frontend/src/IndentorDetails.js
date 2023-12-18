import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { FormContext } from './context/FormContext'
import axios from 'axios'
import BACKEND_URL from './important_data/backendUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const IndentorDetails = ({tabChange, tab}) => {

  const navigate = useNavigate()

  const [check1, setcheck1] = useState(false)
  const [check2, setcheck2] = useState(false)
  const [otp, setOtp] = useState(false)
  const [otp_password, setOtp_password] = useState("")
  const [requestId, setRequestId] = useState("")
  const [disableOTP, setDisableOTP] = useState(false)

  const { no_person_global,name1_global, name2_global, name3_global, mobile1_global, mobile2_global, mobile3_global,purpose_global,relationship1_global,relationship2_global,relationship3_global, room_type_global, room_no_global } = useContext(FormContext)

  const [indentor, setIndentor] = useState({
    name:"",
    phone:"",
    roll:"",
    email:"",
  })

  const changeHandler = (ev)=>{
    setIndentor({...indentor, [ev.target.name]:ev.target.value})
  }

  const checkIndentor = ()=>{
    if(indentor.name.trim().length===0 || indentor.email.trim().length===0 || indentor.roll.trim().length===0 || indentor.phone.trim().length===0 || !check1 || !check2 || indentor.email.substring(indentor.email.length-10,indentor.email.length)!=="iitk.ac.in" || indentor.phone.length!==10){
      return true
    }
    return false
  }

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  const sumbitHandler =async ()=>{
    const details = {
      ...indentor, no_person_global,name1_global, name2_global, name3_global, mobile1_global, mobile2_global, mobile3_global,purpose_global,relationship1_global,relationship2_global,relationship3_global, room_type_global, room_no_global,checkArrivalDate:localStorage.getItem("arrivalDate"),checkDepartureDate:localStorage.getItem("departureDate")
    }

    const {data} = await axios.post(BACKEND_URL+'/details',details,config)

    if(data.success){
      setOtp(true)
      setRequestId(data.id)
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }

  const checkOTPHandler =async ()=>{
    const {data} = await axios.post(BACKEND_URL+'/checkOTP',{otp_password, requestId, room_no_global, arrivalDate:localStorage.getItem("arrivalDate"), departureDate:localStorage.getItem("departureDate") },config)
    setOtp_password("")
    if(data.success){
      toast.success(data.message)
      setDisableOTP(true)
      localStorage.clear()
      navigate('/')
    }else{
      toast.error(data.message)
    }

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
          disabled={otp}
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
          disabled={otp}
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
          disabled={otp}
          onChange={changeHandler}
          error={indentor.email.trim().length===0 || indentor.email.substring(indentor.email.length-10,indentor.email.length)!=="iitk.ac.in"}
        />
        <TextField
          required
          id="outlined-required"
          label="Phone"
          type='number'
          name='phone'
          disabled={otp}
          value={indentor.phone}
          onChange={changeHandler}
          error={indentor.phone.trim().length===0 || indentor.phone.length!==10}
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
        <FormGroup style={{display:otp?"none":""}}>
          <FormControlLabel className='info' checked={check1} control={<Checkbox value={check1} onChange={(_)=>setcheck1(!check1)}/>} label="I will be held responsible if any of these information is found false. I also undertake all the financial responsibility arising out of non-payment of loss or damage to the hall properties etc. I have read the rules and regulations of the guest room/ordinary room of Hall No. 3, and visitor and I will follow the same." />
          <FormControlLabel className='info' checked={check2} control={<Checkbox value={check2} onChange={(_)=>setcheck2(!check2)}/>} label="I declare my complete responsibility for the conduct of my guests throughout their stay in the Guest Room. I, hereby, submit to bear the consequences of any misconduct or damage on the part of my guest during their stay in the Guest Room." />
        </FormGroup>
        <FormGroup style={{display:otp?"":"none"}}>
        <TextField
          required
          id="outlined-required"
          label="OTP"
          type='text'
          name='otp_password'
          disabled={disableOTP}
          value={otp_password}
          onChange={(ev)=>setOtp_password(ev.target.value)}
          error={otp_password.trim().length===0}
        />
        </FormGroup>
      </Box>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <Button variant="outlined" disabled={otp} style={{marginRight:"1rem", marginTop:"0.5rem"}} onClick={(_)=>tabChange('2')}>Prev</Button>
        {!otp && <Button variant="outlined" disabled={checkIndentor()} style={{marginTop:"0.5rem"}} onClick={sumbitHandler}>Submit</Button>}
        {otp && <Button variant="outlined" disabled={otp_password.length===0} style={{marginTop:"0.5rem"}} onClick={checkOTPHandler}>Check</Button>}
      </Box>
    </div>
  )
}

export default IndentorDetails