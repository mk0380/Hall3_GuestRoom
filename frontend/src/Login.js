import { Box, TextField } from '@mui/material'
import React from 'react'
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';


const Login = () => {
    return (
        <div className='home'>
            <div className="container">
                <h2>Guest Room Booking Portal</h2>
                <h3>HALL OF RESIDENCE III</h3>
                <hr />
                <div className="login">
                    <h2>Login</h2>
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
                            helperText="Login access only to WardenInCharge and Hall Office"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { marginBottom: 2, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-read-only-input"
                            label="Password"
                            type='password'
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
                        <Button variant="outlined">Login</Button>

                    </Box>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': {margin:"2",width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        {/* <Button variant="outlined">Forget Passowrd</Button> */}

                        <NavLink  to={'/forgetPassword'}>Forget Password</NavLink>

                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Login
