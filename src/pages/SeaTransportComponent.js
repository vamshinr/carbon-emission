import * as React from 'react';
import { Box } from '@mui/system';
import { FaPlus} from 'react-icons/fa';
import {GiCargoShip} from 'react-icons/gi';
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
import NavbarApp from "../pages/NavbarApp";
import FooterApp from './FooterApp';
import { useState } from 'react';
import SeaTransportCon from "../connections/SeaTransportCon";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';  

function createData(co2,fuelCo,rouID,trackNum,labCo,transportID,custCo) {
    return { co2,fuelCo,rouID,trackNum,labCo,transportID,custCo };
}

const rows = [];

export default function SeaTransportComponent(){  
    const [openNew, setOpenNew] = React.useState(false);
    //const [openDirty, setOpenDirty] = React.useState(false);
    //const [dirty,setDirty] = useState(false);
    const [co2, setCO2] = useState();
    const [fuelCost, setFuelCost] = useState();
    const [routeID, setRouteID] = useState();
    const [trackNumber, setTrackNumber] = useState();
    const [laborCost, setLaborCost] = useState();
    const [shipID, setShipID] = useState();
    const [custCost, setCustCost] = useState(); 
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [displayRows, setDisplayRows] = useState(false);

    const get_sea_info = async()=>{
        setDisplayRows(false);
        const seaData = await SeaTransportCon.sea_fetch();
        console.log("sea data :",seaData);

        if (rows.length === 0){
        for(var i = 0; i < seaData.length; i++) {
            rows.push(createData(seaData[i].co2,seaData[i].fuelCost,
                seaData[i].routeId,seaData[i].trackingNumber,seaData[i].laborCost,
                seaData[i].shipId,seaData[i].customerCost));
        }
    }
        rows.sort((a, b) => (a.shipID < b.shipID ? -1 : 1));
        setDisplayRows(true);
    }    
    
    useEffect(()=>{
        get_sea_info();
    },[]);

    console.log("display rows",displayRows);
    console.log("rows",rows);

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        // if(dirty){
        //     setOpenDirty(true);
        // }
        // else{
            setOpenNew(false);
            setCO2();
            setFuelCost();
            setRouteID();
            setTrackNumber();
            setLaborCost();
            setShipID();
            setCustCost();
        // }
        
    };


    const handleClickSubmit = () =>{
        var coo2 = Number(co2);
        var fuelCo = Number(fuelCost);
        var rouID = String(routeID);
        var trackNum = String(trackNumber);
        var labCo = Number(laborCost);
        var sID = String(shipID);
        var custCo = Number(custCost);
        console.log("co2 : "+coo2);
        console.log("costMan : "+fuelCost);
        SeaTransportCon.sea_create(coo2,fuelCo,rouID,trackNum,labCo,sID,custCo).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Sea Transport Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setFuelCost();
            setRouteID();
            setTrackNumber();
            setLaborCost();
            setShipID();
            setCustCost();
            setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Sea Transport Details");
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

    // const handleCloseDirty = (x) =>{
    //     if(x===0){
    //         setOpenDirty(false);
    //     }
    //     else{
    //         setOpenDirty(false);
    //         setDirty(false);
    //         handleCloseNew();
    //     }
    // }

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
                <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><GiCargoShip /></span> Hornet Sea Transporters
                </Typography>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
                <Button onClick={handleClickOpenNew} title="Add New Sea Route Details" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px'}}><FaPlus /><span style={{paddingLeft:'10px'}}>New Route</span></Button>
                <Dialog open={openNew} onClose={handleCloseNew}>
                    <DialogTitle><span style={{paddingRight:'10px'}}><FaPlus/></span>New Sea Route Details</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                         Add New Sea Route details here.
                    </DialogContentText>

                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div>
                            <TextField required error={co2 !== null && co2 !== '' ? false : true} id="co2" variant='filled' label="co2" type="number" defaultValue="" value={co2} onChange={e =>{setCO2(e.target.value); /*setDirty(true);*/}  }/>
                        </div>
                        <div>
                            <TextField required error={fuelCost !== null && fuelCost !== '' ? false : true} id="fuelCost" variant='filled' label="Cost Fuel on Sea" type="number" defaultValue="" value={fuelCost} onChange={e => setFuelCost(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={routeID !== null && routeID !== '' ? false : true} id="routeID" label="Route ID" variant='filled' defaultValue="" value={routeID} onChange={e => setRouteID(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={trackNumber !== null && trackNumber !== '' ? false : true} id="trackNumber" variant='filled' label="Track Number" defaultValue="" value={trackNumber} onChange={e => setTrackNumber(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={laborCost !== null && laborCost !== '' ? false : true} id="laborCost" variant='filled' label="Labor Cost" type="number" defaultValue="" value={laborCost} onChange={e => setLaborCost(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={shipID !== null && shipID !== '' ? false : true} id="shipID" variant='filled' label="Ship ID" defaultValue="" value={shipID} onChange={e => setShipID(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={custCost !== null && custCost !== '' ? false : true} id="custCost" variant='filled' label="Customer Cost" type="number" defaultValue="" value={custCost} onChange={e => setCustCost(e.target.value)}/>
                        </div>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                        <Button onClick={handleClickSubmit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div></div>

            {/* <Dialog open={openDirty} onClose={handleCloseDirty(0)} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    There are unsaved data. Do you wish to proceed?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDirty(0)}>No</Button>
                <Button onClick={handleCloseDirty(1)}>Yes</Button>
                </DialogActions>
            </Dialog> */}
            <CustomPaginationActionsTable rows={rows} type='Sea Route'></CustomPaginationActionsTable>
        </div>
        <FooterApp></FooterApp>
        </>
    );
}