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
import { useState } from 'react';
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

const state = {
    options: [{name: 'Option 1', id: 1},{name: 'Option 2', id: 2}]
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
        const hptData = await HptCon.hpt_fetch();
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
    
    get_hpt_info();

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
        // const hptData = await HptCon.hpt_filter_fetch();
        selectedItemsList.forEach(element =>{
            console.log(element.id);
        });
    }

    const handleItemSelect = (selectedList, selectedItem) => {
        console.log("Selected Item >> "+selectedItem.id);
        selectedItemsList.push(selectedItem);
        selectedItemsList.forEach(element =>{
            console.log(element.id);
        });
    }

    const handleItemRemove = (selectedList, removedItem) => {
        console.log("Removed Item >> "+removedItem.id)
        selectedItemsList.pop(removedItem);
        selectedItemsList.forEach(element =>{
            console.log(element.id);
        });
    }

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

            <Dialog open={openFilter} onClose={handleReset} sx={{"& .MuiDialog-container": {"& .MuiPaper-root": {maxWidth: "100%", minHeight:'40%', minWidth:'30%'},},}}>
                <DialogTitle><span style={{paddingRight:'10px'}}><FaFilter/></span>Filter 
                <a onClick={handleReset} style={{float:'right', cursor:'pointer'}}>
                    <AiOutlineCloseCircle style={{color:'#004e38', fontSize:'25px'}} />
                </a>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            Filter Components of HPT tool.
                    </DialogContentText>
                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                    <Multiselect
                        style={{}}
                        options={state.options} // Options to display in the dropdown
                        selectedValues={selectedItemsList} // Preselected value to persist in dropdown
                        onSelect={handleItemSelect} // Function will trigger on select event
                        onRemove={handleItemRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        />
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
