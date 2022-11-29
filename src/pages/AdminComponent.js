import * as React from 'react';
import { FaTools, FaPlus, FaFilter } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './Page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import CustomPaginationActionsTable from './Table';
import NavbarApp from "../pages/NavbarApp";
import FooterApp from './FooterApp';
import HptCon from '../connections/HptCon';
import loader from './logos/loader3.gif';
import HptAddEditTool from './HptAddEditTool';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Multiselect from 'multiselect-react-dropdown';
import BatteryCon from "../connections/BatteryCon";
import MotorCon from "../connections/MotorCon";
import SeaTransportCon from "../connections/SeaTransportCon";
import GroundTransportCon from '../connections/GroundTransportCon';

const state = {
    options: [
    ],
};

function createData(tooltype,serialNumAdmin,co2,partscost,motorid,
    batteryid,seaid,groundid,id) {
    return { tooltype,serialNumAdmin,co2,partscost,motorid,
        batteryid,seaid,groundid,id};
}


const rows = [];
const initialList = [];

export default function AdminComponent(){

    // const [openNew, setOpenNew] = React.useState(false);
    const [displayRows, setDisplayRows]= React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [selectedItemsList, setSelectedItemsList] = React.useState(initialList);
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
    
    const get_hpt_info = async()=>{
        //setDisplayRows(false);
        const hptData = await HptCon.hpt_fetch(selectedItemsList);
        // console.log("motor data :",hptData);

        if (rows.length===0){
        for(var i = 0; i < hptData.length; i++) {
            rows.push(createData(hptData[i].toolType,hptData[i].SerialNumber,
                hptData[i].co2,hptData[i].partsCost,hptData[i].motorId,hptData[i].BatteryId,
                hptData[i].seaTransportId,hptData[i].groundTransportId,hptData[i]._id));
        }
    }
        rows.sort((a, b) => (a.SerialNumber > b.SerialNumber ? -1 : 1));
        setDisplayRows(true);
    }    
    
    useEffect(()=>{
        get_hpt_info();
    },[]);

    const handleClickOpenNew = () => {
        setOpenEdit(true);
    };

    const handleChildExit = (isOpen) => {
        setOpenEdit(isOpen);
        console.log(isOpen);
    }

    const handleChild = (isOpen) =>{
        setOpenEdit(isOpen);
        console.log(isOpen);
        setAlertContent("Success! Added New HPT Details");
        setAlertSeverity("success");
        setAlert(true);
    }

    const handleClickOpenFilter = () =>{
        console.log("filter");
        setOpenFilter(true);
        if(state.options.length <1){
            getFilterOptions();
        }
    }

    const handleReset = () => {
        setOpenFilter(false);
        const newlist = [];
        setSelectedItemsList(newlist);
        console.log("Length of list after reset >>" +selectedItemsList.length);
        selectedItemsList.forEach(element =>{
            console.log(element.id);
        });
    }

    const handleFilter = async()=> {
        setOpenFilter(false);
        selectedItemsList.forEach(element =>{
            console.log(element);
        });
        get_hpt_info();

    }

    const handleItemSelect = (selectedList, selectedItem) => {
        console.log("Selected Item >> "+selectedItem);
        selectedItemsList.push(selectedItem);
        selectedItemsList.forEach(element =>{
            console.log(element.id);
        });
    }

    const handleItemRemove = (selectedList, removedItem) => {
        console.log("Removed Item >> "+removedItem)
        selectedItemsList.pop(removedItem);
        selectedItemsList.forEach(element =>{
            console.log(element.id);
        });
    }

    

    const get_battery_info = async()=>{
        const batteryData = await BatteryCon.battery_fetch();
        console.log("battery data :",batteryData);
        // if (batteryOptions.length===0){
            for(var i = 0; i < batteryData.length; i++) {
                // batteryOptions.push(batteryData[i].serialNumber);
                var option = {key: 'Battery ID', value: batteryData[i].serialNumber};
                state.options.push(option);
            }
        // }
    }  
    const get_motor_info = async()=>{
        const motorData = await MotorCon.motor_fetch();
        console.log("motor data :",motorData);

        // if (motorOptions.length===0){
            for(var i = 0; i < motorData.length; i++) {
                // motorOptions.push(motorData[i].serialNumber);
                var option = {key: 'Motor ID', value: motorData[i].serialNumber};
                state.options.push(option);
            }
        // }
    }  
    const get_sea_info = async()=>{
        const seaData = await SeaTransportCon.sea_fetch();
        console.log("sea data :",seaData);

        // if (seaRouteOptions.length === 0){
            for(var i = 0; i < seaData.length; i++) {
                // seaRouteOptions.push(seaData[i].routeId);
                var option = {key: 'Sea Route ID', value: seaData[i].trackingNumber};
                state.options.push(option);
            }
        // }
    }  

    const get_ground_info = async()=>{
        const groundData = await GroundTransportCon.ground_fetch();
        console.log("ground data :",groundData);

        // if (groundRouteOptions.length === 0){
            for(var i = 0; i < groundData.length; i++) {
                // groundRouteOptions.push(groundData[i].routeId);
                var option = {key: 'Ground Route ID', value: groundData[i].trackingNumber};
                state.options.push(option);
            }
        // }
    }

    const getFilterOptions = ()=>{
        get_battery_info();
        get_motor_info();
        get_sea_info();
        get_ground_info();
    };

    return(
        <>
        {alert ? 
            <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose} anchorOrigin={{vertical,horizontal}}>
              <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertContent}
              </Alert>
            </Snackbar>      
        : <></>}
        <NavbarApp></NavbarApp>
        <div className="hpt-body" style={{ backgroundColor:'#d8d2b8', padding:'20px'}}>
            <div className='row' style={{paddingBottom:'20px'}}>
                <div className='col-lg-10 col-md-10 col-sm-8 col-xs-6'>
                    <Typography gutterBottom variant="h5" component="div" align="left">
                    <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><FaTools/></span> Hornet Power Tools Admin
                    </Typography>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
                <Button onClick={handleClickOpenFilter} title="Filter HPT" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px', marginRight:'10px'}}><FaFilter /></Button>
                <Button onClick={handleClickOpenNew} title="Add New HPT Details" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px'}}><FaPlus /><span style={{paddingLeft:'10px'}}>New Tool</span></Button>
                {openEdit?<HptAddEditTool  open={true} exit={handleChildExit} close={handleChild}></HptAddEditTool> :<></>}
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
                        <FaTools sx={{ mr: 1 }} fontSize="inherit" style={{marginRight: '5px'}} />
                        {" HPT Details"}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            {!displayRows? 
                <div style={{textAlign:'center'}}>
                    
                    <img src={loader} alt="" style={{width:'60%', height:'50%'}}/>
                </div>:<></>}
            {displayRows?<CustomPaginationActionsTable rows={rows} type="HPT"></CustomPaginationActionsTable>:<></>}

            <Dialog open={openFilter} onClose={handleReset} sx={{"& .MuiDialog-container": {"& .MuiPaper-root": {maxWidth: "30%", minHeight:'40%', minWidth:'30%', maxHeight:'60%'},},}}>
                <DialogTitle><span style={{paddingRight:'10px'}}><FaFilter/></span>Filter 
                <a onClick={handleReset} style={{float:'right', cursor:'pointer'}}>
                    <AiOutlineCloseCircle style={{color:'#004e38', fontSize:'25px'}} />
                </a>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText  style={{paddingBottom:'20px'}}>
                            Filter Components of HPT tool.
                    </DialogContentText>
                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div style={{paddingBottom:'15px'}}>
                            <Multiselect
                                options={state.options} // Options to display in the dropdown
                                selectedValues={selectedItemsList} // Preselected value to persist in dropdown
                                onSelect={handleItemSelect} // Function will trigger on select event
                                onRemove={handleItemRemove} // Function will trigger on remove event
                                displayValue="value" // Property name to display in the dropdown options
                                placeholder='Filter Items'
                                showCheckbox='true'
                                groupBy='key'
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset} style={{color:'#004e38', backgroundColor:'#fff', border:'0.5px solid #004e38'}}>Reset</Button>
                    <Button onClick={handleFilter}style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Filter</Button>
                </DialogActions>
            </Dialog>
        </div>
        <FooterApp></FooterApp>
        </>
    );
}
