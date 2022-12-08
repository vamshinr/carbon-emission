// import React, { useEffect } from "react";
// import Breakdown from "./Breakdown";
import {FaTools} from 'react-icons/fa';
import drill from './logos/drill.png';
import Typography from '@mui/material/Typography';
// import HptCon from "../connections/HptCon";
// import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ReactSpeedometer from "react-d3-speedometer";
import { Pie } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import ChartLabels from 'chartjs-plugin-datalabels';
import {BsGraphUp} from 'react-icons/bs';
Chart.register(CategoryScale);
Chart.register(ChartLabels);
// import { json } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


export default function ToolView(params){
    const hptco2 = params.hptco2;
    const batterySupplierco2 = params.batterySupplierco2;
    const motorSupplierco2 = params.motorSupplierco2;
    const seaTransportationco2 = params.seaTransportationco2;
    const groundTransportationco2 = params.groundTransportationco2;
    const data1 = {
        labels: ['Battery Supplier CO2', 'Motor Supplier CO2', 'Ground Transportation CO2', 'Sea Transportation CO2',],
        datasets: [
          {
            data: [batterySupplierco2, motorSupplierco2, seaTransportationco2, groundTransportationco2],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 3,
          },
        ],
        
      };
      
      
      const options = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += data;
                });
                let percentage = (value*100 / sum).toFixed(2)+"%";
                return percentage;
            },
            color: '#636e72',
        }
        },
      };
    return (
        <>
        <div className="">
            <span style={{color:'#a17f0f', fontSize:'45px', padding:'15px'}}><FaTools/></span> 
            <span id="tool-title-id" style={{color:'#00573d', fontSize:'40px', padding:'15px', fontFamily:'Trojan Pro Bold'}}>
                HPT {params.hpt} - Drill
            </span>
            
            <div className="row" style={{paddingTop:'20px'}}>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <img src={drill} alt='Sacramento State' style={{width: '225px', height: '200px'}} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    {/* <img src={drill} alt='Sacramento State' style={{width: '225px', height: '200px'}} /> */}
                </div>
                <div className="align-self-center col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{fontSize:'25px', fontWeight:'bold'}}>
                <ReactSpeedometer
                        minValue={0}
                        maxValue={500}
                        segments={5}
                        height = {'18'}
                        segmentColors={[
                            "#75CA6F",
                            "#68B063",
                            "#4E9E48",
                            "#34812E",
                            "#385828",
                          ]}
                        ringWidth={70}
                        currentValueText=" "
                        value={parseInt(hptco2, 10)}
                    />
                    <span style={{color:'#00573d', fontSize:'25px', paddingLeft: '10px'}}> Total CO<sub>2</sub> Emission : {hptco2}</span>   
                    
                </div>
            </div>
            <div className="row" style={{paddingTop:'18px'}}>
            <div>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#fff'}}/>} aria-controls="panel1a-content" id="panel1a-header" style={{backgroundColor:'#00573d', color:'#fff'}}>
                    <Typography>CO<sub>2</sub> Emission Breakdown</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* <Typography> */}
                    <Box sx={{ width: '100%' }}> 
                    <div style = {{display: "flex", flexDirection: "row" , placeContent : 'space-between', width : "100%" }}>
                    <div style = {{width : '50%'}}>
                        <Stack spacing={2}>
                            <Item style={{backgroundColor:'rgba(255, 99, 132, 0.2)'}}>
                                <span style={{color:'#00573d'}}>
                                    Battery Supplier CO<sub>2</sub> Emission : {batterySupplierco2}
                                </span>
                            </Item>
                            <Item style={{backgroundColor:'rgba(54, 162, 235, 0.2)'}}>
                                <span style={{color:'#00573d'}}>
                                    Motor Supplier CO<sub>2</sub> Emission : {motorSupplierco2}
                                </span>
                            </Item>
                            <Item style={{backgroundColor:'rgba(255, 206, 86, 0.2)'}}>
                                <span style={{color:'#00573d'}}>
                                    Ground Transportation CO<sub>2</sub> Emission : {groundTransportationco2}
                                </span>
                            </Item>
                            <Item style={{backgroundColor:'rgba(75, 192, 192, 0.2)'}}>
                                <span style={{color:'#00573d'}}>
                                    Sea Transportation CO<sub>2</sub> Emission : {seaTransportationco2}
                                </span>
                            </Item>
                        </Stack>
                    </div>
                    <div style = {{width : '50%'}}> 
                <Pie data = {data1} width={"50%"} options={options}/>
                    
                    </div>
                    </div>
                    </Box>
                    {/* </Typography> */}
                </AccordionDetails>
                </Accordion>
            </div>
            </div>
        </div>
        </>
    );

}
