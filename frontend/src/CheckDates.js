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
      if (noOfDays > 6 || d1>d2) {
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
    const { data } = await axios.post(BACKEND_URL + '/checkDates', { arrivalDate, departureDate }, config)
    localStorage.setItem("arrivalDate",data.arrivalDate)
    localStorage.setItem("departureDate",data.departureDate)
  }

  const navigate = useNavigate()

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
          <div className="colorCodes">
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
          </div>
          <div className="result">
            <h5>Rooms Availability Status</h5>
          </div>
        </div>
        <div className='book_btn'>
          <Button variant="outlined" onClick={() => navigate('/formFillup')}>Book selected rooms</Button>
        </div>
      </div>
    </div>
  )
}

export default CheckDates
