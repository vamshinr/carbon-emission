import React from "react";
// import Breakdown from "./Breakdown";
import {FaTools} from 'react-icons/fa';
import drill from './logos/drill.png';
import Typography from '@mui/material/Typography';
import HptCon from "../connections/HptCon";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';

function createData(Component, Emission ) {
    return { Component, Emission };
}

const rows = [
    
  ];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


export default function ToolView(params){

    // const [hptId, setHPTId] = useState('');
    const [hptco2,setHPTco2] = useState([]);
    const [seaTransportationco2,setseaTransportationco2] = useState([]);
    const [groundTransportationco2,setgroundTransportationco2] = useState([]);
    // const [userAuthco2,setuserAuthco2] = useState([]);
    const [motorSupplierco2,setmotorSupplierco2] = useState([]);
    const [batterySupplierco2, setbatterySupplierco2] = useState([]);
  
    async function co2data(){
        const hptTotal = await HptCon.hpt_fetch_by_number(params.hpt)
        setHPTco2([...hptTotal])
  
        const motor = await HptCon.hpt_fetch_by_number(params.hpt, 'motor')
        setmotorSupplierco2([...motor])
  
        const battery = await HptCon.hpt_fetch_by_number(params.hpt, 'battery')
        setbatterySupplierco2([...battery])

        const seat =  await HptCon.hpt_fetch_by_number(params.hpt, 'seatransport')
        setseaTransportationco2([...seat])

        const groundt = await HptCon.hpt_fetch_by_number(params.hpt, 'groundtransport')
        setgroundTransportationco2([...groundt])
    }
    co2data();
    const totalBatteryCo2 = batterySupplierco2.reduce(function (res, item) {return res + item.co2;}, 0);
    const totalMotorCo2 = motorSupplierco2.reduce(function (res, item) {return res + item.co2;}, 0);
    const totalseaco2 = seaTransportationco2.reduce(function (res, item) {return res + item.co2;}, 0);
    const totalgroundco2 = groundTransportationco2.reduce(function (res, item) {return res + item.co2;}, 0);
    const totalHPTCo2 = hptco2.reduce(function (res, item) {return res + item.co2;}, 0);

    console.log("data:  ",totalseaco2,totalgroundco2);
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
                    <span style={{color:'#00573d'}}> Total CO<sub>2</sub> Emission : </span>   {totalHPTCo2}
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
                        <Stack spacing={2}>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Battery Supplier CO<sub>2</sub> Emission : {totalBatteryCo2}
                                </span>
                            </Item>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Motor Supplier CO<sub>2</sub> Emission : {totalMotorCo2}
                                </span>
                            </Item>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Ground Transportation CO<sub>2</sub> Emission : {totalseaco2}
                                </span>
                            </Item>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Sea Transportation CO<sub>2</sub> Emission : {totalgroundco2}
                                </span>
                            </Item>
                        </Stack>
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
