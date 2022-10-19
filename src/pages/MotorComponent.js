import * as React from 'react';
import { Box } from '@mui/system';
import { FaPlus} from 'react-icons/fa';
import {FiSettings} from 'react-icons/fi';
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
import {useState} from 'react';
import BatteryCon from '../connections/BatteryCon';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// function createData(co2,costManu,dateManu,partNum,salesPr,serialNum) {
//     return { co2,costManu,dateManu,partNum,salesPr,serialNum };
// }

const rows = [];

export default function MotorComponent(){  
    const [openNew, setOpenNew] = React.useState(false);
    // const [openDirty, setOpenDirty] = React.useState(false);
    // const [dirty,setDirty] = useState(false);
    const [co2, setCO2] = useState();
    const [costManufactured, setCostManufactured] = useState();
    const [dateManufactured, setDateManufactured] = React.useState(null);
    const [partNumber, setPartNumber] = useState();
    const [salesPrice, setSalesPrice] = useState();
    const [serialNumber, setSerialNumber] = useState();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleClickCloseNew = () => {
        // if(dirty){
        //     setOpenDirty(true);
        // }
        // else{
            setOpenNew(false);
            setCO2();
            setCostManufactured();
            setDateManufactured(null);
            setPartNumber();
            setSalesPrice();
            setSerialNumber();
        // }
        
    };
    

    const handleClickSubmit = () =>{
        var coo2 = Number(co2);
        var costManu = Number(costManufactured);
        var dateManu = String(dateManufactured);
        var partNum = String(partNumber);
        var salesPr = Number(salesPrice);
        var serialNum = String(serialNumber);
        // console.log("co2 : "+coo2);
        // console.log("costMan : "+costManufactured);
        BatteryCon.battery_create(coo2,costManu,dateManu,partNum,salesPr,serialNum).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Motor Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setCostManufactured();
            setDateManufactured(null);
            setPartNumber();
            setSalesPrice();
            setSerialNumber();

        }).catch(error =>{
            console.log(error);
            setAlertContent("Failure! Couldn't Add New Motor Details");
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
    //         handleClickCloseNew();
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
                <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><FiSettings /></span> Hornet Motor Suppliers
                </Typography>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
                <Button onClick={handleClickOpenNew} title="Add New Motor Details" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px'}}><FaPlus /><span style={{paddingLeft:'10px'}}>New Motor</span></Button>
                <Dialog open={openNew} onClose={handleClickCloseNew}>
                    <DialogTitle><span style={{paddingRight:'10px'}}><FaPlus/></span>New Motor Details</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                         Add New Motor details here.
                    </DialogContentText>

                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div>
                            <TextField required error={serialNumber !== null && serialNumber !== '' ? false : true} id="serialNumber" variant='outlined' label="Product Serial Number" defaultValue="" value={serialNumber} onChange={e => setSerialNumber(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={partNumber !== null && partNumber !== '' ? false : true} id="partNumber" variant='outlined' label="Part Number" defaultValue="" value={partNumber} onChange={e => setPartNumber(e.target.value)}/>
                        </div>
                        <div>
                            <TextField required error={co2 !== null && co2 !== '' ? false : true} id="co2" variant='outlined' label="Co2 Emitted" defaultValue="" value={co2} onChange={e =>{setCO2(e.target.value); /*setDirty(true);*/}  }/>
                        </div>
                        <div>
                            <TextField required error={costManufactured !== null && costManufactured !== '' ? false : true} id="costManufactured" variant='outlined' label="Cost of Manufacture ($)" type="number" defaultValue="" value={costManufactured} onChange={e => setCostManufactured(e.target.value)}/>
                        </div>
                        {/* <div> */}
                            {/* <TextField required error={dateManufactured !== null && dateManufactured !== '' ? false : true} id="dateManufactured" helperText="Date Manufactured" variant='outlined' type="date" defaultValue="" value={dateManufactured} onChange={e => setDateManufactured(e.target.value)}/> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Date Manufactured" value={dateManufactured} onChange={(newVal) => setDateManufactured(newVal)} renderInput={(params) => <TextField {...params} />}/>
                            </LocalizationProvider>
                        {/* </div>s */}
                        <div>
                            <TextField required error={salesPrice !== null && salesPrice !== '' ? false : true} id="salesPrice" variant='outlined' label="Sales Price ($)" type="number" defaultValue="" value={salesPrice} onChange={e => setSalesPrice(e.target.value)}/>
                        </div>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                        <Button onClick={handleClickSubmit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div></div>
            <CustomPaginationActionsTable rows={rows} type='Motor'></CustomPaginationActionsTable>
        </div>
        <FooterApp></FooterApp>
        </>
    );
}