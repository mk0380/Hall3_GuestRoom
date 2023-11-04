import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const RoomsDetails = ({tabChange, tab}) => {

  const [persons, setPersons] = useState(0)

  const checkNoOfPerson = ()=>{
    if(persons>2 || persons===0){
      return true
    }else{
      return false
    }
  }

  const changeHandler = (ev)=>{
    setPersons(ev.target.value)
  }

  return (
    <div className={""+((tab==="3" || tab==="2")?"hidden":"")}>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          id="outlined-read-only-input"
          label="ROOM NUMBER"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="ROOM TYPE"
          defaultValue="Hello World"
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
        <TextField
          id="outlined-read-only-input"
          label="ARRIVAL DATE"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="DEPARTURE DATE"
          defaultValue="Hello World"
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
        <TextField
          id="outlined-number"
          label="Number of Persons"
          type="number"
          value={persons}
          required
          error={checkNoOfPerson()}
          onChange={changeHandler}
        InputLabelProps={{
          shrink: true
        }}
        />
      </Box>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <Button variant="outlined" disabled={checkNoOfPerson()} onClick={(_)=> {tabChange('2')}}>Next</Button>

      </Box>

    </div>
  )
}

export default RoomsDetails
