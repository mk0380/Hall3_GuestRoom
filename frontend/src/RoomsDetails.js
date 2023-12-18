import React, {useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { FormContext } from './context/FormContext';

const RoomsDetails = ({tabChange, tab}) => {

  const [persons, setPersons] = useState(0)
  const {set_no_person_global, set_room_no_global, set_room_type_global} = useContext(FormContext)
  const checkNoOfPerson = ()=>{
    if(persons>3 || persons<=0 || !persons){
      return true
    }else{
      return false
    }
  }

  const changeHandler = (ev)=>{
    setPersons(ev.target.value)
    set_no_person_global(ev.target.value)
    set_room_no_global(localStorage.getItem("room") && localStorage.getItem("room").split(" ")[0])
    set_room_type_global(localStorage.getItem("room") && localStorage.getItem("room").split(" ")[1])
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
          defaultValue={localStorage.getItem("room") && localStorage.getItem("room").split(" ")[0]}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="ROOM TYPE"
          defaultValue={localStorage.getItem("room") && localStorage.getItem("room").split(" ")[1]==="R2"?"Double Bed":"Triple Bed"}
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
          defaultValue={localStorage.getItem("arrivalDate")}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="DEPARTURE DATE"
          defaultValue={localStorage.getItem("departureDate")}
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
