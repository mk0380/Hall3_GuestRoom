import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table'


const Dashboard = () => {

  const navigate = useNavigate();
  const [tableData, setTableData] = useState([
    { booking_id: "abc1234", name: "Mayank Kumar", roll: "21059666", number: "1234567890", amount: "1111", detail: "View Details", action: "accept/reject", status: "accepted" },
    { booking_id: "abc1234", name: "M1ayank Kumar", roll: "121059666", number: "1234567890", amount: "1111", detail: "View Details", action: "accept/reject", status: "accepted" },
    { booking_id: "abc12345", name: "M1ayank Kumar", roll: "121059666", number: "1234567890", amount: "1111", detail: "View Details", action: "accept/reject", status: "accepted" },
    { booking_id: "abc12345", name: "M1ayank Kumar", roll: "121059666", number: "1234567890", amount: "1111", detail: "View Details", action: "accept/reject", status: "accepted" },
    { booking_id: "abc12345", name: "M1ayank Kumar", roll: "121059666", number: "1234567890", amount: "1111", detail: "View Details", action: "accept/reject", status: "accepted" },
  ])

  const logout = () => {
    localStorage.removeItem("id")
    navigate('/login')
  }

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate('/login')
    }
  }, [])

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { title: "Booking Id", field: "booking_id", sorting: false,align:"center" },
    { title: "Name", field: "name", sorting: false,align:"center" },
    { title: "RollNo", field: "roll", sorting: false, align:"center" },
    { title: "Phone", field: "number", sorting: false, align:"center" },
    { title: "Amount", field: "amount", type: "currency", align: "center", currencySetting: { currencyCode: "INR", minimumFractionDigits: 0 }},
    {
      title: "Details", field: "detail",align:"center", sorting: false, export: false, render: (rowData) => rowData && (<IconButton><Button variant="contained" style={{padding:"0 5px", background:"#5bc0de"}} onClick={handleClickOpen}>Details</Button>
      </IconButton>)
    },
    { title: "Action", field: "action",align:"center", sorting: false, export: false, render: (rowData) => rowData && (<><IconButton><Button variant="contained" style={{padding:"0 5px", background:"#5cb85c"}}>Accept</Button>
    </IconButton>
    <IconButton>
        <Button variant="contained" style={{padding:"0 5px", background:"#d9534f"}}>Reject</Button>
    </IconButton>
    </>
    ) },
    { title: "Status", field: "status", align:"center" },
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
          <MaterialTable columns={columns} data={tableData} title={"Guest Room Booking Details"} options={{ search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: "standard", pageSizeOptions: [5, 10, 20, 50, 100], paginationType: "stepped", exportButton: true, exportAllData: true, exportFileName: "GuestRoomBookingDetails_Hall3",
          headerStyle:{ fontWeight:"bold", color:"black" },
          rowStyle:(_,index)=> index%2===0?{background:"#d7d7d7",fontWeight:"bold"}:{fontWeight:"bold"} }}
         />
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{}}
      >
        <DialogTitle id="alert-dialog-title">
          {"ROOM DETAILS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Room Number : 110   Room Type : DOUBLE BED
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{background:"#5cb85c", color:"white"}}>ACCEPT</Button>
          <Button onClick={handleClose} style={{background:"#d9534f", color:"white"}}>
            REJECT
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}

export default Dashboard
