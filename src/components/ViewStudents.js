import React, { useEffect, useState } from 'react'
import { AdminNav } from './AdminNav';
import { StudentNav } from './StudentNav';
import '../Styles/ViewStudents.css'
import { Modal } from 'antd';
import update from '../images/icons8-edit-30.png';
import trash from '../images/icons8-trash-30.png'
import StudentService from '../api/StudentService'
import { useNavigate } from 'react-router-dom';

export const ViewStudents = () => {

  const [getStudents,setGetStudents] = useState([]);

  const [Students,setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    StudentService.getAllStudents().then((response) => {
      setGetStudents(response.data);
      const filtered_students = getStudents.filter((item)=>item.role==="student");
      console.log(getStudents);
      if(filtered_students.length>1){
        filtered_students.sort(function(s1,s2){
          return s1.rollNo.localeCompare(s2.rollNo);
        })
      }
      
      setStudents(filtered_students);
    }).catch(err => {
      console.log(err);
    })
  },[getStudents]);

  const only_students = Students.filter((item)=> (item.role === "student"));

  const deleteStudent = (id) => {
    console.log(getStudents);
    Modal.confirm({
      title: "Are you sure, you want to delete this student?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        StudentService.deleteStudentById(id);
      },
    });
  }

  const editStudent = (id) => {
    localStorage.setItem("update_studentId",id);
    navigate("/update");
  }

  var role = localStorage.getItem('role');
  
  const navbar = (role) => {
    if(role==="admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }

  
  return (
    <div className='home-page students-page'>
      <div className='nav-bar'>
        {navbar(role)}
      </div>
      <div className='students'>
        <div className='page-title drive-header'>
            <h2>Students Data</h2>
            <button onClick={()=>navigate("/addAdmin")} style={{marginLeft:"880px"}}>Add Admin</button>
        </div>
        <div className='student-table'>
          { only_students.length === 0 && <h2 style={{"color":"red"}}>No Data Available</h2> }
          { 
            only_students.length > 0
              &&
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th style={{"width":"300px"}}>Email</th>
                  <th>Course</th>
                  <th>Branch</th>
                  <th>Contact Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {
                  only_students.map((item)=>
                    <tr>
                      <td>{item.rollNo}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.course}</td>
                      <td>{item.branch}</td>
                      <td>{item.phone}</td>
                      <td>
                          <div className='drive-update'>
                            <button className='delete-link' onClick={()=>{editStudent(item.id)}}   style={{"marginLeft":"5px"}}><img style={{"padding":"10px 0px"}} id='edit' src={update} alt='Edit'></img></button>
                            <button className='delete-link' onClick={() => {deleteStudent(item.id)}}  style={{"marginLeft":"5px"}}><img style={{"padding":"10px 0px"}} id='trash' src={trash} alt='Trash'></img></button>
                          </div>
                      </td>
                      {/* <td><button className='delete-link' onClick={()=>{deleteStudent(item.id)}}  style={{"marginLeft":"5px"}}><img style={{"padding":"10px 0px"}} id='trash' src={trash} alt='Trash'></img></button></td> */}
                    </tr>
                  )
                }
              </tbody>

            </table>
          }
          
        </div>
      
      </div>
    </div>
  )
}


