import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import RoomsDetails from './RoomsDetails'
import VisitorDetails from './VisitorDetails'
import IndentorDetails from './IndentorDetails'

const Tabs = () => {

    const [value, setValue] = React.useState('1');

    return (
        <div className='home'>
            <div className="container">
                <h2>Guest Room Booking Portal</h2>
                <h3>HALL OF RESIDENCE III</h3>
                <hr />
                <div className="forms">
                    <h5 className='req_fields'>Note: All fields with * are required</h5>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom:"1.5rem" }}>
                                <TabList
                                    aria-label="lab API tabs example">
                                    <Tab label="Room Details" value="1" />
                                    <Tab label="Visitor Details" value="2" />
                                    <Tab label="Indentor's Details" value="3" />
                                </TabList>
                            </Box>
                            <RoomsDetails tab={value} tabChange={setValue} />
                            <VisitorDetails tab={value} tabChange={setValue} />
                            <IndentorDetails tab={value} tabChange={setValue} />
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Tabs
