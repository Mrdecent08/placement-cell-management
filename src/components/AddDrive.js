import React, { useState } from 'react'
import { AdminNav } from './AdminNav';
import { StudentNav } from './StudentNav';
import imgSrc from '../images/placement-drive.png'
import '../Styles/AddDrive.css';
import { useNavigate } from 'react-router-dom';
import DriveService from '../api/DriveService';
import resultLogo from '../images/results-modified.png';
import swal from 'sweetalert';

export const AddDrive = () => {
  var role = localStorage.getItem('role');

  const navigate = useNavigate();

  // const [CompanyDetails,setCompanyDetails] = new useState({status:"upcoming",cse:false,csm:false,csd:false,ece:false,mech:false,civil:false,it:false,che:false,});
  const [CompanyDetails,setCompanyDetails] = new useState({status:"upcoming",type:"Full-Time"});
  
  const [branches,setBranches] = useState([]);

  const navbar = (role) => {
    if(role=="admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }

  const handleChange = (e) => {
    if(e.target.name === "branches"){
      setCompanyDetails({...CompanyDetails,[e.target.name]:handlecheckbox(e)});

    }
    else{
      setCompanyDetails({...CompanyDetails,[e.target.name]:e.target.value});

    }
  }

  const handlecheckbox = (e) => {
    let data = branches;
    if(data.includes(e.target.value)){
      data = data.filter(item => item !== e.target.value);
    }
    else{
      data.push(e.target.value);
    }
    console.log(data);
    setBranches(data);
    return branches;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(CompanyDetails);
    setCompanyDetails({...CompanyDetails,branches:{branches}});
    console.log(CompanyDetails);
    DriveService.createDrive(CompanyDetails).then((resposne) => {
      swal({
          title:"Drive Added Succesfully",
          text : "Thank you for the Addition",
          icon: "success",
          button : "OK",
      });
      navigate("/drives");
    })
  }

  return (
    <div className='home-page login-page'>
      <div className='header' style={{width:"26%"}}>
        <img src={resultLogo} alt='Logo'></img>
        <h1 style={{"color":"white","fontFamily":"cursive","fontSize":"40px"}}>Company Details</h1>
      </div>
      <div className='addDrive'>
        <div className='addDrive-formdata'>
          <div className='addDrive-header'>
            <h2>Add New Drive</h2>
            <h6>Enter the details of New Drive</h6>
            <hr />
          </div>
          <div className='addDrive-form' style={{"display":"flex"}}>
            <form onSubmit={handleSubmit}>
              <table className='addDrive-table'>
                <tr>
                  <td><label>Company Name  : </label></td>
                  <td><input type='text' value={CompanyDetails.companyName} id='companyName' name='companyName' placeholder='Company Name' onChange={handleChange} required></input></td>
                  {/* <div className='addDrive-row'>
                    <label>Company Name</label>
                    <input type='text' value={CompanyDetails.companyName} id='companyName' name='companyName' placeholder='Enter name of the Company' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td><label>Roles  : </label></td>
                  <td><input type='text' value={CompanyDetails.roels} id='roles' name='roles' placeholder='Roles Offered' onChange={handleChange} required></input></td>
                  {/* <div className='addDrive-row'>
                    <label>Roles</label>
                    <input type='text' value={CompanyDetails.roels} id='roles' name='roles' placeholder='Enter roles offered by the Company' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td><label>Package  : </label></td>
                  <td><input type='text' value={CompanyDetails.packages} id='packages' name='packages' placeholder='Package Offered' onChange={handleChange} required></input></td>
                  {/* <div className='addDrive-row'>
                    <label>Package</label>
                    <input type='text' value={CompanyDetails.package} id='package' name='package' placeholder='Enter package offered by the Company' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td>Branch : </td>
                  <td style={{"textAlign":"left"}}>
                    <input type="checkbox" id="cse" name="branches" value="cse" onChange={handleChange}/>
                    <label for="cse"> CSE </label>
                    <br />
                    <input type="checkbox" id="csm" name="branches" value="csm" onChange={handleChange} />
                    <label for="csm"> CSM </label><br />
                    <input type="checkbox" id="csd" name="branches" value="csd" onChange={handleChange} />
                    <label for="csd"> CSD </label><br />
                    <input type="checkbox" id="ece" name="branches" value="ece" onChange={handleChange} />
                    <label for="ece"> ECE </label><br />
                    <input type="checkbox" id="mech" name="branches" value="mech" onChange={handleChange} />
                    <label for="mech"> MECH </label><br />
                    <input type="checkbox" id="civil" name="branches" value="civil" onChange={handleChange} />
                    <label for="civil"> CIVIL </label><br />
                    <input type="checkbox" id="it" name="branches" value="it" onChange={handleChange} />
                    <label for="it"> IT </label><br />
                    <input type="checkbox" id="che" name="branches" value="che" onChange={handleChange} />
                    <label for="chemical"> CHEMICAL </label>
                  </td>
                </tr>
                <br />
                <tr>
                  <td><label>References  : </label></td>
                  <td><input type='text' value={CompanyDetails.referenceLinks} id='referenceLinks' name='referenceLinks' placeholder='References' onChange={handleChange} ></input></td>
                  {/* <div className='addDrive-row'>
                    <label>References</label>
                    <input type='text' value={CompanyDetails.references} id='references' name='references' placeholder='References' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td><label>Type : </label></td>
                  {/* <td><input type='number' value={CompanyDetails.backlogs} id='backlogs' name='backlogs' placeholder='Max Backlogs' onChange={handleChange} ></input></td> */}
                  <td>
                    <select name="type" id="type" value={CompanyDetails.type} onChange={handleChange}>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </td>
                  {/* <div className='addDrive-row'>
                    <label>Backlogs</label>
                    <input type='number' value={CompanyDetails.backlogs} id='backlogs' name='backlogs' placeholder='Enter backlogs allowed' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td><label>Status : </label></td>
                  {/* <td><input type='number' value={CompanyDetails.backlogs} id='backlogs' name='backlogs' placeholder='Max Backlogs' onChange={handleChange} ></input></td> */}
                  <td>
                    <select name="status" id="status" value={CompanyDetails.status} onChange={handleChange} >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  {/* <div className='addDrive-row'>
                    <label>Backlogs</label>
                    <input type='number' value={CompanyDetails.backlogs} id='backlogs' name='backlogs' placeholder='Enter backlogs allowed' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td><label>PassOut : </label></td>
                  <td><input style={{"width":"90%"}} type='date' value={CompanyDetails.date} id='date' name='date' placeholder="Enter date of Entry" onChange={handleChange} required></input></td>
                </tr>
                <tr>
                  <td><label>Backlogs  : </label></td>
                  <td><input type='number' value={CompanyDetails.backlogs} id='backlogs' name='backlogs' placeholder='Max Backlogs' onChange={handleChange} required></input></td>
                  {/* <div className='addDrive-row'>
                    <label>Backlogs</label>
                    <input type='number' value={CompanyDetails.backlogs} id='backlogs' name='backlogs' placeholder='Enter backlogs allowed' onChange={handleChange} ></input>
                  </div> */}
                </tr>
                <tr>
                  <td><label style={{"fontSize":"19px"}}>Cutoff : </label></td>
                  <td><input type='number' value={CompanyDetails.cutoff_percent} id='cutoff_percent' name='cutoff_percent' placeholder='CutOff Percentage' onChange={handleChange} required></input></td>
                  {/* <div className='addDrive-row'>
                    <label>Cutoff Percentage</label>
                    <input type='number' value={CompanyDetails.cutoff_percent} id='cutoff_percent' name='cutoff_percent' placeholder='CutOff-Percentage' onChange={handleChange} ></input>
                  </div> */}
                </tr>
              </table>
              
              <button type='submit'>Add Drive</button>
            </form>
            <div className='addDrive-image'>
              <img style={{"marginTop":"25%"}} src={imgSrc}></img>
            </div>
          </div>
        </div>
        <div className='addDrive-border'>
          {/* <img src={imgSrc} alt='placement-drive'></img> */}
        </div>
      
      </div>
    </div>
  )
}
