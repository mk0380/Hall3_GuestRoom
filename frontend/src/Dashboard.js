import React, { useState, useMemo, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  const [serach, setSearch] = useState("")

  const logout = ()=>{
    localStorage.removeItem("id")
    navigate('/login')
  }

  useEffect(() => {
    if(!localStorage.getItem("id")){
      navigate('/login')
    }
  }, [])
  

  return (
    <div className='home'>
      <div className="container">
        <h2>Guest Room Booking Portal</h2>
        <h3>HALL OF RESIDENCE III</h3>
        <hr />
        <div className="tab">
          <div className='search'>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              value={serach}
              onChange={(ev)=>setSearch(ev.target.value)}
            />
          </div>

          <div><Button>Change Password</Button></div>
          <div><Button onClick={logout} >Logout</Button></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
