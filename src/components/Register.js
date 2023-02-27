import React, { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap';
import registerValidation from './registerValidation';
import '../Styles/Register.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../images/logo-clg.png'
import StudentService from '../api/StudentService'

export const Register = () => {

  const navigate = useNavigate();


  const [Students,setStudents] = useState([]);

  useEffect(() => {
    StudentService.getAllStudents().then((response) => {
      setStudents(response.data);
    }).catch(err => {
      console.log(err);
    })
  },[])
  
  const [errors,setError] = useState({});

  const [registerDetails,setRegisterDetails] = useState({
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
    role:"student"
  }); 
  const handleChange = (e) =>{
    setRegisterDetails({...registerDetails,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e) => {
    e.preventDefault();
    setError(registerValidation(registerDetails));  
    const filter = Students.filter((item)=> (item.email === registerDetails.email));
    if(Object.keys(registerValidation(registerDetails)).length === 0){
        console.log(filter);
        if(filter.length>0){
            swal({
                title:"User Already exists",
                icon: "error",
                button : "OK",
            });  
        }
        else{
          if(Object.keys(registerValidation(registerDetails)).length === 0){
                console.log(registerDetails);
                StudentService.createStudent(registerDetails).then((response) =>{
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })
                console.log("Regitered In");
                swal({
                    title:"Registration Succesfully",
                    text : "Thank you for the Registration",
                    icon: "success",
                    button : "OK",
                });
                navigate("/");
            }
        }
        
    }
  }
  return (
    <div className='register-page'>
      <div className='header'>
        <img src={logo} alt='Logo'></img>
        <h1>Gayatri Vidya Parishad College of Engineering   (A)</h1>
      </div>
      <div className='login-form' style={{"backgroundColor":"white"}}>

        <Form className='register-form' onSubmit={handleSubmit}>
          <h2 className='form-header'>Student Registration</h2>
          <p>Enter your details below</p>
          <hr />
          <div className='form-group'>
            <Form.Label htmlFor="firstName">FirstName : </Form.Label><br/>
            <Form.Control  value={registerDetails.firstName} type='text' name='firstName' id='firstName' onChange={handleChange} placeholder='Enter your First Name'></Form.Control><br />
            {errors.firstName && <Form.Text className='register-error'>{errors.firstName}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="lastName">LastName : </Form.Label><br/>
            <Form.Control  value={registerDetails.lastName} type='text' name='lastName' id='lastName' onChange={handleChange} placeholder='Enter your Last Name'></Form.Control><br />
            {errors.lastName && <Form.Text className='register-error'>{errors.lastName}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="rollNo">Student ID : </Form.Label><br/>
            <Form.Control value={registerDetails.rollNo} type='text' name='rollNo' id='rollNo' onChange={handleChange} placeholder='Enter your Student ID'></Form.Control><br />
            {errors.rollNo && <Form.Text className='register-error'>{errors.rollNo}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="email">Email : </Form.Label><br/>
            <Form.Control value={registerDetails.email} type='email' name='email' id='email' onChange={handleChange} placeholder='Enter your Email'></Form.Control><br />
            {errors.email && <Form.Text className='register-error'>{errors.email}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="password">Password : </Form.Label><br/>
            <Form.Control value={registerDetails.password} type='password' name='password' id='password' onChange={handleChange} placeholder='Enter your Password'></Form.Control><br />
            {errors.password && <Form.Text className='register-error'>{errors.password}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="cpassword">Confirm Password : </Form.Label><br/>
            <Form.Control  value={registerDetails.cpassword} type='password' name='cpassword' id='cpassword' onChange={handleChange} placeholder='Enter your Password'></Form.Control><br />
            {errors.cpassword && <Form.Text className='register-error'>{errors.cpassword}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="course">Course : </Form.Label><br/>
            <Form.Control as="select" value={registerDetails.course} name='course' onChange={handleChange}>
            <option value="">Select Your Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
            </Form.Control><br />
            {errors.course && <Form.Text className='register-error'>{errors.course}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="branch">Branch : </Form.Label><br/>
            <Form.Control as="select" value={registerDetails.branch} name='branch' onChange={handleChange}>
                  <option value="">Select Your Branch</option>
                  <option value="cse">CSE</option>
                  <option value="ece">ECE</option>
                  <option value="mech">MECH</option>
                  <option value="civil">CIVIL</option>
                  <option value="it">IT</option>
                  <option value="chemical">CHEMICAL</option>
                  <option value="csd">CSD</option>
                  <option value="csm">CSM</option>
            </Form.Control><br />
            {errors.branch && <Form.Text className='register-error'>{errors.branch}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="year">Year : </Form.Label><br/>
            <Form.Control as='select' value={registerDetails.year} name='year' onChange={handleChange}>
              <option value="">Select Year of Study</option>
              <option value="4">IV</option>
            </Form.Control> <br />
            {errors.year && <Form.Text className='register-error'>{errors.year}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="ssc">SSC : </Form.Label><br/>
            <Form.Control value={registerDetails.ssc} type='text' name='ssc' id='ssc' onChange={handleChange} placeholder='Enter your Xth School'></Form.Control><br />
            {errors.ssc && <Form.Text className='register-error'>{errors.ssc}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="sscp">Percentage : </Form.Label><br/>
            <Form.Control value={registerDetails.sscp} type='number' min='0' max='100' name='sscp' id='sscp' onChange={handleChange} placeholder='Enter your Xth percentage'></Form.Control><br />
            {errors.sscp && <Form.Text className='register-error'>{errors.sscp}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="hsc">XII<sup>th</sup>: </Form.Label><br/>
            <Form.Control value={registerDetails.hsc} type='text' name='hsc' id='hsc' onChange={handleChange} placeholder='Enter your College Name'></Form.Control><br />
            {errors.hsc && <Form.Text className='register-error'>{errors.hsc}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="hscp">XII<sup>th</sup> Percentage : </Form.Label><br/>
            <Form.Control value={registerDetails.hscp} type='number' min='0' max='100' name='hscp' id='hscp' onChange={handleChange} placeholder='Enter your XII percentage'></Form.Control><br />
            {errors.hscp && <Form.Text className='register-error'>{errors.hscp}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="ug">UnderGraduation : </Form.Label><br/>
            <Form.Control value={registerDetails.ug} type='text' name='ug' id='ug' onChange={handleChange} placeholder='Enter your UnderGraduate University/College'></Form.Control><br />
            {errors.ug && <Form.Text className='register-error'>{errors.ug}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="ugp">Percentage : </Form.Label><br/>
            <Form.Control value={registerDetails.ugp} type='number' min='0' max='100' name='ugp' id='ugp' onChange={handleChange} placeholder='Enter your Percentage'></Form.Control><br />
            {errors.ugp && <Form.Text className='register-error'>{errors.ugp}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="backlogs">Backlogs : </Form.Label><br/>
            <Form.Control value={registerDetails.backlogs} type='number' min='0' name='backlogs' id='backlogs' onChange={handleChange} placeholder='Number of Backlogs'></Form.Control><br />
            {errors.backlogs && <Form.Text className='register-error'>{errors.backlogs}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="dob">Date of Birth : </Form.Label><br/>
            <Form.Control value={registerDetails.dob} type='date' name='dob' id='dob' onChange={handleChange} placeholder='Enter your Date Of Birth'></Form.Control><br />
            {errors.dob && <Form.Text className='register-error'>{errors.dob}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="linkedIn">LinkedIn : </Form.Label><br/>
            <Form.Control value={registerDetails.linkedIn} type='text' name='linkedIn' id='linkedIn' onChange={handleChange} placeholder='Enter your LinkedIn Profile'></Form.Control><br />
            {errors.linkedIn && <Form.Text className='register-error'>{errors.linkedIn}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="nationality">Nationality : </Form.Label><br/>
            <Form.Control value={registerDetails.nationality} type='text' name='nationality' id='nationality' onChange={handleChange} placeholder='Nationality'></Form.Control><br />
            {errors.nationality && <Form.Text className='register-error'>{errors.nationality}</Form.Text>}

          </div>
          <div className='form-group'>
            <Form.Label htmlFor="phone">Contact Number : </Form.Label><br/>
            <Form.Control  value={registerDetails.phone} type='tel' name='phone' id='phone' onChange={handleChange} placeholder='Enter your Phone Number'></Form.Control><br />
            {errors.phone && <Form.Text className='register-error'>{errors.phone}</Form.Text>}

          </div>
          <button type='submit'>Register</button>
        </Form>


        

      </div>
    </div>
  )
}
