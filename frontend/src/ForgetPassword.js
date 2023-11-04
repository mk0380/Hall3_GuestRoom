import { Box, TextField } from '@mui/material'
import React from 'react'
import { Button } from '@mui/material';


const Login = () => {
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
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            type='email'
                            helperText="Only accessible to WardenInCharge and Hall Office"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined">Send OTP</Button>

                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { marginBottom: 2, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="OTP"
                            type='number'
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': {margin:"2",width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Button variant="outlined">Validate OTP</Button>

                        {/* <NavLink  to={'/forgetPassword'}>Forget Password</NavLink> */}

                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Login
