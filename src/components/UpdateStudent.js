import React, { useEffect, useState } from 'react'
import { StudentNav } from './StudentNav';
import { AdminNav } from './AdminNav';
import '../Styles/UpdateStudent.css';
import {Form} from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import updateValidation from './updateValidation';
import swal from 'sweetalert';
import StudentService from '../api/StudentService';

export const UpdateStudent = (props) => {

  const role = localStorage.getItem("role");

  var id;

  if(role === "student"){
    id = localStorage.getItem("id");
  }
  else{
    id = localStorage.getItem("update_studentId");
    console.log(id);

  }

  const navigate = useNavigate();

  const [student,setStudent] = useState({});

  useEffect(() => {
    StudentService.getStudentById(id).then((response) => {
      console.log(response.data);
      setStudent(response.data);
    }).catch(err => {
      console.log(err);
    })
  },[])

  const navbar = (role) => {
    if(role==="admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }
  
  
  const [errors,setError] = useState({});

  const handleChange = (e) =>{
    setStudent({...student,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e) => {
    e.preventDefault(); 
    setError(updateValidation(student));  
    if(Object.keys(updateValidation(student)).length === 0){
          console.log("Updated Successfully");
          StudentService.updateStudentById(id,student).then((response) => {
            console.log("Updated");
          }).catch(error => {
              console.log(error)
          });
          swal({
              title:"Updated Succesfully",
              text : "Thank you for the updation",
              icon: "success",
              button : "OK",
          });
          if(role === "admin"){
            navigate("/viewStudents");
          }
          else{
            navigate("/drives");
          }
        
        
    }
    else{
      swal({
        title:"Invalid Details !!",
        icon: "error",
        button : "OK",
    });
    }
  }

  const return_data = (role) => {
    if(role === "admin"){
      return (
        <div className='students'>
          <div className='page-title'>
              <h2>Update Student Data</h2>
          </div>
          <div className='student-table'>
            <Form onSubmit={handleSubmit} className='update-form'>
              <p style={{"marginLeft":"150px","color":"blue","fontSize":"18px"}}>Enter your details below</p>
              <hr className='hr-line'/>
              <div className='form-group'>
                <Form.Label htmlFor="firstName">FirstName : </Form.Label><br/>
                <Form.Control  value={student.firstName} type='text' name='firstName' id='firstName' onChange={handleChange} placeholder='Enter your First Name'></Form.Control><br />
                {errors.firstName && <Form.Text className='update-error'>{errors.firstName}</Form.Text>}
              </div>
              <div className='form-group'>
                <Form.Label htmlFor="lastName">LastName : </Form.Label><br/>
                <Form.Control  value={student.lastName} type='text' name='lastName' id='lastName' onChange={handleChange} placeholder='Enter your Last Name'></Form.Control><br />
                {errors.lastName && <Form.Text className='update-error'>{errors.lastName}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="rollNo">Student ID : </Form.Label><br/>
                <Form.Control value={student.rollNo} type='text' name='rollNo' id='rollNo' onChange={handleChange} placeholder='Enter your Student ID'></Form.Control><br />
                {errors.rollNo && <Form.Text className='update-error'>{errors.rollNo}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="email">Email : </Form.Label><br/>
                <Form.Control value={student.email} type='email' name='email' id='email' onChange={handleChange} placeholder='Enter your Email'></Form.Control><br />
                {errors.email && <Form.Text className='update-error'>{errors.email}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="course">Course : </Form.Label><br/>
                <Form.Control as="select" value={student.course} name='course' onChange={handleChange}>
                <option value="">Select Your Course</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                </Form.Control><br />
                {errors.course && <Form.Text className='update-error'>{errors.course}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="branch">Branch : </Form.Label><br/>
                <Form.Control as="select" value={student.branch} name='branch' onChange={handleChange}>
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
                {errors.branch && <Form.Text className='update-error'>{errors.branch}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="year">Year : </Form.Label><br/>
                <Form.Control as='select' value={student.year} name='year' onChange={handleChange}>
                  <option value="">Select Year of Study</option>
                  <option value="4">IV</option>
                </Form.Control> <br />
                {errors.year && <Form.Text className='update-error'>{errors.year}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="ssc">SSC : </Form.Label><br/>
                <Form.Control value={student.ssc} type='text' name='ssc' id='ssc' onChange={handleChange} placeholder='Enter your Xth School'></Form.Control><br />
                {errors.ssc && <Form.Text className='update-error'>{errors.ssc}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="sscp">Percentage : </Form.Label><br/>
                <Form.Control value={student.sscp} type='number' min='0' max='100' name='sscp' id='sscp' onChange={handleChange} placeholder='Enter your Xth percentage'></Form.Control><br />
                {errors.sscp && <Form.Text className='update-error'>{errors.sscp}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="hsc">XII<sup>th</sup>: </Form.Label><br/>
                <Form.Control value={student.hsc} type='text' name='hsc' id='hsc' onChange={handleChange} placeholder='Enter your College Name'></Form.Control><br />
                {errors.hsc && <Form.Text className='update-error'>{errors.hsc}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="hscp">XII<sup>th</sup> Percentage : </Form.Label><br/>
                <Form.Control value={student.hscp} type='number' min='0' max='100' name='hscp' id='hscp' onChange={handleChange} placeholder='Enter your XII percentage'></Form.Control><br />
                {errors.hscp && <Form.Text className='update-error'>{errors.hscp}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="ug">UnderGraduation : </Form.Label><br/>
                <Form.Control value={student.ug} type='text' name='ug' id='ug' onChange={handleChange} placeholder='Enter your UnderGraduate University/College'></Form.Control><br />
                {errors.ug && <Form.Text className='update-error'>{errors.ug}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="ugp">Percentage : </Form.Label><br/>
                <Form.Control value={student.ugp} type='number' min='0' max='100' name='ugp' id='ugp' onChange={handleChange} placeholder='Enter your Percentage'></Form.Control><br />
                {errors.ugp && <Form.Text className='update-error'>{errors.ugp}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="backlogs">Backlogs : </Form.Label><br/>
                <Form.Control value={student.backlogs} type='number' min='0' name='backlogs' id='backlogs' onChange={handleChange} placeholder='Number of Backlogs'></Form.Control><br />
                {errors.backlogs && <Form.Text className='update-error'>{errors.backlogs}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="dob">Date of Birth : </Form.Label><br/>
                <Form.Control value={student.dob} type='date' name='dob' id='dob' onChange={handleChange} placeholder='Enter your Date Of Birth'></Form.Control><br />
                {errors.dob && <Form.Text className='update-error'>{errors.dob}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="linkedIn">LinkedIn : </Form.Label><br/>
                <Form.Control value={student.linkedIn} type='text' name='linkedIn' id='linkedIn' onChange={handleChange} placeholder='Enter your LinkedIn Profile'></Form.Control><br />
                {errors.linkedIn && <Form.Text className='update-error'>{errors.linkedIn}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="nationality">Nationality : </Form.Label><br/>
                <Form.Control value={student.nationality} type='text' name='nationality' id='nationality' onChange={handleChange} placeholder='Nationality'></Form.Control><br />
                {errors.nationality && <Form.Text className='update-error'>{errors.nationality}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="phone">Contact Number : </Form.Label><br/>
                <Form.Control  value={student.phone} type='tel' name='phone' id='phone' onChange={handleChange} placeholder='Enter your Phone Number'></Form.Control><br />
                {errors.phone && <Form.Text className='update-error'>{errors.phone}</Form.Text>}

              </div>
              <button type='submit' className='update-button'>Update Student</button>
              {/* <div className='form-footer'>
                  Delete account? <button to='/' className='form-footer-link' onClick={deleteStudent(id)} style={{"color":"maroon","textDecoration":"underline","backgroundColor":"inherit"}}>Remove Account</button>
              </div> */}
              
            </Form>
          </div>

        </div>
      )
    }
    else{
      return(
        <div className='students'>
          <div className='page-title'>
              <h2>Update Student Data</h2>
          </div>
          <div className='student-table'>
            <Form onSubmit={handleSubmit} className='update-form'>
              <p style={{"marginLeft":"150px","color":"blue","fontSize":"18px"}}>Enter your details below</p>
              <hr className='hr-line'/>
              <div className='form-group'>
                <Form.Label htmlFor="firstName">FirstName : </Form.Label><br/>
                <Form.Control  value={student.firstName} type='text' name='firstName' id='firstName' onChange={handleChange} placeholder='Enter your First Name'></Form.Control><br />
                {errors.firstName && <Form.Text className='update-error'>{errors.firstName}</Form.Text>}
              </div>
              <div className='form-group'>
                <Form.Label htmlFor="lastName">LastName : </Form.Label><br/>
                <Form.Control  value={student.lastName} type='text' name='lastName' id='lastName' onChange={handleChange} placeholder='Enter your Last Name'></Form.Control><br />
                {errors.lastName && <Form.Text className='update-error'>{errors.lastName}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="rollNo">Student ID : </Form.Label><br/>
                <Form.Control value={student.rollNo} type='text' name='rollNo' id='rollNo' onChange={handleChange} placeholder='Enter your Student ID'></Form.Control><br />
                {errors.rollNo && <Form.Text className='update-error'>{errors.rollNo}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="email">Email : </Form.Label><br/>
                <Form.Control value={student.email} type='email' name='email' id='email' onChange={handleChange} placeholder='Enter your Email'></Form.Control><br />
                {errors.email && <Form.Text className='update-error'>{errors.email}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="password">Password : </Form.Label><br/>
                <Form.Control value={student.password} type='password' name='password' id='password' onChange={handleChange} placeholder='Enter your Password'></Form.Control><br />
                {errors.password && <Form.Text className='update-error'>{errors.password}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="cpassword">Confirm Password : </Form.Label><br/>
                <Form.Control  value={student.cpassword} type='password' name='cpassword' id='cpassword' onChange={handleChange} placeholder='Enter your Password'></Form.Control><br />
                {errors.cpassword && <Form.Text className='update-error'>{errors.cpassword}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="course">Course : </Form.Label><br/>
                <Form.Control as="select" value={student.course} name='course' onChange={handleChange}>
                <option value="">Select Your Course</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                </Form.Control><br />
                {errors.course && <Form.Text className='update-error'>{errors.course}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="branch">Branch : </Form.Label><br/>
                <Form.Control as="select" value={student.branch} name='branch' onChange={handleChange}>
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
                {errors.branch && <Form.Text className='update-error'>{errors.branch}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="year">Year : </Form.Label><br/>
                <Form.Control as='select' value={student.year} name='year' onChange={handleChange}>
                  <option value="">Select Year of Study</option>
                  <option value="4">IV</option>
                </Form.Control> <br />
                {errors.year && <Form.Text className='update-error'>{errors.year}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="ssc">SSC : </Form.Label><br/>
                <Form.Control value={student.ssc} type='text' name='ssc' id='ssc' onChange={handleChange} placeholder='Enter your Xth School'></Form.Control><br />
                {errors.ssc && <Form.Text className='update-error'>{errors.ssc}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="sscp">Percentage : </Form.Label><br/>
                <Form.Control value={student.sscp} type='number' min='0' max='100' name='sscp' id='sscp' onChange={handleChange} placeholder='Enter your Xth percentage'></Form.Control><br />
                {errors.sscp && <Form.Text className='update-error'>{errors.sscp}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="hsc">XII<sup>th</sup>: </Form.Label><br/>
                <Form.Control value={student.hsc} type='text' name='hsc' id='hsc' onChange={handleChange} placeholder='Enter your College Name'></Form.Control><br />
                {errors.hsc && <Form.Text className='update-error'>{errors.hsc}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="hscp">XII<sup>th</sup> Percentage : </Form.Label><br/>
                <Form.Control value={student.hscp} type='number' min='0' max='100' name='hscp' id='hscp' onChange={handleChange} placeholder='Enter your XII percentage'></Form.Control><br />
                {errors.hscp && <Form.Text className='update-error'>{errors.hscp}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="ug">UnderGraduation : </Form.Label><br/>
                <Form.Control value={student.ug} type='text' name='ug' id='ug' onChange={handleChange} placeholder='Enter your UnderGraduate University/College'></Form.Control><br />
                {errors.ug && <Form.Text className='update-error'>{errors.ug}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="ugp">Percentage : </Form.Label><br/>
                <Form.Control value={student.ugp} type='number' min='0' max='100' name='ugp' id='ugp' onChange={handleChange} placeholder='Enter your Percentage'></Form.Control><br />
                {errors.ugp && <Form.Text className='update-error'>{errors.ugp}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="backlogs">Backlogs : </Form.Label><br/>
                <Form.Control value={student.backlogs} type='number' min='0' name='backlogs' id='backlogs' onChange={handleChange} placeholder='Number of Backlogs'></Form.Control><br />
                {errors.backlogs && <Form.Text className='update-error'>{errors.backlogs}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="dob">Date of Birth : </Form.Label><br/>
                <Form.Control value={student.dob} type='date' name='dob' id='dob' onChange={handleChange} placeholder='Enter your Date Of Birth'></Form.Control><br />
                {errors.dob && <Form.Text className='update-error'>{errors.dob}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="linkedIn">LinkedIn : </Form.Label><br/>
                <Form.Control value={student.linkedIn} type='text' name='linkedIn' id='linkedIn' onChange={handleChange} placeholder='Enter your LinkedIn Profile'></Form.Control><br />
                {errors.linkedIn && <Form.Text className='update-error'>{errors.linkedIn}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="nationality">Nationality : </Form.Label><br/>
                <Form.Control value={student.nationality} type='text' name='nationality' id='nationality' onChange={handleChange} placeholder='Nationality'></Form.Control><br />
                {errors.nationality && <Form.Text className='update-error'>{errors.nationality}</Form.Text>}

              </div>
              <div className='form-group'>
                <Form.Label htmlFor="phone">Contact Number : </Form.Label><br/>
                <Form.Control  value={student.phone} type='tel' name='phone' id='phone' onChange={handleChange} placeholder='Enter your Phone Number'></Form.Control><br />
                {errors.phone && <Form.Text className='update-error'>{errors.phone}</Form.Text>}

              </div>
              <button type='submit' className='update-button'>Update Student</button>
              {/* <div className='form-footer'>
                  Delete account? <button to='/' className='form-footer-link' onClick={deleteStudent(id)} style={{"color":"maroon","textDecoration":"underline","backgroundColor":"inherit"}}>Remove Account</button>
              </div> */}
              
            </Form>
          </div>

        </div>
      )
    }
  }

  // const deleteStudent = () => {
  //   Modal.confirm({
  //     title: "Are you sure, you want to remove the account?",
  //     okText: "Yes",
  //     okType: "danger",
  //     onOk: () => {
  //       console.log("Delete Student with Id : " +id);
  //     },
  //   });
  // }

  return (
    <div className='home-page'>
      <div className='nav-bar'>
        {navbar(role)}
      </div>
      {return_data(role)}
    </div>
  )
}
