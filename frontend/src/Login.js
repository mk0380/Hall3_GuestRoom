import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import BACKEND_URL from './important_data/backendUrl';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const naviagte = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("id")){
          naviagte('/dashboard')
        }
      }, [])

    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const changeHandler = (ev) =>{
        setUser({
            ...user,[ev.target.name]:ev.target.value
        })
    }

    const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

    const login =async () =>{
        const {data} = await axios.post(BACKEND_URL+"/login", user, config)

        if(data.success){
            localStorage.setItem("id",data.id)
            naviagte('/dashboard')
        }

    }

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
                            name='email'
                            value={user.email}
                            onChange={changeHandler}
                            InputProps={{
                                readOnly: false,
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
                            value={user.password}
                            onChange={changeHandler}
                            type='password'
                            name='password'
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
                        <Button variant="outlined" onClick={login}>Login</Button>

                    </Box>
                        <div className='forget'>
                        <NavLink  to={'/forgetPassword'}>Forget Password ?</NavLink>

                        </div>

                </div>
            </div>
        </div>
    )
}

export default Login
