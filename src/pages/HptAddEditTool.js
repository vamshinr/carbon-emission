import * as React from 'react';
import { Box } from '@mui/system';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { FaPlus, FaShip, FaShippingFast} from 'react-icons/fa';
import { GiBatteryPack} from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { TbBuildingFactory } from 'react-icons/tb';
import HptCon from '../connections/HptCon';
import BatteryCon from "../connections/BatteryCon";
import MotorCon from "../connections/MotorCon";
import SeaTransportCon from "../connections/SeaTransportCon";
import GroundTransportCon from '../connections/GroundTransportCon';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const toolTypeOptions = [];
const batteryOptions = [];
const motorOptions = [];
const seaRouteOptions = [];
const groundRouteOptions = [];

export default function HptAddEditTool(params){
    const rows = params.rows;
    console.log("rows",rows);
    
    const [toolType, setToolType] = useState();
    const [serialNumber, setSerialNumber] = useState();
    const [co2, setCO2] = useState();
    const [partsCost, setPartscost] = useState();
    const [motorId, setMotorId] = useState();
    const [batteryId, setBatteryId] = useState();
    const [seaTransportId, setSeaTransportId] = useState();
    const [groundTransportId, setGroundTransportId] = useState();
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

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const handleCloseNew = () => {
        params.exit(false)
    };

    const handleClickSubmit = () =>{
        var tooltype = Number(toolType);
        var serialNumAdmin = Number(serialNumber);
        var coo2 = String(co2);
        var partscost = String(partsCost);
        var motorid = Number(motorId);
        var batteryid = Number(batteryId);
        var seaid = Number(seaTransportId);
        var groundid = Number(groundTransportId);
        // console.log("co2 : "+coo2);
        // console.log("costMan : "+costManufactured);
        HptCon.hpt_create(tooltype,serialNumAdmin,coo2,partscost,motorid,
            batteryid,seaid,groundid).then(response =>{
            // setOpenNew(false);
            params.close(false);
            setAlertContent("Success! New HPT tool Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setSerialNumber();
            setToolType();
            setPartscost();
            setMotorId();
            setBatteryId();
            setSeaTransportId();
            setGroundTransportId();
            //setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New HPT tool Details");
            setAlertSeverity("error")
            setAlert(true);
        });

    };



    const get_battery_info = async()=>{
        const batteryData = await BatteryCon.battery_fetch();
        console.log("battery data :",batteryData);
        if (batteryOptions.length===0){
            for(var i = 0; i < batteryData.length; i++) {
                batteryOptions.push(batteryData[i].serialNumber);
            }
        }
    }  
    const get_motor_info = async()=>{
        const motorData = await MotorCon.motor_fetch();
        console.log("motor data :",motorData);

        if (motorOptions.length===0){
            for(var i = 0; i < motorData.length; i++) {
                motorOptions.push(motorData[i].serialNumber);
            }
        }
    }  
    const get_sea_info = async()=>{
        const seaData = await SeaTransportCon.sea_fetch();
        console.log("sea data :",seaData);

        if (seaRouteOptions.length === 0){
            for(var i = 0; i < seaData.length; i++) {
                seaRouteOptions.push(seaData[i].routeId);
            }
        }
    }  

    const get_ground_info = async()=>{
        const groundData = await GroundTransportCon.ground_fetch();
        console.log("ground data :",groundData);

        if (groundRouteOptions.length === 0){
            for(var i = 0; i < groundData.length; i++) {
                groundRouteOptions.push(groundData[i].routeId);
            }
        }
    }
    
    useEffect(()=>{
        get_battery_info();
        get_motor_info();
        get_sea_info();
        get_ground_info();
    },[]);

    
    return(
        <>
        {alert ? 
            <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose} anchorOrigin={{vertical,horizontal}}>
              <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertContent}
              </Alert>
            </Snackbar>      
        : <></>}
        <Dialog open={params.open} onClose={handleCloseNew} sx={{"& .MuiDialog-container": {"& .MuiPaper-root": {maxWidth: "100%",},},}}>
            <DialogTitle><span style={{paddingRight:'10px'}}><FaPlus/></span>New Tool</DialogTitle>
            <DialogContent>
            <DialogContentText>
                    Add New tool details here.
            </DialogContentText>
            
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                
                <div>
                    <Paper sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',listStyle: 'none',p: 0.5, m: 0,}} component="ul">
                        <ListItem key="totalCo2">
                            <Chip
                            icon={<TbBuildingFactory style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={"150"}
                            onDelete={undefined}
                            />
                        </ListItem>
                        <ListItem key="battery">
                            <Chip
                            icon={<GiBatteryPack style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={"15"}
                            onDelete={undefined}
                            />
                        </ListItem>
                        <ListItem key="motor">
                            <Chip
                            icon={<FiSettings style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={"25"}
                            onDelete={undefined}
                            />
                        </ListItem>
                        <ListItem key="searoute">
                            <Chip
                            icon={<FaShip style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={"20"}
                            onDelete={undefined}
                            />
                        </ListItem>
                        <ListItem key="groundroute">
                            <Chip
                            icon={<FaShippingFast style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={"30"}
                            onDelete={undefined}
                            />
                        </ListItem>
                        
                    </Paper>
                </div>
                <div>
                    <TextField required error={serialNumber !== null && serialNumber !== '' ? false : true} id="serialNumber" variant='outlined' label="HPT Serial Number" defaultValue="" value={serialNumber} onChange={e => setSerialNumber(e.target.value)}/>
                </div>
                <div>
                    <Autocomplete disablePortal id="toolTypeID" options={toolTypeOptions} renderInput={(params) => <TextField {...params} label="Tool Type" />} value={toolType} onChange={e => setToolType(e.target.value)}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="batteryID" options={batteryOptions} renderInput={(params) => <TextField {...params} label="Battery ID" />} value={batteryId} onChange={e => setBatteryId(e.target.value)}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="motorID" options={motorOptions} renderInput={(params) => <TextField {...params} label="Motor ID" />} value={motorId} onChange={e => setMotorId(e.target.value)}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="seaRouteID" options={seaRouteOptions} renderInput={(params) => <TextField {...params} label="Sea Route" />} value={seaTransportId} onChange={e => setSeaTransportId(e.target.value)}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="groundRouteID" options={groundRouteOptions} renderInput={(params) => <TextField {...params} label="Ground Transport Route" />} value={groundTransportId} onChange={e => setGroundTransportId(e.target.value)}/>                       
                </div>
            </Box>
            
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                <Button onClick={handleClickSubmit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}