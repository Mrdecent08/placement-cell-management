import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import ResultValidation from './ResultValidation';
import '../Styles/Login.css'
import swal from 'sweetalert';
import resultLogo from '../images/results-modified.png';
import ResultService from '../api/ResultService';


export const AddResult = () => {

  const navigate = useNavigate();

  const [resultDetails,setResultDetails] = useState({
    companyName:"",
    resultLink:"",
    date:new Date()
  }); 

  const [errors,setError] = useState({});

  const handleChange = (e) =>{
    setResultDetails({...resultDetails,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e) => {
    e.preventDefault(); 
    setError(ResultValidation(resultDetails));
    if(Object.keys(ResultValidation(resultDetails)).length === 0){
      ResultService.createResult(resultDetails).then((resposne) => {
        swal({
            title:"Result Added Succesfully",
            text : "Thank you for the Addition",
            icon: "success",
            button : "OK",
        });
        navigate("/driveResults");
      })
    }
  }


  return (
    <div className='home-page login-page'>
      <div className='header'>
        <img src={resultLogo} alt='Logo'></img>
        <h1 style={{"color":"white","fontFamily":"cursive","fontSize":"40px"}}>Placement Results</h1>
      </div>
      <div className='login-form'>
        <Form onSubmit={handleSubmit}>
          <h2>Add Result</h2>
          <p>Enter result details below</p>
          <hr />
          <div className='form-group'>
            <Form.Control value={resultDetails.companyName} type='text' name='companyName' id='companyName' onChange={handleChange} placeholder='Enter Company Name'></Form.Control><br />
            {errors.companyName && <Form.Text className='error-text'>{errors.companyName}</Form.Text>}
          </div>
          <div className='form-group'>
            <Form.Control type='text' value={resultDetails.resultLink} name='resultLink' id='resultLink' onChange={handleChange} placeholder='Result File Link'></Form.Control><br />
            {errors.resultLink && <Form.Text className='error-text'>{errors.resultLink}</Form.Text>}
          </div>
          <div className='form-group'>
            <Form.Control type='date' value={resultDetails.date} name='date' id='date' onChange={handleChange} placeholder='PassOut Date'></Form.Control><br />
          </div>
          <button type='submit'>Add Result</button>
          
        </Form>

      </div>
    </div>
  )
}
