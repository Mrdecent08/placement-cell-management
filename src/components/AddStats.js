import {useState} from 'react'
import * as XLSX from 'xlsx'
import {Form} from 'react-bootstrap';
import resultLogo from '../images/stat.jpg';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import StatisticsService from '../api/StatisticsService';
import { useEffect } from 'react';
import stat_format from '../file_format/stat_format.xlsx';

function App() {

  const [data,setData] = useState([]);
  
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
   const navigate = useNavigate();
  const [check,setCheck] = useState(false);
  const [checkError,setCheckError] = useState(null);
  const [excelData, setExcelData]=useState(null);
  const [statData,setStatData] = useState({});

  const fileType=['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  useEffect(() => {  
    StatisticsService.getAllStatistics().then((response) => {
        console.log(response.data);
        setData(response.data);
    }).catch(err => {
        console.log(err);
    })
  })

  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  const handleChange = (e) =>{
    setStatData({...statData,[e.target.name]:e.target.value})
  }

  const handleCheck = () => {
    setCheck(!check);
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      const total = data.length;
      const cse_filter = data.filter((item) => item.branch == "cse").length;
      const csm_filter = data.filter((item) => item.branch == "csm").length;
      const csd_filter = data.filter((item) => item.branch == "csd").length;
      const ece_filter = data.filter((item) => item.branch == "ece").length;
      const mech_filter = data.filter((item) => item.branch == "mech").length;
      const che_filter = data.filter((item) => item.branch == "che").length;
      const civil_filter = data.filter((item) => item.branch == "civil").length;
      const it_filter = data.filter((item) => item.branch == "it").length;
      setStatData({...statData,total:total,cse:cse_filter,csm:csm_filter,csd:csd_filter,ece:ece_filter,mech:mech_filter,che:che_filter,civil:civil_filter,it:it_filter});
      
      }
      else{
        setExcelData(null);
      }
  }
  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(statData.year > new Date().getFullYear()+1){
        swal({
            title:"Invalid Passout Error",
            icon :"error",
            button : "Ok"
        })
    }
    else if(check){
      console.log(data);
      const filtered_statData = data.filter((item) => item.year == statData.year);
      // console.log(filtered_statData);
      if(filtered_statData.length > 0){
        console.log("update");
        var update_id = filtered_statData[0].id;
        StatisticsService.updateStatisticById(update_id,statData).then((response) => {
            console.log("Updated");
        }).catch(error => {
              console.log(error)
        });
      }
      else{
          StatisticsService.createStatistic(statData).then((response) =>{
              console.log(response.data)
          }).catch(error => {
              console.log(error)
          })
      }
      navigate("/statistics");
      
    }
    else{
      setCheckError("* Not Checked !!");
    }
  }
  
  return (
     <div className='home-page login-page'>
      <div className='header'>
        <img src={resultLogo} alt='Logo'></img>
        <h1 style={{"color":"white","fontFamily":"cursive","fontSize":"40px"}}>Placements</h1>
      </div>
      <div className='login-form'>
        <Form onSubmit={handleSubmit}>
          <h2>Add Stats</h2>
          <p>Enter details below</p>
          <hr />
          <div className='form-group'>
            <Form.Control value={statData.year} type='number' name='year' id='year' onChange={handleChange} placeholder='Enter Passout Year' required></Form.Control><br />
            {/* {errors.companyName && <Form.Text className='error-text'>{errors.companyName}</Form.Text>} */}
          </div>
          <div className='form-group'>
            <Form.Control style={{marginLeft:"8.5%"}} type='file' name='excelFile' id='excelFile' onChange={handleFile} placeholder='Result File Link' required></Form.Control>
            <a href={stat_format} style={{color:"blue",textDecoration:"None"}} download>format</a>
            <br />
            {excelFileError&&<div className='text-danger' style={{margin:"10px",fontSize:"15px",color:"red"}}>{excelFileError}</div>}
          </div>
          <div style={{display:"flex" ,marginLeft:"20%"}} >
            <Form.Control type='checkbox' name='check' id='check' onChange={handleCheck} placeholder="All the Details are correct"></Form.Control><br />
            <p style={{color:"black" , fontSize:"17px" , fontFamily:"Helvetica Neue",margin:"2px 15px"}}>Agree</p>
            <br />
          </div>
          { !check && <div className='text-danger' style={{margin:"10px",fontSize:"15px",color:"red"}}>{checkError}</div> }

          <button type='submit'>Add Data</button>
          
        </Form>

      </div>
    </div>
  );
}

export default App;