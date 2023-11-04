import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();

  return (
    <div className='home'>
      <div className="container">
        <h2>Guest Room Booking Portal</h2>
        <h3>HALL OF RESIDENCE III</h3>
        <hr />
        <div className='boxes'>
            <div className="box1">
                <h4>Amenities</h4>
                <p style={{fontSize:"1.1rem",marginTop:"1.2rem", fontWeight:"bold",textAlign:"center", color:"black"}}>5 double bed rooms</p>
                <ul>
                    <li>They are well furnished rooms.</li>
                    <li>Each room has an attached washroom with geyser.</li>
                </ul>
            </div>
            <div className="box2">
                <h4>Rules of Guest Room</h4>
                <p style={{fontSize:"1.1rem",marginTop:"1.2rem", fontWeight:"bold",textAlign:"center", color:"black"}}>Guest rooms in Hall 3 can be booked by its residents only.</p>
                <p>Key collection time: 10 am to 6 pm.</p>
                <p>Key submission time: 9 am to 10 am.</p>
                <p>Extra Inventory: No extra inventory will be supplied.</p>
            </div>
        </div>
        <div className="buttons">
            <Button variant="outlined" onClick={()=> navigate('/checkDates')}>Book Room</Button>
            <Button variant="outlined" onClick={()=> navigate('/prices')}>Prices</Button>
            <Button variant="outlined" onClick={()=> navigate('/rules')}>Rules</Button>
            <Button variant="outlined" onClick={()=> navigate('/feedback')}>FeedBack</Button>
            <Button variant="outlined" onClick={()=> navigate('/cancelRoom')}>Cancel Room</Button>

        </div>
      </div>
    </div>
  )
}

export default Home
