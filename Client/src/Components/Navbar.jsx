import React from 'react'
import {NavLink} from 'react-router-dom'
import '../Styles/Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <div className="navBrand">
        <h3>HRM System</h3>
      </div>
      <ul className="navItems">
        <li className="navList"><NavLink className='navLink' to='/'>Dashboard</NavLink></li>
        <li className="navList"><NavLink className='navLink' to='/addEmp'>Add</NavLink></li>
        <li className="navList"><NavLink className='navLink' to='/empData'>Employees</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
