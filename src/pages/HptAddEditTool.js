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
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

const toolTypeOptions = ["Drill","Tool1"];
const batteryOptions = [];
const motorOptions = [];
const seaRouteOptions = [];
const groundRouteOptions = [];
var isupdate = false;

export default function HptAddEditTool(params){
    var rows = params.row;
    if (rows==null){
        rows = {
            toolType:"",
            serialNumAdmin:"",
            co2:"",
            partscost:"",
            motorid:"",
            batteryid:"",
            seaid:"",
            groundid:""
        }
    }
    else{
        isupdate = true;
    }
    console.log(rows==null);
    console.log("rows",rows);
    // const [toolType, setToolType] = useState();
    // const [serialNumber, setSerialNumber] = useState();
    // const [co2, setCO2] = useState();
    // const [partsCost, setPartscost] = useState();
    // const [motorId, setMotorId] = useState();
    // const [batteryId, setBatteryId] = useState();
    // const [seaTransportId, setSeaTransportId] = useState();
    // const [groundTransportId, setGroundTransportId] = useState();
    
    // if(rows!=null){
    //     setToolType(rows.tooltype);
    //     setSerialNumber(rows.serialNumAdmin);
    //     setCO2(rows.co2);
    //     setPartscost(rows.partscost);
    //     setMotorId(rows.motorid);
    //     setBatteryId(rows.batteryid);
    //     setSeaTransportId(rows.seaid);
    //     setGroundTransportId(rows.groundid);
    // }
    const [toolType, setToolType] = useState(rows.tooltype);
    const [serialNumber, setSerialNumber] = useState(rows.serialNumAdmin);
    const [co2, setCO2] = useState(rows.co2);
    const [partsCost, setPartscost] = useState(rows.partscost);
    const [motorId, setMotorId] = useState(rows.motorid);
    const [batteryId, setBatteryId] = useState(rows.batteryid);
    const [seaTransportId, setSeaTransportId] = useState(rows.seaid);
    const [groundTransportId, setGroundTransportId] = useState(rows.groundid);


    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [batteryco2, setBatteryCo2] = useState(0);
    const [motorco2, setMotorCo2] = useState(0);
    const [seaco2, setSeaCo2] = useState(0);
    const [groundco2, setGroundCo2] = useState(0);
    const [batteryDisplay, setBatteryDisplay] = useState(false);
    const [motorDisplay, setMotorDisplay] = useState(false);
    const [seaDisplay, setSeaDisplay] = useState(false);
    const [groundDisplay, setGroundDisplay] = useState(false);
    const [hptDisplay, setHptDisplay] = useState(false);
    const [calco2, setCalCo2] = useState(0);
    
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
        var toolType = "Drill";
        var serialNumAdmin = (serialNumber);
        var coo2 = Number(calco2);
        var partscost = Number(partsCost);
        var motorid = (motorId);
        var batteryid = (batteryId);
        var seaid = (seaTransportId);
        var groundid = (groundTransportId);
        console.log("co2 : "+coo2);
        // console.log("costMan : "+costManufactured);
        if (isupdate==true){
            var data = {
                _id: rows.id,
                toolType: toolType,
                SerialNumber: serialNumAdmin,
                co2:coo2,
                partsCost:partscost,
                motorId:motorid,
                BatteryId:batteryid,
                seaTransportId:seaid,
                groundTransportId:groundid
            };
            HptCon.hpt_update(data).then(response =>{
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
        }
        else{
            HptCon.hpt_create(toolType,serialNumAdmin,coo2,partscost,motorid,
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
        }

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
                seaRouteOptions.push(seaData[i].trackingNumber);
            }
        }
    }  

    const get_ground_info = async()=>{
        const groundData = await GroundTransportCon.ground_fetch();
        console.log("ground data :",groundData);

        if (groundRouteOptions.length === 0){
            for(var i = 0; i < groundData.length; i++) {
                groundRouteOptions.push(groundData[i].trackingNumber);
            }
        }
    }
    
    const get_battery_co2 = async(params)=>{
        const batteryData = await BatteryCon.battery_fetch();
        console.log("battery data useeffect:",batteryData);
        for(var i = 0; i < batteryData.length; i++) {
            if (batteryData[i].serialNumber == params.bat){
                setBatteryCo2(batteryData[i].co2);
                //calco2 += batteryData[i].co2;
                setCalCo2(calco2+batteryData[i].co2);
                break
            }
        }
    }
    const get_motor_co2 = async(params)=>{
        const motorData = await MotorCon.motor_fetch();
        console.log("motor data useeffect:",motorData);
        for(var i = 0; i < motorData.length; i++) {
            if (motorData[i].serialNumber == params.bat){
                setMotorCo2(motorData[i].co2);
                //calco2 += motorData[i].co2;
                setCalCo2(calco2+motorData[i].co2);
                break
            }
        }
    }
    const get_sea_co2 = async(params)=>{
        const seaData = await SeaTransportCon.sea_fetch();
        console.log("sea data useeffect:",seaData);
        for(var i = 0; i < seaData.length; i++) {
            if (seaData[i].trackingNumber == params.bat){
                setSeaCo2(seaData[i].co2);
                //calco2 += seaData[i].co2;
                setCalCo2(calco2+seaData[i].co2);
                break
            }
        }
    }
    const get_ground_co2 = async(params)=>{
        const groundData = await GroundTransportCon.ground_fetch();
        console.log("ground data useeffect:",groundData);
        for(var i = 0; i < groundData.length; i++) {
            if (groundData[i].trackingNumber == params.bat){
                setGroundCo2(groundData[i].co2);
                //calco2 += groundData[i].co2;
                setCalCo2(calco2+groundData[i].co2);
                break
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
                        {/* <ListItem key="totalCostco2"> 
                        {hptDisplay?
                            <p>TOTAL CO2</p>
                            :<></>}
                        </ListItem> */}
                        
                        <ListItem key="battery">
                        {batteryDisplay? 
                            <Chip
                            icon={<GiBatteryPack style={{color:'#004e38', fontSize:'15px'}}></GiBatteryPack>}
                            label={batteryco2}
                            onDelete={undefined}
                            />:<></>}
                        </ListItem>
                        {motorDisplay?  <span style={{padding:'5px'}}>+</span>:<></>}
                        <ListItem key="motor">
                            {motorDisplay?
                            <Chip
                            icon={<FiSettings style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={motorco2}
                            onDelete={undefined}
                            />:<></>}
                        </ListItem>
                        {seaDisplay?  <span style={{padding:'5px'}}>+</span>:<></>}
                        <ListItem key="searoute">
                            {seaDisplay?
                            <Chip
                            icon={<FaShip style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={seaco2}
                            onDelete={undefined}
                            />:<></>}
                        </ListItem>
                        {groundDisplay?  <span style={{padding:'5px'}}>+</span>:<></>}
                        <ListItem key="groundroute">
                            {groundDisplay?
                            <Chip
                            icon={<FaShippingFast style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={groundco2}
                            onDelete={undefined}
                            />:<></>}
                        </ListItem>
                        {hptDisplay?  <span style={{padding:'5px'}}>=</span>:<></>}
                        <ListItem key="totalCo2"> 
                            {hptDisplay?
                            <Chip
                            icon={<TbBuildingFactory style={{color:'#004e38', fontSize:'15px'}}/>}
                            label={calco2}
                            onDelete={undefined}
                            />:<></>}
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
                    <Autocomplete disablePortal id="batteryID" options={batteryOptions} renderInput={(params) => <TextField {...params} label="Battery ID" />} value={batteryId} onChange={e => {setBatteryId(e.target.innerText); get_battery_co2({bat : e.target.innerText}); setBatteryDisplay(true); setHptDisplay(true); }}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="motorID" options={motorOptions} renderInput={(params) => <TextField {...params} label="Motor ID" />} value={motorId} onChange={e => {setMotorId(e.target.innerText); get_motor_co2({bat : e.target.innerText}); setMotorDisplay(true); setHptDisplay(true);}}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="seaRouteID" options={seaRouteOptions} renderInput={(params) => <TextField {...params} label="Sea Route" />} value={seaTransportId} onChange={e => {setSeaTransportId(e.target.innerText); get_sea_co2({bat : e.target.innerText}); setSeaDisplay(true); setHptDisplay(true);}}/>                       
                </div>
                <div>
                    <Autocomplete disablePortal id="groundRouteID" options={groundRouteOptions} renderInput={(params) => <TextField {...params} label="Ground Transport Route" />} value={groundTransportId} onChange={e => {setGroundTransportId(e.target.innerText); get_ground_co2({bat : e.target.innerText}); setGroundDisplay(true); setHptDisplay(true);}}/>                       
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