import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import BACKEND_URL from './important_data/backendUrl';
import dayjs from 'dayjs';

const CheckDates = () => {

  const [arrivalDate, setArrivalDate] = useState(null)
  const [departureDate, setDepartreDate] = useState(null)
  const [room, setRoom] = useState("")

  const [display, setDisplay] = useState(false)

  const setDates = (date) => {
    setArrivalDate(date);
    // setDepartreDate(date);
  }

  const checkDateSpan = () => {
    if (!arrivalDate || !departureDate) {
      return true
    }
    else {
      const d1 = dayjs(arrivalDate);
      const d2 = dayjs(departureDate);

      const noOfDays = d2.diff(d1, 'day')
      if (noOfDays > 6 || d1 > d2) {
        return true
      } else {
        return false
      }
    }
  }

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  const checkStatus = async () => {
    const { data } = await axios.post(BACKEND_URL + '/checkDates', { arrivalDate, departureDate}, config)
    setDisplay(true)
    localStorage.setItem("arrivalDate", data.arrivalDate)
    localStorage.setItem("departureDate", data.departureDate)
  }

  const navigate = useNavigate()

  const routing = ()=>{
    localStorage.setItem("room",room)
    navigate('/formFillup')
  }

  const colorList = [["0", "0", "-1", "1", "1"],
  ["1", "0", "-1", "1", "0"],
  ["1", "0", "-1", "1", "0"],
  ["1", "0", "-1", "1", "0"],
  ["1", "0", "-1", "1", "0"],
  ["1", "0", "-1", "1", "0"],
  ["1", "0", "-1", "1", "0"]]

  return (
    <div className='home'>
      <div className="container">
        <h2>Guest Room Booking Portal</h2>
        <h3>HALL OF RESIDENCE III</h3>
        <hr />
        <div className="checkDates">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker disablePast format='DD/MM/YYYY' label="From :" onChange={(date) => setDates(date)} />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              {arrivalDate && <DatePicker minDate={arrivalDate} maxDate={dayjs(arrivalDate).add(6, 'day')} format='DD/MM/YYYY' label="To :" onChange={(date) => setDepartreDate(date)} />}
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="outlined" disabled={checkDateSpan()} onClick={checkStatus}>Check Availability</Button>
        </div>

        <div className="main">
          {display && <div className="colorCodes">
            <h5>Color Codes</h5>
            <div className='color_list'>
              <div className="box_color">
                <div className="green">

                </div>

                Vacant

              </div>
              <div className="box_color">

                <div className="red"></div>

                Booked

              </div>
              <div className="box_color">

                <div className="yellow"></div>

                Reserved

              </div>
            </div>

            <h5>Rooms Size</h5>
            <div className="room_size">
              <p>R2  -</p>
              <p>-:Double Bed</p>
            </div>
            <div className="room_size">
              <p>R3  -</p>
              <p>-:Triple Bed</p>
            </div>
          </div>}
          { display && <div className="result">
            <h5>Rooms Availability Status</h5>

            <div className="overall">

              <div className="columns">

                <div className="date" style={{fontWeight:"bolder"}}>Select</div>

                  <input type="radio" value="109 R2" name='option' onClick={(ev)=>setRoom(ev.target.value)}/>
                  <input type="radio" value="110 R2" name='option' onClick={(ev)=>setRoom(ev.target.value)}/>
                  <input type="radio" value="111 R2" name='option' onClick={(ev)=>setRoom(ev.target.value)}/>
                  <input type="radio" value="112 R2" name='option' onClick={(ev)=>setRoom(ev.target.value)}/>    
                  <input type="radio" value="113 R3" name='option' onClick={(ev)=>setRoom(ev.target.value)}/>

              </div>

              <div className="columns">
                <div className="date" style={{fontWeight:"bolder"}}>RoomNo</div>

                <label>
                  109 R2
                </label>

                <label>
                  110 R2
                </label>

                <label>
                  111 R2
                </label>

                <label>
                  112 R2
                </label>

                <label>
                  113 R3
                </label>

              </div>


              {[...Array(7)].map((e, i) => <div className="columns">

                <div className="date" style={{fontWeight:"bolder"}}>1{i + 1}/11/23</div>
                <div className={"" + ((colorList[i][0] === "1" ? "green1 room" : colorList[i][0] === "-1" ? "red1 room" : colorList[i][0] === "0" ? "yellow1 room" : "black1 room"))}></div>
                <div className={"" + ((colorList[i][1] === "1" ? "green1 room" : colorList[i][1] === "-1" ? "red1 room" : colorList[i][1] === "0" ? "yellow1 room" : "black1 room"))}></div>
                <div className={"" + ((colorList[i][2] === "1" ? "green1 room" : colorList[i][2] === "-1" ? "red1 room" : colorList[i][2] === "0" ? "yellow1 room" : "black1 room"))}></div>
                <div className={"" + ((colorList[i][3] === "1" ? "green1 room" : colorList[i][3] === "-1" ? "red1 room" : colorList[i][3] === "0" ? "yellow1 room" : "black1 room"))}></div>
                <div className={"" + ((colorList[i][4] === "1" ? "green1 room" : colorList[i][4] === "-1" ? "red1 room" : colorList[i][4] === "0" ? "yellow1 room" : "black1 room"))}></div>
              </div>)}

            </div>
          </div>}
        </div>
        { display && <div className='book_btn'>
          <Button variant="outlined" disabled={room.length===0} onClick={routing}>Book selected rooms</Button>
        </div>}
      </div>
    </div>
  )
}

export default CheckDates
