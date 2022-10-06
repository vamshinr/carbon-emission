import React from "react";
import Breakdown from "./Breakdown";
import {FaTools} from 'react-icons/fa';
import drill from './logos/drill.png';
import Typography from '@mui/material/Typography';
import BatteryCon from '../connections/BatteryCon';
import MotorCon from "../connections/MotorCon";
import HptCon from "../connections/HptCon";
import groundTransportCon from "../connections/groundTransportCon";
import SeaTransportCon from "../connections/SeaTransportCon";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function ToolView(params){
    console.log(params.hpt);
    const [hptId, setHPTId] = useState();
    const [hptco2,setHPTco2] = useState(0);
    const [seaTransportationco2,setseaTransportationco2] = useState(0);
    const [groundTransportationco2,setgroundTransportationco2] = useState(0);
    const [userAuthco2,setuserAuthco2] = useState(0);
    const [motorSupplierco2,setmotorSupplierco2] = useState(0);
    const [batterySupplierco2, setbatterySupplierco2] = useState(0);
    const [batteryid,setbatteryid] = useState();
    const [motorid,setmotorid] = useState();
    const [seaid,setseaid] = useState();
    const [groundid,setgroundid] = useState();

    HptCon.hpt_fetch().then(function(result) {
        for (var i = 0; i < result.items.length; i++) {
          if (result.items[i].SerialNumber === params.hpt){
            setHPTId(result.items[i].SerialNumber);
            console.log("hpt found")
            console.log("hpt:", result.items[i]);
            setHPTco2(result.items[i].co2);
            setbatteryid(result.items[i].BatteryId);
            setmotorid(result.items[i].motorId);
            setseaid(result.items[i].seaTransportId);
            setgroundid(result.items[i].groundTransportId);
          }
          else{
            setHPTco2(0);
            setbatterySupplierco2(0);
            setmotorSupplierco2(0);
            setseaTransportationco2(0);
            setgroundTransportationco2(0);
          }
        }
      });

      if (hptco2 !==0){
    BatteryCon.battery_fetch().then(function(result) {
        for (var i = 0; i < result.items.length; i++) {
          if (result.items[i].serialNumber === batteryid){
            console.log("battery found "+result.items[i].co2);
            setbatterySupplierco2(result.items[i].co2);
          }
        }
      });


    MotorCon.motor_fetch().then(function(result) {
    for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].serialNumber === motorid){
        setmotorSupplierco2(result.items[i].co2);
        }
        else{
        setmotorSupplierco2(0);
        }
    }
    });


    SeaTransportCon.sea_fetch().then(function(result) {
    for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].trackingNumber === seaid){
        setseaTransportationco2(result.items[i].co2);
        }
        else{
        setseaTransportationco2(0);
        }
    }
    });


    groundTransportCon.ground_fetch().then(function(result) {
    for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].trackingNumber === groundid){
        setgroundTransportationco2(result.items[i].co2);
        }
        else{
        setgroundTransportationco2(0);
        }
    }
    });

}
    //HTML rendering
    return (
        <>
        <div className="">
            <span style={{color:'#a17f0f', fontSize:'45px', padding:'15px'}}><FaTools/></span> 
            <span id="tool-title-id" style={{color:'#00573d', fontSize:'40px', padding:'15px', fontFamily:'Trojan Pro Bold'}}>
                HPT {params.hpt}
            </span>
            
            <div className="row" style={{paddingTop:'20px'}}>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <img src={drill} alt='Sacramento State' style={{width: '225px', height: '200px'}} />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    {/* <img src={drill} alt='Sacramento State' style={{width: '225px', height: '200px'}} /> */}
                </div>
                <div className="align-self-center col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{fontSize:'25px', fontWeight:'bold'}}>
                    <span style={{color:'#00573d'}}> Total CO<sub>2</sub> Emission : </span>   {hptco2}
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
                                    Battery Supplier CO<sub>2</sub> Emission : {batterySupplierco2}
                                </span>
                            </Item>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Motor Supplier CO<sub>2</sub> Emission : {motorSupplierco2}
                                </span>
                            </Item>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Ground Transportation CO<sub>2</sub> Emission : {groundTransportationco2}
                                </span>
                            </Item>
                            <Item>
                                <span style={{color:'#00573d'}}>
                                    Sea Transportation CO<sub>2</sub> Emission : {seaTransportationco2}
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
