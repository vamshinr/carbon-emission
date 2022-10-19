import React from "react";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Dashboard.css';
import ToolView from "./ToolView";
import cloud from './logos/cloud_co2.png'
import HptCon from "../connections/HptCon";
import NavbarApp from "../pages/NavbarApp";
import FooterApp from "./FooterApp";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function Dashboard(){

    //Setting data
    const [buffHPT, setbuffHPT] = useState('');
    const [HPT, setHPT] = useState('');
    const [showResults,setShowResults] = useState(false);
    const [hptco2,setHPTco2] = useState(0);
    const [seaTransportationco2,setseaTransportationco2] = useState(0);
    const [groundTransportationco2,setgroundTransportationco2] = useState(0);
    const [motorSupplierco2,setmotorSupplierco2] = useState(0);
    const [batterySupplierco2, setbatterySupplierco2] = useState(0);

    const get_co2_info = async(params)=>{
        const hptTotal = await HptCon.hpt_fetch_by_number(params.hpt)
        if (hptTotal.length === 0){
            setHPTco2("not available");
            setShowResults(false);
            setAlertContent("Failure! Couldn't Find Tool for HPT ID");
            setAlertSeverity("error")
            setAlert(true);
        }
        else{
            const totalHPTCo2 = hptTotal[0].co2;
            setHPTco2(totalHPTCo2);
            console.log("total HPT co2"+totalHPTCo2);

            const seatransport =  await HptCon.hpt_fetch_by_number(params.hpt, 'seatransport');
            if (seatransport.length === 0){
                setseaTransportationco2(0);
            }
            else {
                const totalseaco2 = seatransport[0].co2;
                setseaTransportationco2(totalseaco2);
                console.log("total sea co2"+totalseaco2);
            }

            const motor = await HptCon.hpt_fetch_by_number(params.hpt, 'motor')
            if (motor.length === 0){
                setmotorSupplierco2(0);
            }
            else {
                const totalMotorCo2 = motor[0].co2;
                setmotorSupplierco2(totalMotorCo2);
                console.log("total motor co2"+totalMotorCo2);
            }

            const battery = await HptCon.hpt_fetch_by_number(params.hpt, 'battery')
            if (battery.length === 0){
                setbatterySupplierco2(0);
            }
            else {
                const totalBatteryCo2 = battery[0].co2
                console.log("total battery co2"+totalBatteryCo2);
                setbatterySupplierco2(totalBatteryCo2);
            }


            const groundtransport = await HptCon.hpt_fetch_by_number(params.hpt, 'groundtransport')
            if (groundtransport.length === 0){
                setgroundTransportationco2(0);
            }
            else{
                const totalgroundco2 = groundtransport[0].co2;
                setgroundTransportationco2(totalgroundco2);
                console.log("total ground co2"+totalgroundco2);
            }

        }
    }


    const handleSubmit = (e)=>{
        console.log("handle submit");
        setHPT(buffHPT);
        console.log("buff"+buffHPT);
        get_co2_info({hpt : buffHPT});  
        setShowResults(true);     
    }

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertContent("");
        setAlertSeverity("");
        setAlert(false);
    };

    const vertical = 'top';
    const horizontal = 'center';

    return(
        <>
            <NavbarApp></NavbarApp>
            {alert ? 
            <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose} anchorOrigin={{vertical,horizontal}}>
              <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertContent}
              </Alert>
            </Snackbar>      
            : <></>}
            <div className="row hpt-body" style={{backgroundColor:'#d8d2b8', paddingTop: '20px', paddingLeft: '20px'}}>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <Card sx={{ maxWidth: '100%', height:'75%'}}>
                        <CardMedia component="img" alt="green iguana" height="255" image="https://img.freepik.com/free-vector/global-co2-emi…rbon-dioxide-air-pollution_335657-3395.jpg?w=2000"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                            HP Tool Finder
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                Search for tools with HPT ID
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Stack spacing={2} sx={{ width: 300,  paddingBottom:'40px' }}>
                            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '210px', backgroundColor:'#fff' }, paddingLeft:'15px', '& .MuiButton-root':{width:'80px',backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                                <span><TextField id="hpt-sno-search-text" label="HPT ID" variant="outlined"  style={{marginRight:'0px'}} onChange = {(e) => {setbuffHPT(e.target.value);}} name="hpt-id" /></span>
                                <span><Button variant="outlined" onClick={handleSubmit} style={{marginTop:'8px', border:'1px solid', height:'56px', width:'66px', borderRadius:'0px 6px 6px 0px', backgroundColor:'#a17f0f', color:'#fff'}}><FaSearch /></Button></span>
                             </Box>   
                            </Stack>
                        </CardActions>
                    </Card>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12" style={{paddingRight:'30px'}}>
                    <Card sx={{ maxWidth: '100%', minHeight:'75%' }}>
                        <CardContent>
                            {showResults? <ToolView hpt = {HPT} seaTransportationco2 = {seaTransportationco2} 
                            groundTransportationco2 = {groundTransportationco2} motorSupplierco2 = {motorSupplierco2}
                             batterySupplierco2 = {batterySupplierco2} hptco2 = {hptco2}/> :<DashboardTemplate />} 
                        </CardContent>
                    </Card>
                </div>
            </div>
            <FooterApp></FooterApp>
        </>
    );
}

const DashboardTemplate = (params) =>{
    return(
    <>
    <div style={{textAlign:'center'}}>
        <img src={cloud} alt=""  style={{width:'300px', height:'300px'}} />
    </div>
    <div style={{textAlign:'center'}}>
        <Typography gutterBottom variant="h5" component="div" align="center">
            Carbon Emission Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
            By Team 4 - Deep Divers
        </Typography>
    </div>    
    <div style={{textAlign:'justify', paddingTop:'20px'}}>
        <Typography gutterBottom variant="body1" >
            Carbon Emission Dashboard is designed to track carbon emissions for Hornet Power Tools(HPT). This tracker Dashboard will keep track of the total CO<sub>2</sub> emissions as well as present a breakdown of individual emissions based on contributor types. Search for an HPT item using its Serial Number to display the total CO<sub>2</sub> emissions and their breakdown. 
        </Typography>
    </div>
    </> 
    
    );
}