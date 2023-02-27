import React, { useEffect, useState } from 'react'
import { AdminNav } from './AdminNav';
import { StudentNav } from './StudentNav';
import '../Styles/Drives.css';
import update from '../images/icons8-edit-30.png';
import trash from '../images/icons8-trash-30.png';
import { Modal,Input} from "antd";
import { useNavigate } from 'react-router-dom';
import StudentService from '../api/StudentService';
import DriveService from '../api/DriveService';
import swal from 'sweetalert';

export const Drives = () => {

  const navigate = useNavigate();

  const student_email = localStorage.getItem("email"); 

  const [year,setYear] = useState();
 
  const [selectedYear,setSelectedYear] = useState(new Date().getFullYear());
  var sno = 1;

  const [editing,setEditing] = useState(false);
  const [editingDrive,setEditingDrive] = useState(null);
  
  const [Students,setStudents] = useState([]);
  const [drives,setDrives] = useState([]);


  useEffect(() => {
    StudentService.getAllStudents().then((response) => {
      setStudents(response.data);
    }).catch(err => {
      console.log(err);
    })
    DriveService.getAllDrives().then((response) => {
      setDrives(response.data);
    }).catch(err => {
      console.log(err);
    })
    const today = new Date();
    const year = today.getFullYear();
    setYear(year);
  },[drives])

  
  var role = localStorage.getItem('role');
  
  const navbar = (role) => {
    if(role==="admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }

  const deleteDrive = (id) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        DriveService.deleteDriveById(id);
      },
    });
  }

  const branchEligible = (x,y) => {
    if(x.includes(y)){
      return true;
    }
    return false;
  }
  const editDrive = (record) => {
    setEditing(true);
    setEditingDrive(record);
    console.log(editingDrive);
  }

  const resetEditing = () => {
    setEditing(false);
    setEditingDrive(null);
  }

  const getYear = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    return year;
  }

  const updateDrive = (id,editingDrive) => {
    console.log(editingDrive);
    DriveService.updateDriveById(id,editingDrive).then((response) => {
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
  }

  const increment = (val) => {
    sno = sno+1;
    
  }

  const changeDate = (e) => {
    setSelectedYear(e.target.value);
  }
  useEffect(() => {

  },[drives]);

  const renderTable = (role) => {
    if(role==="admin"){
      const filtered_drives = drives.filter((item) => ((getYear(item.date) == selectedYear) || (selectedYear==1)));      
      return (
        <div className='students'>
          <div className='page-title drive-header'>
              <h2 style={{marginRight:"680px"}}>Placement Drives</h2>
              <select name="year" id="year" style={{width:"6%",height:"50%",margin:"auto 1px"}} onChange={changeDate}>
                <option value={year}>{year}</option>
                <option value={year-1}>{year-1}</option>
                <option value={year-2}>{year-2}</option>
                <option value={1}>All</option>
              </select>
		          <button onClick={()=>navigate("/addDrive")}>Add Drive</button>
          </div>
          <div className='student-table'>

            { filtered_drives.length === 0 && <h2 style={{"color":"red"}}>No Drives Available</h2> }
            { 
              filtered_drives.length > 0 
                &&
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Company Name</th>
                    <th>Roles Offered</th>
                    <th>packages</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>referenceLinks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    filtered_drives.map((item)=>
                      <tr>
                        <td>{sno}</td>
                        {increment(1)}
                        <td>{item.companyName}</td>
                        <td>{item.roles}</td>
                        <td>{item.packages}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td><a style={{"color":"blue","textDecoration":"none","fontSize":"18px"}} target="_blank" href={item.referenceLinks}>reference links</a></td>
                        <td>
                          <div className='drive-update'>
                            <button className='update-link' onClick={()=>{editDrive(item)}}><img id='edit' src={update} alt='Edit'></img></button>
                            <button className='update-link' onClick={() => {deleteDrive(item.id)}}><img id='trash' src={trash} alt='Trash'></img></button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </tbody>

              </table>
            }
            
            <Modal 
              visible={editing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                  updateDrive(editingDrive?.id,editingDrive);
                  resetEditing();
                }}
            >
              <h3>Update Drive Status of {editingDrive?.companyName}</h3>
              <Input value={editingDrive?.status} onChange = {(e) => {setEditingDrive((pre) => {return {...pre,status:e.target.value }})}} ></Input>

            </Modal>

            
          </div>
        
        </div>
      )
    }
    else{
      const student = Students.filter((item)=>item.email === student_email);
      var filtered_drives ;
      if(selectedYear == new Date().getFullYear()){
        filtered_drives = drives.filter((item)=> item.backlogs>=student[0].backlogs && item.cutoff_percent<=student[0].ugp && branchEligible(item.branches,student[0].branch) && getYear(item.date) == selectedYear);
      }
      else{
        filtered_drives = drives.filter((item)=> branchEligible(item.branches,student[0].branch) && ((getYear(item.date) == selectedYear) || (selectedYear==1)));
      }
      console.log(student);
      console.log(filtered_drives);
      if(true){
        return(
            <div className='students'>
              <div className='page-title drive-header'>
                <h2 style={{marginRight:"680px"}}>Placement Drives</h2>
                <select name="year" id="year" style={{width:"6%",height:"50%",margin:"auto 1px"}} onChange={changeDate}>
                  <option value={year}>{year}</option>
                  <option value={year-1}>{year-1}</option>
                  <option value={year-2}>{year-2}</option>
                  <option value={1}>All</option>
                </select>
              </div>
              <div className='student-table'>
                { filtered_drives.length === 0 && <h2 style={{"color":"red"}}>No Applicable Drives</h2> }
                { 
                  filtered_drives.length > 0
                   &&
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Company Name</th>
                        <th>Roles Offered</th>
                        <th>Packages</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>References</th>
                      </tr>
                    </thead>
                    <tbody>
      
                      {
                        filtered_drives.map((item)=>
                          <tr>
                            <td>{sno}</td>
                            {increment(1)}
                            <td>{item.companyName}</td>
                            <td>{item.roles}</td>
                            <td>{item.packages}</td>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                            <td><a style={{"color":"blue","textDecoration":"none","fontSize":"18px"}} target="_blank" href={item.referenceLinks}>reference links</a></td>
                          </tr>
                        )
                      }
                    </tbody>
      
                  </table>  
                }

              </div>
    
            </div>
        )
      }
      // else{
      //   return(
      //     <div className='students'>
      //         <div className='page-title'>
      //           <h2>Placement Drives</h2>
      //         </div>
      //         <div className='student-table'>
      //           <table>
      //             <thead>
      //               <tr>
      //                 <th>S.No</th>
      //                 <th>Company Name</th>
      //                 <th>Roles Offered</th>
      //                 <th>packages</th>
      //                 <th>Status</th>
      //                 <th>referenceLinks</th>
      //               </tr>
      //             </thead>
      //             <tbody>
    
      //               <tr>Not Eligible for any drive</tr>
      //             </tbody>
    
      //           </table>
      //         </div>
    
      //       </div>
      //   )
      // }
      
      
    }
  }
  return (
  
    <div className='home-page students-page'>
    
      <div className='nav-bar'>
        {navbar(role)}
      </div>
      {renderTable(role)}
      
    </div>
    
  )
}
