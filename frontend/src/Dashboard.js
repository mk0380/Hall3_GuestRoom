import React, { useState, useEffect } from 'react'
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table'
import { toast } from 'react-toastify';
import BACKEND_URL from './important_data/backendUrl';
import axios from 'axios';


const Dashboard = () => {

  const navigate = useNavigate();
  const [tableData, setTableData] = useState([])
  const [modalData, setModalData] = useState({ roomDetails: { roomNo: "", roomType: "" }, arrivalDate: "", departureDate: "", visitorDetails: [{ name: "", relationship: "", phone: "" }, { name: "", relationship: "", phone: "" }, { name: "", relationship: "", phone: "" }], indentorDetails: { name: "", roll: "", email: "", phone: "" }, purposeOfVisit: "", bookingId:"" })

  const logout = () => {
    localStorage.removeItem("id")
    navigate('/login')
    localStorage.clear()
    toast.success("Logout successfully")
  }

  const fetchData = async () => {
    const { data } = await axios.post(BACKEND_URL + '/fetchData', {}, config)

    var filteredData = []

    if(localStorage.getItem("role")==="warden"){
       filteredData = data.allData.filter((item)=> item.approvalLevel === "1")
    }

    if(localStorage.getItem("role")==="hall_office"){
      filteredData = data.allData
   }

    setTableData(filteredData)
  }

  
  const [open, setOpen] = useState(false);
  const [childModal, setChildModal] = useState(false)
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate('/login')
    } else {
      fetchData()
    }
  }, [open])

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }


  const handleClickOpen = () => {
    setChildModal(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const acceptHandle =async () => {

    setOpen(!open)

    const booking_id = modalData.bookingId;

    console.log(booking_id);

    const { data } = await axios.post(BACKEND_URL+'/wardenApproval',{booking_id},config)

    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.success)
    }

  }

  const rejectHandler =async () => {
    setChildModal(false)
    setOpen(false)

    const booking_id = modalData.bookingId;
    const { data } = await axios.post(BACKEND_URL+'/wardenRejection',{booking_id, reason},config)

    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.success)
    }

  }

  const rejectHandler2 =async () => {
    setOpen(true)
    setChildModal(true)
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "80%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    overflow: "scroll",
    scrollbarWidth: "none"
  };


  const columns = [
    { title: "Booking Id", field: "bookingId", sorting: false, align: "center" },
    { title: "Name", field: "indentorDetails.name", sorting: false, align: "center" },
    { title: "RollNo", field: "indentorDetails.roll", sorting: false, align: "center" },
    { title: "Phone", field: "indentorDetails.phone", sorting: false, align: "center" },
    { title: "Amount", field: "totalCost", type: "currency", align: "center", currencySetting: { currencyCode: "INR", minimumFractionDigits: 0 } },
    {
      title: "Details", field: "detail", align: "center", sorting: false, export: false, render: (rowData) => rowData && (<IconButton><Button variant="contained" style={{ padding: "0 5px", background: "#5bc0de" }} onClick={handleClickOpen}>Details</Button>
      </IconButton>)
    },
    {
      title: "Action", field: "action", align: "center", sorting: false, export: false, render: (rowData) => rowData && (<><IconButton><Button variant="contained" style={{ padding: "0 5px", background: "#5cb85c" }} onClick={acceptHandle}>Accept</Button>
      </IconButton>
        <IconButton>
          <Button variant="contained" style={{ padding: "0 5px", background: "#d9534f" }} onClick={rejectHandler2}>Reject</Button>
        </IconButton>
      </>
      )
    },
    { title: "Status", field: "status", align: "center" },
  ]

  return (
    <div className='home'>
      <div className="container">
        <h2>Guest Room Booking Portal</h2>
        <h3>HALL OF RESIDENCE III</h3>
        <hr />
        <div className="tab">
          <div><Button onClick={() => navigate('/changePassword')}>Change Password</Button></div>
          <div><Button onClick={logout} >Logout</Button></div>
        </div>
        <div className='table'>
          <MaterialTable onRowClick={ (_, rowData)=> 
          setModalData(prevData=> ({...prevData, ...rowData})) 
        } columns={columns} data={tableData} title={"Guest Room Booking Details"} options={{
            search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: "standard", pageSizeOptions: [5, 10, 20, 50, 100], paginationType: "stepped", exportButton: true, exportAllData: true, exportFileName: "GuestRoomBookingDetails_Hall3",
            headerStyle: { fontWeight: "bold", color: "black" },
            rowStyle: (_, index) => index % 2 === 0 ? { background: "#d7d7d7", fontWeight: "500" } : { fontWeight: "500" }
          }}
          />
        </div>
        {!childModal && <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }}>
            <h4 className='modal_heading'>Room Details</h4>
            <div className='modal_content' >
              <p>
                Room Number : {modalData.roomDetails.roomNo}
              </p>
              <p>
                Room Type : {modalData.roomDetails.roomType}
              </p>
              <p>
                Arrival Date : {modalData.arrivalDate}
              </p>
              <p>
                Departure Date : {modalData.departureDate}
              </p>
            </div>

            <hr style={{ width: "90%" }} />

            <h4 className='modal_heading'>Visitor Details</h4>
            {modalData.visitorDetails[0].name.length !== 0 && <div className='modal_content' >
              <p>
                Name : {modalData.visitorDetails[0].name}
              </p>
              <p>
                Mobile : {modalData.visitorDetails[0].phone}
              </p>
              <p>
                Relationship : {modalData.visitorDetails[0].relationship}
              </p>
            </div>}
            {modalData.visitorDetails[1].name.length !== 0 && <div className='modal_content' >
              <p>
                Name : {modalData.visitorDetails[1].name}
              </p>
              <p>
                Mobile : {modalData.visitorDetails[1].phone}
              </p>
              <p>
                Relationship : {modalData.visitorDetails[1].relationship}
              </p>
            </div>}
            {modalData.visitorDetails[2].name.length !== 0 && <div className='modal_content' >
              <p>
                Name : {modalData.visitorDetails[2].name}
              </p>
              <p>
                Mobile : {modalData.visitorDetails[2].phone}
              </p>
              <p>
                Relationship : {modalData.visitorDetails[2].relationship}
              </p>
            </div>}
            <div className='modal_content' >
              Purpose of Visit: {modalData.purposeOfVisit}
            </div>

            <hr style={{ width: "90%" }} />

            <h4 className='modal_heading'>Indentor Details</h4>
            <div className='modal_content' >
              <p>
                Name : {modalData.indentorDetails.name}
              </p>
              <p>
                Roll : {modalData.indentorDetails.roll}
              </p>
              <p>
                Email : {modalData.indentorDetails.email}
              </p>
              <p>
                Phone : {modalData.indentorDetails.phone}
              </p>
            </div>

            <hr style={{ width: "90%" }} />

            <div style={{ margin: "10px auto", display: "flex", justifyContent: "center", alignItems: "center" }}><IconButton><Button variant="contained" style={{ padding: "0 5px", background: "#5cb85c" }} onClick={acceptHandle}>Accept</Button>
            </IconButton>
              <IconButton>
                <Button variant="contained" style={{ padding: "0 5px", background: "#d9534f" }} onClick={() => setChildModal(true)}>Reject</Button>
              </IconButton>
            </div>
          </Box>
        </Modal>}
        {childModal && <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, height: "auto" }}>
            <h4 className='modal_heading'>Any Reason for Rejection?</h4>
            <Box component="form"
              sx={{
                '& .MuiTextField-root': { margin: 2, width: '25ch' },
              }}
              noValidate
              autoComplete="off">
              <TextField id="outlined-read-only-input" style={{ width: "100%" }} label="Type Here...." type='text' value={reason} onChange={(ev) => setReason(ev.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
            </Box>

            <><IconButton><Button variant="contained" style={{ padding: "0 5px", background: "#5cb85c" }} onClick={rejectHandler}>Confirm reject</Button>
            </IconButton>
              <IconButton>
                <Button variant="contained" style={{ padding: "0 5px", background: "#d9534f" }} onClick={() => setChildModal(false)}>Close</Button>
              </IconButton>
            </>
          </Box>
        </Modal>}
      </div>

    </div>
  )
}

export default Dashboard
