import React from "react";
import Typography from '@mui/material/Typography';
import {FaTools} from 'react-icons/fa';
import logo from './logos/sac_state_logo.jpg';
import BatteryCon from '../connections/BatteryCon';
import Breakdown from "./Breakdown";
import { useState } from "react";

export default function ToolView(){
    // var hpt_id = 123;
    const item = 
        {
            id: 'HPT123' ,
            name: ' - HPT Driller Machine',
            description: 'Hornet Power Tools is a Web Application developed by Team 4 for tracking Carbon emission for all the products used by Hornet family.'

        };
    
    BatteryCon.battery_fetch().then(function(result)
        {
            console.log(result);
            setco2data(result);
        });
    console.log(co2data);
    return (
        <>
        <div className="">
            <span style={{color:'#a17f0f', fontSize:'25px', padding:'15px'}}><FaTools/></span> 
            <Typography gutterBottom variant="h5" component="span" align="left">
                <span id="tool-title-id">
                    {item.id}
                </span>
                <span id="tool-title-name">
                    {item.name}
                </span>
            </Typography>
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <img src={logo} alt='Sacramento State' style={{width: '125px', height: '110px'}} />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                    <span>
                        {item.description}
                    </span>
                </div>
                <div className="row">
                        {co2data.co2}
                </div>
            </div>
            <div className="row">
                <Breakdown />
            </div>
        </div>
        </>
    );

}