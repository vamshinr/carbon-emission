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
