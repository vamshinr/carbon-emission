import * as React from 'react';
import { Box } from '@mui/system';
import { FaTools, FaPlus} from 'react-icons/fa';
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
import Autocomplete from '@mui/material/Autocomplete';
import CustomPaginationActionsTable from './Table';
import NavbarApp from "../pages/NavbarApp";
import FooterApp from './FooterApp';
import HptCon from '../connections/HptCon';
import { useState } from 'react';
import SeaTransportCon from '../connections/SeaTransportCon';
import GroundTransportCon from '../connections/GroundTransportCon';

function createData(tooltype,serialNumAdmin,co2,partscost,motorid,
    batteryid,seaid,groundid) {
    return { tooltype,serialNumAdmin,co2,partscost,motorid,
        batteryid,seaid,groundid };
}

const rows = [];

export default function AdminComponent(){

    const [openNew, setOpenNew] = React.useState(false);
    const [displayRows, setDisplayRows]= React.useState(false);

    const [toolType, settoolType] = useState();
    const [SerialNumber, setSerialNumber] = useState();
    const [co2, setCO2] = useState();
    const [partsCost, setPartscost] = useState();
    const [motorId, setMotorid] = useState();
    const [BatteryId, setBatteryid] = useState();
    const [seaTransportId, setSeaid] = useState();
    const [groundTransportId, setGroundid] = useState();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    
    const get_hpt_info = async()=>{
        //setDisplayRows(false);
        const hptData = await HptCon.hpt_fetch();
        console.log("motor data :",hptData);

        if (rows.length===0){
        for(var i = 0; i < hptData.length; i++) {
            rows.push(createData(hptData[i].toolType,hptData[i].SerialNumber,
                hptData[i].co2,hptData[i].partsCost,hptData[i].motorId,hptData[i].BatteryId,
                hptData[i].seaTransportId,hptData[i].groundTransportId));
        }
    }
        rows.sort((a, b) => (a.SerialNumber > b.SerialNumber ? -1 : 1));
        setDisplayRows(true);
    }    
    
    get_hpt_info();
    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };

    const handleClickSubmit = () =>{
        var tooltype = Number(toolType);
        var serialNumAdmin = Number(SerialNumber);
        var coo2 = String(co2);
        var partscost = String(partsCost);
        var motorid = Number(motorId);
        var batteryid = Number(BatteryId);
        var seaid = Number(seaTransportId);
        var groundid = Number(groundTransportId);
        // console.log("co2 : "+coo2);
        // console.log("costMan : "+costManufactured);
        HptCon.hpt_fetch(tooltype,serialNumAdmin,coo2,partscost,motorid,
            batteryid,seaid,groundid).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New HPT tool Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setSerialNumber();
            settoolType();
            setPartscost();
            setMotorid();
            setBatteryid();
            setSeaid();
            setGroundid();
            //setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New HPT tool Details");
            setAlertSeverity("error")
            setAlert(true);
        });

    };

    return(
        <>
        <NavbarApp></NavbarApp>
        <div className="hpt-body" style={{ backgroundColor:'#d8d2b8', padding:'20px'}}>
            <div className='row' style={{paddingBottom:'20px'}}>
                <div className='col-lg-10 col-md-10 col-sm-8 col-xs-6'>
                    <Typography gutterBottom variant="h5" component="div" align="left">
                    <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><FaTools/></span> Hornet Power Tools Admin
                    </Typography>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
                <Button onClick={handleClickOpenNew} title="Add New HPT Details" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px'}}><FaPlus /><span style={{paddingLeft:'10px'}}>New Tool</span></Button>
                <Dialog open={openNew} onClose={handleCloseNew}>
                    <DialogTitle><span style={{paddingRight:'10px'}}><FaPlus/></span>New Tool</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                         Add New tool details here.
                    </DialogContentText>

                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div>
                            <Autocomplete disablePortal id="hptID" options={top100Films} renderInput={(params) => <TextField {...params} label="HPT ID" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="batteryID" options={top100Films} renderInput={(params) => <TextField {...params} label="Battery ID" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="motorID" options={top100Films} renderInput={(params) => <TextField {...params} label="Motor ID" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="seaRouteID" options={top100Films} renderInput={(params) => <TextField {...params} label="Sea Route" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="groundRouteID" options={top100Films} renderInput={(params) => <TextField {...params} label="Ground Transport Route" />}/>                       
                        </div>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                        <Button onClick={handleClickSubmit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
                </div>
            </div>
            {displayRows?<CustomPaginationActionsTable rows={rows} type="HPT"></CustomPaginationActionsTable>:<></>}
        </div>
        <FooterApp></FooterApp>
        </>
    );
}

const top100Films = [];