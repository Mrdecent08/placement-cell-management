import React from 'react'
import '../Styles/Home.css'
import { AdminNav } from './AdminNav'
import { StudentNav } from './StudentNav'
import img from '../images/img.jpg'
import img1 from '../images/img1.jpeg'
import img2 from '../images/img2.jpeg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
import SimpleImageSlider from 'react-simple-image-slider'

export const Home = () => {

  var role = localStorage.getItem('role');
  const navbar = (role) => {
    if(role=="admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }

  const images = [
    { url: img },
    { url: img1 },
    { url: img2 },
    { url: img3 },
    { url: img4 },
  ];

  return (
    <div className='home-page'>
      <div className='nav-bar'>
        {navbar(role)}
      </div>
      <div className='home' style={{"margin":"auto"}}>
        <h1 className='clg-name'>Gayatri Vidya Parishad College of Engineering (A)</h1>
        {/* <div className='tnp-cell'>
          <h2 className='tnp'>Training and Placements Cell</h2>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.3875221257863!2d83.34010631469361!3d17.820459687820403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395bedc7efb603%3A0x87c06caab54e902a!2sGayatri%20Vidya%20Parishad%20College%20of%20Engineering%20(Autonomous)%20(GVP)%20(GVPCE)!5e0!3m2!1sen!2sin!4v1675527845540!5m2!1sen!2sin" 
                  width="900" 
                  height="600" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
          
          </iframe>
        </div> */}
        <SimpleImageSlider style={{margin: "auto",marginTop:"15px",border: "2px solid blue",padding:"10px",backgroundColor:"white"}}
            width={1250}
            height={624}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
          />
      
      </div>
    </div>
  )
}

export default Home;

