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

