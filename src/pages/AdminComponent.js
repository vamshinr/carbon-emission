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
import BatteryCon from "../connections/BatteryCon";
import MotorCon from '../connections/MotorCon';

function createData(toolId,serialNumAdmin,co2,partscost,motorid,
    batteryid,seaid,groundid) {
    return { toolId,serialNumAdmin,co2,partscost,motorid,
        batteryid,seaid,groundid };
}


const rows = [];

export default function AdminComponent(){

    const [openNew, setOpenNew] = React.useState(false);
    const [displayRows, setDisplayRows]= React.useState(false);

    const [toolId, setToolId] = useState();
    const [SerialNumber, setSerialNumber] = useState();
    const [co2, setCO2] = useState();
    const [partsCost, setPartscost] = useState();
    const [bco2, setBCO2] = useState();
    const [bcostManufactured, setBCostManufactured] = useState();
    const [bdateManufactured, setBDateManufactured] = React.useState();
    const [bsalesPrice, setBSalesPrice] = useState();
    const [bpartNumber, setBPartNumber] = useState();
    const [mco2, setMCO2] = useState();
    const [mcostManufactured, setMCostManufactured] = useState();
    const [mdateManufactured, setMDateManufactured] = React.useState();
    const [msalesPrice, setMSalesPrice] = useState();
    const [mpartNumber, setMPartNumber] = useState();
    const [motorId, setMotorid] = useState();
    const [batteryId, setBatteryid] = useState();
    const [seaTransportId, setSeaid] = useState();
    const [groundTransportId, setGroundid] = useState();
    const [srouteID, setSRouteID] = useState();
    const [sco2, setSCO2] = useState();
    const [shipID, setShipID] = useState();
    const [sfuelCost, setSFuelCost] = useState();
    const [slaborCost, setSLaborCost] = useState();
    const [scustCost, setSCustCost] = useState();
    const [grouteID, setGRouteID] = useState();
    const [gco2, setGCO2] = useState();
    const [truckID, setTruckID] = useState();
    const [gfuelCost, setGFuelCost] = useState();
    const [glaborCost, setGLaborCost] = useState();
    const [gcustCost, setGCustCost] = useState();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    
    const get_hpt_info = async()=>{
        //setDisplayRows(false);
        const hptData = await HptCon.hpt_fetch();
        console.log("hpt data :",hptData);

        if (rows.length===0){
        for(var i = 0; i < hptData.length; i++) {
            rows.push(createData(hptData[i].toolId,hptData[i].SerialNumber,
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
        var tId = Number(toolId);
        var serialNumAdmin = Number(SerialNumber);
        var coo2 = String(co2);
        var partscost = String(partsCost);
        var bcoo2 = String(bco2);
        var bcostManu = Number(bcostManufactured);
        var bdateManu = String(bdateManufactured);
        var bpartNum = String(bpartNumber);
        var bsalesPr = Number(bsalesPrice);
        var mcoo2 = String(mco2);
        var mcostManu = Number(mcostManufactured);
        var mdateManu = String(mdateManufactured);
        var mpartNum = String(mpartNumber);
        var msalesPr = Number(msalesPrice);
        var motorid = Number(motorId);
        var batteryid = Number(batteryId);
        var seaid = Number(seaTransportId);
        var groundid = Number(groundTransportId);
        var scoo2 = String(sco2);
        var sfuelCo = Number(sfuelCost);
        var srouID = String(srouteID);
        var slabCo = Number(slaborCost);
        var scustCo = Number(scustCost);
        var sID = String(shipID);
        var gcoo2 = String(gco2);
        var gfuelCo = Number(gfuelCost);
        var grouID = String(grouteID);
        var glabCo = Number(glaborCost);
        var gcustCo = Number(gcustCost);
        var gID = String(truckID);
        // console.log("co2 : "+coo2);
        // console.log("costMan : "+costManufactured);
        HptCon.hpt_create(tId,serialNumAdmin,coo2,partscost,motorid,
            batteryid,seaid,groundid).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New HPT tool Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setSerialNumber();
            setToolId();
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

        BatteryCon.battery_create(bcoo2,bcostManu,bdateManu,bpartNum,bsalesPr,batteryid).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Battery Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setBCO2();
            setBCostManufactured();
            setBDateManufactured();
            setBPartNumber();
            setBSalesPrice();
            setBatteryid();
            //setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Battery Details");
            setAlertSeverity("error")
            setAlert(true);
        });

        MotorCon.motor_create(mcoo2,mcostManu,mdateManu,mpartNum,msalesPr,motorid).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Motor Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setMCO2();
            setMCostManufactured();
            setMDateManufactured();
            setMPartNumber();
            setMSalesPrice();
            setMotorid();
            //setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Motor Details");
            setAlertSeverity("error")
            setAlert(true);
        });

        GroundTransportCon.ground_create(gcoo2,gfuelCo,grouID,groundid,glabCo,gID,gcustCo).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Ground Transport Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setGCO2();
            setGFuelCost();
            setGRouteID();
            setGroundid();
            setGLaborCost();
            setTruckID();
            setGCustCost();
            //setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Ground Transport Details");
            setAlertSeverity("error")
            setAlert(true);
        });

        SeaTransportCon.sea_create(scoo2,sfuelCo,srouID,seaid,slabCo,sID,scustCo).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Sea Transport Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setSCO2();
            setSFuelCost();
            setSRouteID();
            setSeaid();
            setSLaborCost();
            setShipID();
            setSCustCost();
            //setTimeout(() => window.location.reload(false), 1000);

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Sea Transport Details");
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
                            <TextField required error={SerialNumber !== null && SerialNumber !== '' ? false : true} id="serial number" variant='outlined' label="HPT ID" defaultValue="" value={SerialNumber} onChange={e => setSerialNumber(e.target.value)}/>                       
                        </div>
                        <div>
                            <TextField required error={toolId !== null && toolId !== '' ? false : true} id="toolid" variant='outlined' label="Tool Type" defaultValue="" value={toolId} onChange={e => setToolId(e.target.value)}/>                       
                        </div>
                        <div>
                            <TextField required error={partsCost !== null && partsCost !== '' ? false : true} id="partscost" variant='outlined' label="Parts cost ID" defaultValue="" value={partsCost} onChange={e => setPartscost(e.target.value)}/>                       
                        </div>
                        <div>
                            <TextField required error={batteryId !== null && batteryId !== '' ? false : true} id="batteryid" variant='outlined' label="Battery ID / Serial Number" defaultValue="" value={batteryId} onChange={e => setBatteryid(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={bpartNumber !== null && bpartNumber !== '' ? false : true} id="bpartNumber" variant='outlined' label="Battery Part Number" defaultValue="" value={bpartNumber} onChange={e => {setBPartNumber(e.target.value);/*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={bco2 !== null && bco2 !== '' ? false : true} id="bco2" variant='outlined' label="Battery Co2 Emitted" defaultValue="" value={bco2} onChange={e =>{setBCO2(e.target.value); /*setDirty(true);*/}  }/>
                        </div>
                        <div>
                            <TextField required error={bcostManufactured !== null && bcostManufactured !== '' ? false : true} id="bcostManufactured" variant='outlined' label="Battery Cost of Manufacture ($)" type="number" defaultValue="" value={bcostManufactured} onChange={e => {setBCostManufactured(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField InputLabelProps={{ shrink: true }} required error={bdateManufactured !== null && bdateManufactured !== '' ? false : true} id="bdateManufactured" variant='outlined' type="date" label="Battery Date Manufactured" value={bdateManufactured} onChange={e => {setBDateManufactured(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={bsalesPrice !== null && bsalesPrice !== '' ? false : true} id="bsalesPrice" variant='outlined' label="Battery Sales Price ($)" type="number" defaultValue="" value={bsalesPrice} onChange={e => {setBSalesPrice(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={motorId !== null && motorId !== '' ? false : true} id="motorid" variant='outlined' label="Motor ID / Serial Number" defaultValue="" value={motorId} onChange={e => setMotorid(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={mpartNumber !== null && mpartNumber !== '' ? false : true} id="mpartNumber" variant='outlined' label="Motor Part Number" defaultValue="" value={mpartNumber} onChange={e => {setMPartNumber(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                    
                        <div>
                            <TextField required error={mco2 !== null && mco2 !== '' ? false : true} id="mco2" variant='outlined' label="Motor Co2 Emitted" defaultValue="" value={mco2} onChange={e =>{setMCO2(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        
                        <div>
                            <TextField required error={mcostManufactured !== null && mcostManufactured !== '' ? false : true} id="mcostManufactured" variant='outlined' label="Motor Cost of Manufacture ($)" type="number" defaultValue="" value={mcostManufactured} onChange={e => {setMCostManufactured(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField InputLabelProps={{ shrink: true }} required error={mdateManufactured !== null && mdateManufactured !== '' ? false : true} id="mdateManufactured" variant='outlined' type="date" label="Motor Date Manufactured" value={mdateManufactured} onChange={e => {setMDateManufactured(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={msalesPrice !== null && msalesPrice !== '' ? false : true} id="msalesPrice" variant='outlined' label="Motor Sales Price ($)" type="number" defaultValue="" value={msalesPrice} onChange={e => {setMSalesPrice(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={groundTransportId !== null && groundTransportId !== '' ? false : true} id="groundid" variant='outlined' label="Ground ID / Track Number" defaultValue="" value={groundTransportId} onChange={e => {setGroundid(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={grouteID !== null && grouteID !== '' ? false : true} id="grouteID" label="Ground Route ID" variant='outlined' defaultValue="" value={grouteID} onChange={e => {setGRouteID(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={truckID !== null && truckID !== '' ? false : true} id="truckID" variant='outlined' label="Truck ID" defaultValue="" value={truckID} onChange={e => {setTruckID(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={gco2 !== null && gco2 !== '' ? false : true} id="gco2" variant='outlined' label="Ground co2 Emitted" type="number" defaultValue="" value={gco2} onChange={e =>{setGCO2(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={gfuelCost !== null && gfuelCost !== '' ? false : true} id="gfuelCost" variant='outlined' label="Cost Fuel on Ground" type="number" defaultValue="" value={gfuelCost} onChange={e => {setGFuelCost(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={glaborCost !== null && glaborCost !== '' ? false : true} id="glaborCost" variant='outlined' label="Ground Labor Cost" type="number" defaultValue="" value={glaborCost} onChange={e => {setGLaborCost(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        
                        <div>
                            <TextField required error={gcustCost !== null && gcustCost !== '' ? false : true} id="gcustCost" variant='outlined' label="Ground Customer Cost" type="number" defaultValue="" value={gcustCost} onChange={e => {setGCustCost(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={seaTransportId !== null && seaTransportId !== '' ? false : true} id="Seaid" variant='outlined' label="Sea ID / Track Number" defaultValue="" value={seaTransportId} onChange={e => {setSeaid(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={srouteID !== null && srouteID !== '' ? false : true} id="srouteID" label="Sea Route ID" variant='outlined' defaultValue="" value={srouteID} onChange={e => {setSRouteID(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={shipID !== null && shipID !== '' ? false : true} id="shipID" variant='outlined' label="Ship ID" defaultValue="" value={shipID} onChange={e => {setShipID(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={sco2 !== null && sco2 !== '' ? false : true} id="sco2" variant='outlined' label="Sea co2 emitted" type="number" defaultValue="" value={sco2} onChange={e =>{setSCO2(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={sfuelCost !== null && sfuelCost !== '' ? false : true} id="sfuelCost" variant='outlined' label="Cost Fuel on Sea" type="number" defaultValue="" value={sfuelCost} onChange={e => {setSFuelCost(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        <div>
                            <TextField required error={slaborCost !== null && slaborCost !== '' ? false : true} id="slaborCost" variant='outlined' label="Sea Labor Cost" type="number" defaultValue="" value={slaborCost} onChange={e => {setSLaborCost(e.target.value); /*setDirty(true);*/}}/>
                        </div>
                        
                        <div>
                            <TextField required error={scustCost !== null && scustCost !== '' ? false : true} id="scustCost" variant='outlined' label="Sea Customer Cost" type="number" defaultValue="" value={scustCost} onChange={e => {setSCustCost(e.target.value); /*setDirty(true);*/}}/>
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

//const top100Films = [];