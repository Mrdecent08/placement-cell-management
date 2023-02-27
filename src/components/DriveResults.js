import React, { useEffect, useState } from 'react'
import { AdminNav } from './AdminNav';
import { StudentNav } from './StudentNav';
import '../Styles/DriveResults.css';
import { useNavigate } from 'react-router-dom';
import trash from '../images/icons8-trash-30.png';
import { Modal } from 'antd';
import ResultService from '../api/ResultService'

export const DriveResults = () => {

  const navigate = useNavigate();

  const [year,setYear] = useState();
 
  const [selectedYear,setSelectedYear] = useState(new Date().getFullYear());

  var sno = 1;

  const [driveResults,setDriveResults] = useState([]);

  useEffect(() => {
    ResultService.getAllResults().then((response) => {
      setDriveResults(response.data);
    }).catch(err => {
      console.log(err);
    })
    const today = new Date();
    const year = today.getFullYear();
    setYear(year);
  },[driveResults])

  // const [driveResults,setDriveResults] = useState([
  //   {id:1,companyName:"Infosys",resultLink:"fiudsghihdfhgdh"},
  //   {id:2,companyName:"TCS",resultLink:"fiudsghihdfhgdh"},
  //   {id:3,companyName:"CTS",resultLink:"fiudsghihdfhgdh"},
  //   {id:4,companyName:"Mindtree",resultLink:"fiudsghihdfhgdh"},
  //   {id:5,companyName:"Hello",resultLink:"fiudsghihdfhgdh"}
  // ]);
  var role = localStorage.getItem('role');
  const navbar = (role) => {
    if(role === "admin"){
      return <AdminNav />
    }
    else{
      return <StudentNav />
    }
  }

  const getYear = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    return year;
  }

  const changeDate = (e) => {
    setSelectedYear(e.target.value);
  }

  const deleteResullt = (id) => {
    console.log("Delete Drive with Id : " +id);
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        ResultService.deleteResultById(id);
      },
    });
  }

  const increment = (val) => {
    sno = sno+1;
  }


  const retrieveResults = (role) => {
    console.log(selectedYear);
    const filtered_results = driveResults.filter((item) => ((getYear(item.date) == selectedYear) || (selectedYear==1)));      
    console.log(filtered_results);
    if(role === "admin"){
      return(
        <div>
          <div className='page-title drive-header'>
            <h2 style={{marginRight:"450px"}}>Drive Results</h2>
              <select name="year" id="year" style={{width:"6%",height:"50%",margin:"auto 1px"}} onChange={changeDate}>
                <option value={year}>{year}</option>
                <option value={year-1}>{year-1}</option>
                <option value={year-2}>{year-2}</option>
                <option value={1}>All</option>
              </select>
            <button  onClick={()=>navigate("/addResult")}>Add Result</button>
          </div>
          <div className='student-table'>

            {filtered_results.length === 0 && <h1 style={{"color":"red"}}>No data found</h1>}
            {
              (filtered_results.length>0) 
               &&
              <table className='results-table'>
                <thead>
                  <th>S.No</th>
                  <th>Company Name</th>
                  <th className='result_link'>Result Link</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {
                    filtered_results.map((item)=>
                      <tr>
                        <td>{sno}</td>
                        {increment(1)}
                        <td>{item.companyName}</td>
                        <td className='result_link'><a style={{"color":"blue","textDecoration":"none"}} target="_blank" href={item.resultLink}>result_sheet</a></td>
                        <td><button className='delete-link' onClick={()=>{deleteResullt(item.id)}}  style={{"marginLeft":"10px"}}><img id='trash' src={trash} alt='Trash'></img></button></td>
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
    else{
      const filtered_results = driveResults.filter((item) => ((getYear(item.date) == selectedYear) || (selectedYear==1)));      
      return(
        <div>
          <div className='page-title drive-header'>
            <h2 style={{marginRight:"480px"}}>Drive Results</h2>
            <select name="year" id="year" style={{width:"6%",height:"50%",margin:"auto 1px"}} onChange={changeDate}>
              <option value={year}>{year}</option>
              <option value={year-1}>{year-1}</option>
              <option value={year-2}>{year-2}</option>
              <option value={1}>All</option>
            </select>
          </div>
          <div className='student-table'>
            { filtered_results.length === 0 && <h1 style={{"color":"red"}}>No data found</h1> }
            {
              (filtered_results.length>0) 
               &&
              <table className='results-table'>
                <thead>
                  <th>S.No</th>
                  <th>Company Name</th>
                  <th>Result Link</th>

                </thead>
                <tbody>
                  {
                    filtered_results.map((item)=>
                      <tr>
                        <td>{sno}</td>
                        {increment(1)}
                        <td>{item.companyName}</td>
                        <td className='result_link'><a style={{"color":"blue","textDecoration":"none"}} target="_blank" href={item.resultLink}>result_sheet</a></td>

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
  } 

  return (
    <div className='home-page students-page'>
      <div className='nav-bar'>
        {navbar(role)}
      </div>
      <div className='students drive-results'>
        {retrieveResults(role)}
      
      </div>
    </div>
  )
}
