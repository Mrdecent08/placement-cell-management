import React from 'react'
import '../Styles/Home.css'
import { AdminNav } from './AdminNav'
import { StudentNav } from './StudentNav'


export const ContactUs = () => {

  var role = localStorage.getItem('role');
  const navbar = (role) => {
    if(role === "admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }
  return (
    <div className='home-page'>
      <div className='nav-bar'>
        {navbar(role)}
      </div>
      <div className='home'>
        <h1 className='clg-name'>Gayatri Vidya Parishad College of Engineering (A)</h1>
        <div className='tnp-cell'>
          <h2 className='tnp'>Gayatri Vidya Parishad College of Engineering(Autonomous)<br />
                Madhurawada, Visakhapatnam - 530 048<br />
                Andhra Pradesh <br />
                India<br />

                Telephone No. : 91-891-2739507<br />
                Fax : 91-891-2739605<br />
                E-Mail : gvpce@yahoo.com   (or)  principal@gvpce.ac.in <br />
		            Visit Our Website <a target='_blank' href='https://gvpce.ac.in/' style={{color:"darkblue",textDecoration:"none"}}>link</a>
          </h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.3875221257863!2d83.34010631469361!3d17.820459687820403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395bedc7efb603%3A0x87c06caab54e902a!2sGayatri%20Vidya%20Parishad%20College%20of%20Engineering%20(Autonomous)%20(GVP)%20(GVPCE)!5e0!3m2!1sen!2sin!4v1675527845540!5m2!1sen!2sin" 
                  width="920" 
                  height="490" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
          
          </iframe>
        </div>
        
      
      </div>
    </div>
  )
}

export default ContactUs;

