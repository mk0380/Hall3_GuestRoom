import React from 'react'
import './App.css'
import './AppMediaQuery.css'
import Home from './Home.js'
import CheckDates from './CheckDates.js'
import CancelRoom from './CancelRoom.js'
import Feedback from './Feedback.js'
import Rules from './Rules.js'
import Prices from './Prices.js'
import Tabs from './Tabs.js'
import Login from './Login.js'
import Dashboard from './Dashboard.js'
import ForgetPassword from './ForgetPassword.js'
import { Route, Routes } from 'react-router-dom'
import ChangePassword from './ChangePassword.js'

const App = () => {
  return (
      <Routes>
        <Route path='/formFillup' element={<Tabs />} />
        <Route path='/checkDates' element={<CheckDates />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cancelRoom' element={<CancelRoom />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/prices' element={<Prices />} /> 
      </Routes>
  )
}

export default App
