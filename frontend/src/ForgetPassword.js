import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import BACKEND_URL from './important_data/backendUrl';
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()

    const [disabled, setDisabled] = useState(true)
    const [otpcheck, setOtpcheck] = useState(true)
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [otp, setOTP] = useState("")

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const sendOTP = async () => {
        const { data } = await axios.post(BACKEND_URL + "/forgetPasword", { email }, config)
        if (data.success) {
            setDisabled(false)
        }
    }

    const validateOTP = async () => {
        const { data } = await axios.post(BACKEND_URL + "/validateOTP", { otp, email }, config)
        if (data.success) {
            setOtpcheck(false)
        }

    }

    const passwordChangeHandler = async () => {
        const { data } = await axios.post(BACKEND_URL + "/passwordChange", { newPassword, email }, config)
        if (data.success) {
            navigate('/login')
        }

    }

    return (
        <div className='home'>
            <div className="container">
                <h2>Guest Room Booking Portal</h2>
                <h3>HALL OF RESIDENCE III</h3>
                <hr />
                <div className="login">
                    <h2>Forget Password</h2>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            type='email'
                            value={email}
                            disabled={!disabled}
                            onChange={(ev) => setEmail(ev.target.value)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined" onClick={sendOTP} disabled={!disabled}>Send OTP</Button>

                    </Box>
                    {otpcheck && <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="OTP"
                            type='number'
                            disabled={disabled}
                            value={otp}
                            onChange={(ev) => setOTP(ev.target.value)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Box>}
                    {otpcheck && <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined" disabled={disabled} onClick={validateOTP}>Validate OTP</Button>

                    </Box>}

                    {!otpcheck && <Box component="form"
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
                            onChange={(ev) => setNewPassword(ev.target.value)}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Box>}
                    {!otpcheck && <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { margin: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined" onClick={passwordChangeHandler} >Set New Password</Button>

                    </Box>}

                </div>
            </div>
        </div>
    )
}

export default Login
