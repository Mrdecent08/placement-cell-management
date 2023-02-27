import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdminNav } from './AdminNav';
import { StudentNav } from './StudentNav';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import update from '../images/icons8-upload-to-cloud-50.png'
import StatisticsService from '../api/StatisticsService';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler

} from 'chart.js';
  
ChartJS.register(
    BarElement,
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
  )
  
export const options = {
    
    scales: {
        y: {
            suggestedMin: 50,
            suggestedMax: 100
        }
    },
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
      
    //   title: {
    //     display: true,
    //     text: 'Chart.js Line Chart',
    //   },
    // },
};

export const Statistic = () => {
    
    // const [data,setData] = useState([
    //     {id:1,year:2023,cse:64,csm:45,csd:12,ece:34,mech:11,civil:56,it:99,che:33,total:100},
    //     {id:2,year:2022,cse:4,csm:15,csd:22,ece:5,mech:11,civil:56,it:99,che:33,total:104},
    //     {id:3,year:2021,cse:44,csm:25,csd:32,ece:44,mech:11,civil:56,it:99,che:33,total:500},
    //     {id:4,year:2020,cse:1,csm:35,csd:42,ece:44,mech:11,civil:56,it:99,che:33,total:150},
    //     {id:5,year:2019,cse:94,csm:45,csd:52,ece:34,mech:11,civil:56,it:99,che:33,total:200}
    // ]);

    const [data,setData] = useState([]);

    useEffect(() => {
        
        StatisticsService.getAllStatistics().then((response) => {
            console.log(response.data);
            setData(response.data);
            data.reverse();
        }).catch(err => {
            console.log(err);
        })
    })

    const navigate = useNavigate();

    const [year,setYear] = useState();
 
    const [selectedYear,setSelectedYear] = useState(new Date().getFullYear());

    var labels = [0];

    var line_points = [0];

    var role = localStorage.getItem('role');


    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        setYear(year);
    },[data])
    
    const navbar = (role) => {
      if(role === "admin"){
        return <AdminNav />
      }
      else{
        return <StudentNav />
      }
    }

    const generate_labels = (data) =>{
        data.map((item) => labels.push(item.year));
    }

    const generateLineData = (data) =>{
        data.map((item) => line_points.push(item.total));
    }

    const getYear = (d) => {
        const date = new Date(d);
        const year = date.getFullYear();
        return year;
    }

    const changeDate = (e) => {
        setSelectedYear(e.target.value);
    }

    const LineData = {
        labels : labels,
        datasets : [
            {
                label: "Total Placements",
                data: line_points,
                fill: false,
                backgroundColor: "white",
                borderColor: "rgb(53, 162, 235)",
                tension:0.4,
                pointStyle:'circle',
                pointBorderColor:'blue',
                pointBackgroundColor:'#fff',
                showLine:true
            }
        ]
    }

    var barDataPoints = [];

    const barDataPoinstsGeneration = (role) => {
        if(data.length){
            const filtered_stat = data.filter((item) => item.year == selectedYear)[0];
            barDataPoints.push(filtered_stat.cse);
            barDataPoints.push(filtered_stat.csm);
            barDataPoints.push(filtered_stat.csd);
            barDataPoints.push(filtered_stat.ece);
            barDataPoints.push(filtered_stat.mech);
            barDataPoints.push(filtered_stat.civil);
            barDataPoints.push(filtered_stat.it);
            barDataPoints.push(filtered_stat.che);
        }
    }

    const barData = {
        labels : ["CSE","CSM","CSD","ECE","MECH","CIVIL","IT","CHEMICAL"],
        datasets : [
            {
                label: "Branch Wise Placements",
                data: barDataPoints,
                backgroundColor: "rgb(53, 162, 235)",
                borderColor: "rgb(83, 162, 235)",
                borderWidth:1
            }
        ]
    };
    
    
    const renderStats = (role) => {
        {generate_labels(data)}
        {generateLineData(data)}
        {barDataPoinstsGeneration(role)}
        if(role === "admin"){
            return(
                <div className='students'>
                    <div className='page-title drive-header'>
                        <h2 style={{marginRight:"480px"}}>Statistics</h2>
                        <select name="year" id="year" style={{width:"6%",height:"50%",margin:"auto 1px"}} onChange={changeDate}>
                        {
                            data.map((item) => {
                                return(
                                    <option value={item.year}>{item.year}</option>
                                )
                            })
                        }
                        </select>
                        <button style={{backgroundColor:"white"}} className='update-link' onClick={()=>{navigate("/addStats")}}><img style={{backgroundColor:"white"}} id='add' src={update} alt='Add Stats'></img></button>

                    </div>
                    <div className='students-table'>
                        <Line data={LineData} options={options} style={{height:"300px",margin:"auto",marginTop:"25px !important",border: "2px solid gray", padding: "15px 40px"}} />
                        <h3 style={{textAlign: "left" ,marginLeft: "28%" ,fontFamily : "cursive" ,fontSize: "25px",color:"rgba(0, 0, 0, 0.762)"}}>Statistics for the Year {selectedYear}</h3>
                        <Bar data={barData} style={{height:"400px",margin:"auto",marginTop:"25px !important",border: "2px solid gray", padding: "15px 40px"}} />
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className='students'>
                    <div className='page-title drive-header'>
                        <h2 style={{marginRight:"480px"}}>Statistics</h2>
                        <select name="year" id="year" style={{width:"6%",height:"50%",margin:"auto 1px"}} onChange={changeDate}>
                        {
                            data.map((item) => {
                                return(
                                    <option value={item.year}>{item.year}</option>
                                )
                            })
                        }
                        </select>

                    </div>
                    <div className='students-table'>
                        <Line data={LineData} options={options} style={{height:"300px",margin:"auto",marginTop:"25px !important",border: "2px solid gray", padding: "15px 40px"}} />
                        <h3 style={{textAlign: "left" ,marginLeft: "28%" ,fontFamily : "cursive" ,fontSize: "25px",color:"rgba(0, 0, 0, 0.762)"}}>Statistics for the Year {selectedYear}</h3>
                        <Bar data={barData} style={{height:"400px",margin:"auto",marginTop:"25px !important",border: "2px solid gray", padding: "15px 40px"}} />
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
                {renderStats(role)}
            </div>
        </div>
        

    )
}

