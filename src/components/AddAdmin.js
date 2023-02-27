import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import AdminValidation from './AdminValidation';
import '../Styles/Login.css'
import swal from 'sweetalert';
import resultLogo from '../images/results-modified.png'
import StudentService from '../api/StudentService';
import admin from '../images/admin (1).png'


export const AddAdmin = () => {

  const navigate = useNavigate();

  const [Students,setStudents] = useState([]);

  useEffect(() => {
    StudentService.getAllStudents().then((response) => {
      setStudents(response.data);
    }).catch(err => {
      console.log(err);
    })
  },[])

  const [adminDetails,setAdminDetails] = useState({
    firstName:"",
    lastName:"",
    rollNo:"",
    email:"",
    password:"",
    cpassword:"",
    course:"",
    branch:"",
    year:"",
    ssc:"",
    sscp:"",
    hsc:"",
    hscp:"",
    ug:"",
    ugp:"",
    backlogs:"",
    dob:"",
    linkedIn:"",
    nationality:"",
    phone:"",
    role:"admin"
  }); 

  const [errors,setError] = useState({});

  const handleChange = (e) =>{
    setAdminDetails({...adminDetails,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e) => {
    e.preventDefault(); 
    setError(AdminValidation(adminDetails));
    const filter = Students.filter((item)=> (item.email === adminDetails.email));
    if(Object.keys(AdminValidation(adminDetails)).length === 0){
          console.log("Result Added");
          if(filter.length>0){
            swal({
                title:"User Already exists",
                icon: "error",
                button : "OK",
            });  
        }
        else{
          if(Object.keys(AdminValidation(adminDetails)).length === 0){
                StudentService.createStudent(adminDetails).then((response) =>{
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })
                swal({
                    title:"Admin Added Succesfully",
                    icon: "success",
                    button : "OK",
                });
                navigate("/viewStudents");
            }
        }    }
  }


  return (
    <div className='home-page login-page'>
      <div className='header'>
        <img src={admin} alt='Logo'></img>
        <h1 style={{"color":"white","fontFamily":"cursive","fontSize":"40px"}}>Add New Admin</h1>
      </div>
      <div className='login-form'>
        <Form onSubmit={handleSubmit}>
          <h2>Add Admin</h2>
          <p>Enter Admin details below</p>
          <hr />
          <div className='form-group'>
            <Form.Control value={adminDetails.email} type='email' name='email' id='email' onChange={handleChange} placeholder='Enter Email of the Admin'></Form.Control><br />
            {errors.email && <Form.Text className='error-text'>{errors.email}</Form.Text>}
          </div>
          <div className='form-group'>
            <Form.Control type='text' value={adminDetails.password} name='password' id='password' onChange={handleChange} placeholder='Enter the password'></Form.Control><br />
            {errors.password && <Form.Text className='error-text'>{errors.password}</Form.Text>}
          </div>
          <button type='submit'>Add Admin</button>
          
        </Form>

      </div>
    </div>
  )
}
