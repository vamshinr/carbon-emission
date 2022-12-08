import * as React from 'react';
import { Box } from '@mui/system';
import { FaPlus, FaShippingFast} from 'react-icons/fa';
import './Page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomPaginationActionsTable from './Table';
import NavbarApp from "./NavbarApp";
import FooterApp from './FooterApp';
import { useState } from 'react';
import GroundTransportCon from "../connections/GroundTransportCon";
import Alert from '@mui/material/Alert';    
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';
import loader from './logos/loader3.gif';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import {BsGraphUp} from 'react-icons/bs';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { MdLocationOn, MdOutlineLocationOn, MdLocalShipping} from "react-icons/md";
import { TbArrowBigRightLines } from "react-icons/tb";
import RouteInfo from '../connections/RouteInfo';
import Autocomplete from '@mui/material/Autocomplete';

import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );


function createData(co2,fuelCo,rouID,trackNum,labCo,transportID,custCo,id) {
    return { co2,fuelCo,rouID,trackNum,labCo,transportID,custCo,id };
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.8),
}));

const rows = [];
var data1 = [];
var data2 = [];
var data4 = [];
var data5 = {};
var data6 = {};
var data7 = {};
const groundRoutesOptions = [];

export default function GroundTransportComponent(){  
    const [openNew, setOpenNew] = React.useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openDirty, setOpenDirty] = React.useState(false);
    const [dirty,setDirty] = useState(false);
    const [co2, setCO2] = useState();
    const [fuelCost, setFuelCost] = useState();
    const [routeID, setRouteID] = useState();
    const [trackNumber, setTrackNumber] = useState();   
    const [laborCost, setLaborCost] = useState();
    const [truckID, setTruckID] = useState();
    const [custCost, setCustCost] = useState();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [displayRows, setDisplayRows] = useState(false);
    const [routedetails, setRouteDetails] = useState(false);
    const [source, setSource] = useState();
    const [destination,setDestination] = useState();

    const get_ground_info = async()=>{
        setDisplayRows(false);
        const groundData = await GroundTransportCon.ground_fetch();
        console.log("ground data :",groundData);

        if (rows.length === 0){
        for(var i = 0; i < groundData.length; i++) {
            data1.push(groundData[i].routeId)
            data2.push(groundData[i].co2)
            data4.push(groundData[i].laborCost+groundData[i].fuelCost)
            rows.push(createData(groundData[i].co2,groundData[i].fuelCost,
                groundData[i].routeId,groundData[i].trackingNumber,groundData[i].laborCost,
                groundData[i].truckId,groundData[i].customerCost, groundData[i]._id));
        }
        for(i = 0; i<groundData.length; i++){
            if (data6[data1[i]] === undefined){
                data6[data1[i]] = data2[i];
                data7[data1[i]] = data4[i];
                data5[data1[i]] = 1;
            }
            else{
                data6[data1[i]] = data6[data1[i]] + data2[i];
                data7[data1[i]] = data7[data1[i]] + data4[i];
                data5[data1[i]] = data5[data1[i]] + 1;
            }
        }
        data1 = Object.keys(data6);
        for (i = 0; i<data1.length; i++){
            data6[data1[i]] = data6[data1[i]]/data5[data1[i]];
            data7[data1[i]] = data7[data1[i]]/data5[data1[i]];
        }
        data2 = Object.values(data6);
        data4 = Object.values(data7);
    }
        rows.sort((a, b) => (a.fuelCost < b.fuelCost ? -1 : 1));
        setTimeout(() => setDisplayRows(true), 1500);
        //setDisplayRows(true);
    }
    
    const get_ground_routes = async()=>{
        const routeData = await RouteInfo.route_fetch();
        console.log("ground routes :",routeData);
        if (groundRoutesOptions.length === 0){
            for(var i = 0; i < routeData.length; i++) {
                if (routeData[i].routeType == "ground"){
                    groundRoutesOptions.push(routeData[i].routeId+" - "+routeData[i].startPoint+" - "+routeData[i].endPoint);
                }
            }
        }
        console.log("ground routes:", groundRoutesOptions);
    }
    
    useEffect(()=>{
        console.log("entering useeffect");
        get_ground_routes();
        get_ground_info();
    },[]);

    const handleHistoryOpen = () =>{
        setOpenHistory(true);
    };
    const handleHistoryClose = () => {
        setOpenHistory(false)
    };
    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setDestination();
        setSource();
        setRouteDetails(false);
        if(dirty){
            setOpenDirty(true);
        }
        else{
            setOpenNew(false);
            setCO2();
            setFuelCost();
            setRouteID();
            setTrackNumber();
            setLaborCost();
            setTruckID();
            setCustCost();
        }
        
    };


    const handleClickSubmit = () =>{
        setRouteDetails(false);
        console.log("entering handle click");
        var coo2 = Number(co2);
        var fuelCo = Number(fuelCost);
        var rouID = String(routeID);
        var trackNum = String(trackNumber);
        var labCo = Number(laborCost);
        var tID = String(truckID);
        var custCo = Number(custCost);
        console.log("co2 : "+coo2);
        console.log("costMan : "+fuelCost);
        GroundTransportCon.ground_create(coo2,fuelCo,rouID,trackNum,labCo,tID,custCo).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Ground Transport Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setFuelCost();
            setRouteID();
            setTrackNumber();
            setLaborCost();
            setTruckID();
            setCustCost();
            setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Ground Transport Details");
            setAlertSeverity("error")
            setAlert(true);
        });
        

    };

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

    const handleCloseDirty = (x) =>{
        if(x===0){
            setOpenDirty(false);
        }
        else{
            setOpenDirty(false);
            setDirty(false);
            handleCloseNew();
        }
    }

    const data3 = {
        labels: data1,
        datasets: [
            {
              type: 'bar',
              label: 'Ground Transport Co2',
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
              data: data2,
            },
            {
              type: 'bar',
              label: 'Ground Transport Labor + Fuel Cost',
              backgroundColor: 'rgb(255, 99, 132)',
              data: data4,
              borderColor: 'red',
              borderWidth: 2,
              fill: false,
            },
          ],
    };

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
        <div className="hpt-body" style={{ backgroundColor:'#d8d2b8', padding:'20px'}}>
            <div className='row' style={{paddingBottom:'20px'}}>
            <div className='col-lg-10 col-md-10 col-sm-8 col-xs-6'>
                <Typography gutterBottom variant="h5" component="div" align="left">
                <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><FaShippingFast /></span> Hornet Ground Transporters
                </Typography>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
            <Button  onClick={handleHistoryOpen} title="Ground Transport History" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38',marginTop:'10px', marginRight:'10px' }}><span style={{paddingLeft:'1px'}}><BsGraphUp /></span></Button>
                <Button onClick={handleClickOpenNew} title="Add New Ground Route Details" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px'}}><FaPlus /><span style={{paddingLeft:'10px'}}>New Route</span></Button>
                <Dialog open={openNew} onClose={handleCloseNew}>
                    <DialogTitle><span style={{paddingRight:'10px'}}><FaPlus/></span>New Ground Route Details</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                         Add New Ground Route details here.
                    </DialogContentText>

                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                    {routedetails?<Paper sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',listStyle: 'none',p: 0.5, m: 0,}} component="ul">

                            <ListItem key="source">
                            {routeID.split(' - ')[1]}
                            </ListItem>
                            <ListItem key="totalCo2">
                                <MdOutlineLocationOn style={{color:'#004e38', fontSize:'25px'}}/>
                            </ListItem>
                            <ListItem key="battery">
                                <TbArrowBigRightLines style={{color:'#004e38', fontSize:'25px'}}/>
                            </ListItem>
                            <ListItem key="battery">
                                <MdLocalShipping style={{color:'#004e38', fontSize:'25px'}}/>
                            </ListItem>
                            <ListItem key="battery">
                                <TbArrowBigRightLines style={{color:'#004e38', fontSize:'25px'}}/>
                            </ListItem>
                            <ListItem key="totalCo2">
                                <MdLocationOn style={{color:'#004e38', fontSize:'25px'}}/>
                            </ListItem>
                            <ListItem key="destination">
                            {routeID.split(' - ')[2]}
                            </ListItem>
                        
                        </Paper>:<></>}
                        <div>
                            <TextField required error={trackNumber !== null && trackNumber !== '' ? false : true} id="trackNumber" variant='filled' label="Tracking Number" defaultValue="" value={trackNumber} onChange={e => {setTrackNumber(e.target.value); setDirty(true);}}/>
                        </div>
                        {/* <div>
                            <TextField required error={routeID !== null && routeID !== '' ? false : true} id="routeID" label="Route ID" variant='filled' defaultValue="" value={routeID} onChange={e => {setRouteID(e.target.value); setDirty(true); setRouteDetails(true);}}/>
                        </div> */}
                        <div>
                        <Autocomplete disablePortal id="routeID" options={groundRoutesOptions} renderInput={(params) => <TextField {...params} label="route info" />} value={routeID} onChange={e => {setRouteID(e.target.innerText); setDirty(true); setRouteDetails(true);}}/> 
                        </div>
                        <div>
                            <TextField required error={truckID !== null && truckID !== '' ? false : true} id="truckId" variant='filled' label="Truck ID" defaultValue="" value={truckID} onChange={e => {setTruckID(e.target.value); setDirty(true);}}/>
                        </div>
                        <div>
                            <TextField required error={co2 !== null && co2 !== '' ? false : true} id="co2" variant='filled' label="co2" type="number" defaultValue="" value={co2} onChange={e =>{setCO2(e.target.value); setDirty(true);}}/>
                        </div>
                        <div>
                            <TextField required error={fuelCost !== null && fuelCost !== '' ? false : true} id="fuelCost" variant='filled' label="Fuel Cost" type="number" defaultValue="" value={fuelCost} onChange={e => {setFuelCost(e.target.value); setDirty(true);}}/>
                        </div>
                        <div>
                            <TextField required error={laborCost !== null && laborCost !== '' ? false : true} id="laborCost" variant='filled' label="Labor Cost" type="number" defaultValue="" value={laborCost} onChange={e => {setLaborCost(e.target.value); setDirty(true);}}/>
                        </div>
                        
                        <div>
                            <TextField required error={custCost !== null && custCost !== '' ? false : true} id="custCost" variant='filled' label="Customer Cost" type="number" defaultValue="" value={custCost} onChange={e => {setCustCost(e.target.value); setDirty(true);}}/>
                        </div>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                        <Button onClick={handleClickSubmit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openHistory} fullWidth = {true} onClose={handleHistoryClose}>
                    <DialogTitle><span style={{paddingRight:'10px'}}></span> Ground Transport History</DialogTitle>
                    <div>
                    <Box>   
                    <Chart type='bar' data={data3} />
                    </Box>
                    </div>
                </Dialog>
            </div>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb" style={{paddingLeft:'15px'}}>
                    <a
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="#004e38"
                    href="/dashboard"
                    >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Dashboard
                    </a>
                    <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                    >
                    <FaShippingFast sx={{ mr: 1 }} fontSize="inherit" style={{marginRight: '5px'}} />
                    {" Ground Transport Details"}
                    </Typography>
                </Breadcrumbs>
            </div>
            </div>

            <Dialog open={openDirty} onClose={()=>handleCloseDirty(0)} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"Confirm"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    There are unsaved data. Do you wish to proceed?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleCloseDirty(0)} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>No</Button>
                <Button onClick={()=>handleCloseDirty(1)} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Yes</Button>
                </DialogActions>
            </Dialog>
            
            {!displayRows? 
                <div style={{textAlign:'center'}}>
                    
                    <img src={loader} alt="" style={{width:'60%', height:'50%'}}/>
                </div>:<></>}
            {displayRows?<CustomPaginationActionsTable rows={rows} type='Ground Transport'></CustomPaginationActionsTable>:<></>}
        </div>
        <FooterApp></FooterApp>
        </>
    );
}
