import React from 'react'
import '../Styles/StudentNav.css'
import companyLogo from '../images/nav-logo.jpeg';
import { Link } from 'react-router-dom';

export const StudentNav = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={companyLogo} alt="GVP College"/>
      </div>
      <div className='nav-items'>
        <div className='nav-item'>
          <Link to="/update">Profile</Link>
        </div>
        <div className='nav-item'>
          <Link to="/statistics">Statistics</Link>
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
