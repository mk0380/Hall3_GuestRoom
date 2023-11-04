import React from 'react'
import './App.css'
import Home from './Home.js'
import CheckDates from './CheckDates.js'
import CancelRoom from './CancelRoom.js'
import Feedback from './Feedback.js'
import Rules from './Rules.js'
import Prices from './Prices.js'
import Tabs from './Tabs.js'
import Login from './Login.js'
import ForgetPassword from './ForgetPassword.js'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/checkDates' element={<CheckDates/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgetPassword' element={<ForgetPassword/>}/>
      <Route path='/formFillup' element={<Tabs/>}/>
      <Route path='/cancelRoom' element={<CancelRoom/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='/rules' element={<Rules/>}/>
      <Route path='/prices' element={<Prices/>}/>
    </Routes>
  )
}

export default App
