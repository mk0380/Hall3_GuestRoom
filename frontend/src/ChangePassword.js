import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import BACKEND_URL from './important_data/backendUrl';
import { useNavigate } from 'react-router-dom'


const ChangePassword = () => {

    const navigate = useNavigate()

    const [disabled, setDisabled] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [otp, setOTP] = useState("")

    useEffect(() => {
        if(!localStorage.getItem("id")){
          navigate('/login')
        }
      }, [])

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const validateOTP = async () => {
        const { data } = await axios.post(BACKEND_URL + "/setPasswordValidateOTP", { otp,id:localStorage.getItem("id"),newPassword}, config)
        if (data.success) {
            navigate('/dashboard')
        }

    }

    const passwordChangeHandler = async () => {

        const { data } = await axios.post(BACKEND_URL + "/setPassword", {newPassword,id:localStorage.getItem("id")}, config)

        if (data.success) {
            setDisabled(true)

        }

    }

    return (
        <div className='home'>
            <div className="container">
                <h2>Guest Room Booking Portal</h2>
                <h3>HALL OF RESIDENCE III</h3>
                <hr />
                <div className="login">
                    <h2>Change Password</h2>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="New Password"
                            type='password'
                            value={newPassword}
                            disabled={disabled}
                            onChange={(ev) => setNewPassword(ev.target.value)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined" disabled={disabled} onClick={passwordChangeHandler} >Change Password</Button>

                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="OTP"
                            type='number'
                            disabled={!disabled}
                            value={otp}
                            onChange={(ev) => setOTP(ev.target.value)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined" disabled={!disabled} onClick={validateOTP}>Validate OTP</Button>

                    </Box>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
