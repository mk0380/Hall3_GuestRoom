import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const VisitorDetails = ({tabChange, tab}) => {

  const [visitor, setVisitor] = useState({
    name1:"",
    name2:"",
    phone1:"",
    phone2:"",
    purpose:"",
    relationship1:"",
    relationship2:""
  })

  const changeHandler = (ev)=>{
    setVisitor({...visitor, [ev.target.name]:ev.target.value})
    console.log(visitor);
  }

  const checkVisitor = ()=>{
    if(visitor.name1.trim().length===0 || visitor.phone1.trim().length===0 || visitor.purpose.trim().length===0 || visitor.relationship1.trim().length===0){
      return true
    }
    return false
  }

  return (
    <div className={""+((tab==="1" || tab==="3")?"hidden":"")}>
      <p className='info'>If Double Bed room is booked for two people, both names must be entered, else leave the space for Person 2</p>
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
          onChange={changeHandler}
          error={visitor.name1.trim().length===0}
        />
        <TextField
          id="outlined-required"
          label="Person 2 Name"
          name='name2'
          value={visitor.name2}
          onChange={changeHandler}
        />
      </Box>

      {/* <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <FormControl sx={{minWidth: 200, m:2 }} required>
          <InputLabel>Gender Person 1</InputLabel>
          <Select
            label="Gender Person 1"
          >
            <MenuItem value={10}>Male</MenuItem>
            <MenuItem value={20}>Female</MenuItem>
            <MenuItem value={30}>Prefer Not to Say</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{minWidth: 200, m:2 }}>
          <InputLabel>Gender Person 2</InputLabel>
          <Select
            label="Gender Person 2"
          >
            <MenuItem value={10}>Male</MenuItem>
            <MenuItem value={20}>Female</MenuItem>
            <MenuItem value={30}>Prefer Not to Say</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

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
        <TextField
          id="outlined-number"
          label="Phone:Person 2"
          type="number"
          name='phone2'
          value={visitor.phone2}
          onChange={changeHandler}

        // InputLabelProps={{
        //   shrink: true,
        // }}
        />
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
        <TextField
          id="outlined-number"
          label="Relationship of Person 2 with Indentor"
          type="text"
          name='relationship2'
          value={visitor.relationship2}
          onChange={changeHandler}

          
        // InputLabelProps={{
        //   shrink: true,
        // }}
        />
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
