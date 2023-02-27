import React from 'react'
import '../Styles/AdminNav.css'
import companyLogo from '../images/nav-logo.jpeg';
import { Link } from 'react-router-dom';

export const AdminNav = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={companyLogo} alt="GVP College" style={{"opacity":"1"}}/>
      </div>
      <div className='nav-items'>
        <div className='nav-item'>
          <Link to="/statistics">Statistics</Link>
        </div>
        <div className='nav-item'>
          <Link to="/viewStudents">Students</Link>
        </div>
        <div className='nav-item'>
          <Link to='/drives'>Drives</Link>
        </div>
        <div className='nav-item'>
          <Link to='/driveResults'>Results</Link>
        </div>
        <div className='nav-item'>
          <Link style={{fontSize:"33px"}} to='/contactus'>Contact</Link>
        </div>
        <div className='nav-item'>
          <Link to='/'>Logout</Link>
        </div>
      </div>
    </div>
  )
}
