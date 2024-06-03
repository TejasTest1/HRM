import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import AddEmployee from './Pages/AddEmployee'
import './index.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeesData from './Pages/EmployeesData'
import UpdateEmployee from './Pages/UpdateEmployee'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addEmp' element={<AddEmployee />} />
        <Route path='/empData' element={<EmployeesData />} />
        <Route path='/updateEmp/:id' element={<UpdateEmployee />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
