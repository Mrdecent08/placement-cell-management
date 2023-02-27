import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import loginValidation from './loginValidation';
import '../Styles/Login.css'
import swal from 'sweetalert';
import logo from '../images/logo-clg.png'
import StudentService from '../api/StudentService';

export const Login = () => {

  const navigate = useNavigate();

  // const Students = [
  //   {id:1,firstName:"Srinivas",lastName:"Sikhakolli",rollNo:"19131A05M5",email:"sikakollisrinivas@gmail.com",password:"Srinivas@08",course:"B.Tech",branch:"CSE",year:"4",ssc:"Sri Sadguru Vidyalayam",sscp:98,hsc:"Tirumala Junior College",hscp:100,ug:"Gayatri Vidya Parishad College of Engineering(A)",backlogs:0,DOB:"08-08-2001",linkedIn:"vdvdbkjnk",nationality:"Indian",phone:"7995585995",role:"student"},
  //   {id:2,firstName:"Surya",lastName:"Yellumahanthi",rollNo:"19131A05R7",email:"saisuryaprakash5@gmail.com",password:"Surya@21",course:"B.Tech",branch:"CSE",year:"4",ssc:"ABC",sscp:98,hsc:"Sri chaitanya",hscp:100,ug:"Gayatri Vidya Parishad College of Engineering(A)",backlogs:0,DOB:"08-08-2001",linkedIn:"vdvdbkjnk",nationality:"Indian",phone:"8639779793",role:"admin"},
  //   {id:3,firstName:"Aditya",lastName:"Yarra",rollNo:"19131A05R4",email:"adityasriramyarra@gmail.com",password:"Aditya@09",course:"B.Tech",branch:"CSE",year:"4",ssc:" Sadguru Vidyalayam",sscp:98,hsc:"Tirumala Junior College",hscp:52,ug:"Gayatri Vidya Parishad College of Engineering(A)",backlogs:2,DOB:"08-08-2001",linkedIn:"oidlfbkjg",nationality:"Indian",phone:"7330742207",role:"student"},
  //   {id:4,firstName:"Sample",lastName:"Sikhakolli",rollNo:"19131A05M4",email:"sample@gmail.com",password:"Srinivas@21",course:"B.Tech",branch:"CSE",year:"4",ssc:"Sri Sadguru ",sscp:24,hsc:"Xys",hscp:56,ug:"Gayatri Vidya Parishad College of Engineering(A)",backlogs:0,DOB:"08-08-2001",linkedIn:"klnfggfkln",nationality:"Indian",phone:"9963407998",role:"student"},
  //   {id:5,firstName:"Sumanth",lastName:"Yerra",rollNo:"19131A05R6",email:"sumanth@gmail.com",password:"Srinivas@7339",course:"B.Tech",branch:"CSE",year:"4",ssc:"lkghigdos",sscp:88,hsc:"Tirumala Junior kalasala",hscp:95,ug:"Gayatri Vidya Parishad College of Engineering(A)",backlogs:3,DOB:"08-08-2001",linkedIn:"knkldnfgn",nationality:"Indian",phone:"9528372873",role:"student"}
  // ]


  const [Students,setStudents] = useState([]);

  useEffect(() => {
    StudentService.getAllStudents().then((response) => {
      setStudents(response.data);
    }).catch(err => {
      console.log(err);
    })
  },[])

  const [loginDetails,setLoginDetails] = useState({
    email:"",
    password:"",
  }); 

  const [errors,setError] = useState({});
  const handleChange = (e) =>{
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e) => {
    e.preventDefault(); 
    setError(loginValidation(loginDetails));
    const filter = Students.filter((item)=> (item.email === loginDetails.email && item.password === loginDetails.password));
    console.log(Object.keys(loginValidation(loginDetails)));
    if(Object.keys(loginValidation(loginDetails)).length === 0){
      if(filter.length<1){
            swal({
                title:"Invalid Credentials",
                icon: "error",
                button : "OK",
            });  
        }
        else{
          loginDetails.role = filter[0].role;
          loginDetails.id = filter[0].id;
          localStorage.setItem('email',loginDetails.email);
          localStorage.setItem('role',loginDetails.role);
          localStorage.setItem('id',loginDetails.id);
          console.log("Logged In");
          navigate("/home");
        }
        
    }
  }


  

  
  


  return (
    <div className='home-page login-page'>
      <div className='header'>
        <img src={logo} alt='Logo'></img>
        <h1>Gayatri Vidya Parishad College of Engineering   (A)</h1>
      </div>
      <div className='login-form'>
        <Form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          {/* <h2 style={{"color":"white"}}>Log in</h2> */}
          <p style={{"color":"black"}}>Enter your details below</p>
          <hr />
          <div className='form-group'>
            {/* <Form.Label htmlFor="email">UserName : </Form.Label><br/> */}
            <Form.Control value={loginDetails.email} type='text' name='email' id='email' onChange={handleChange} placeholder='Enter your email'></Form.Control><br />
            {errors.email && <Form.Text className='error-text'>{errors.email}</Form.Text>}
          </div>
          <div className='form-group'>
            {/* <Form.Label htmlFor="password">Password : </Form.Label><br/> */}
            <Form.Control type='password' value={loginDetails.password} name='password' id='password' onChange={handleChange} placeholder='Enter your password'></Form.Control><br />
            {errors.password && <Form.Text className='error-text'>{errors.password}</Form.Text>}
          </div>
          <button type='submit'>Login</button>
          <div className='form-footer'>
                Don't have an account? <Link to='/register' className='form-footer-link' style={{"color":"maroon","textDecoration":"underline"}}>Register</Link>
          </div>
        </Form>

      </div>
    </div>
  )
}
