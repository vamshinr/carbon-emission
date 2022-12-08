import * as React from 'react';
import { Box } from '@mui/system';
import { FaPlus, FaChartLine} from 'react-icons/fa';
import {BsFillBarChartLineFill} from 'react-icons/bs';
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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MotorCon from '../connections/MotorCon';
import loader from './logos/loader3.gif';
import { Bar, Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import {BsGraphUp} from 'react-icons/bs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
Chart.register(CategoryScale);


function createData(co2,costManu,dateManu,partNum,salesPr,serialNum,id) {
    return { co2,costManu,dateManu,partNum,salesPr,serialNum,id};
}

const rows = [];
var data1 = [];
var data2 = [];
var data4 = {};
var data5 = {};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}  

export default function MotorComponent(){  
    const [openNew, setOpenNew] = React.useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openDirty, setOpenDirty] = React.useState(false);
    const [dirty,setDirty] = useState(false);
    const [co2, setCO2] = useState();
    const [costManufactured, setCostManufactured] = useState();
    const [dateManufactured, setDateManufactured] = React.useState();
    const [partNumber, setPartNumber] = useState();
    const [salesPrice, setSalesPrice] = useState();
    const [serialNumber, setSerialNumber] = useState();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [displayRows, setDisplayRows] = useState(false);

    const get_motor_info = async()=>{
        //setDisplayRows(false);
        const motorData = await MotorCon.motor_fetch();
        console.log("motor data :",motorData);

        if (rows.length===0){
        for(var i = 0; i < motorData.length; i++) {

            data1.push(motorData[i].dateManufactured)
            data2.push(motorData[i].co2)
            rows.push(createData(motorData[i].co2,motorData[i].costManufactured,
                motorData[i].dateManufactured,motorData[i].partNumber,motorData[i].salesPrice,
                motorData[i].serialNumber,motorData[i]._id));
        }
        

        for (i = 0; i<motorData.length; i++){
            if (data5[data1[i].slice(0,4)]===undefined){
                data5[data1[i].slice(0,4)] = data2[i];
                data4[data1[i].slice(0,4)] = 1;
            }
            else{
                data5[data1[i].slice(0,4)] = data5[data1[i].slice(0,4)]+data2[i];
                data4[data1[i].slice(0,4)] = data4[data1[i].slice(0,4)]+1;
            }
        }
        data1 = Object.keys(data5) ;
        for(i =0; i<data1.length; i++){
            data5[data1[i]] = data5[data1[i]]/data4[data1[i]]
        }
        data2 = Object.values(data5);
    }
        rows.sort((a, b) => (a.serialNumber < b.serialNumber ? -1 : 1));
        setTimeout(() => setDisplayRows(true), 1500);
        //setDisplayRows(true);
    }    
    
    get_motor_info();
    console.log("display rows",displayRows);
    console.log("rows",rows);

    const handleHistoryOpen = () =>{
        setOpenHistory(true);
    }
    const handleHistoryClose = () => {
        setOpenHistory(false)
    };

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleClickCloseNew = () => {
        if(dirty){
            setOpenDirty(true);
        }
        else{
            setOpenNew(false);
            setCO2();
            setCostManufactured();
            setDateManufactured();
            setPartNumber();
            setSalesPrice();
            setSerialNumber();
        }
        
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
        MotorCon.motor_create(coo2,costManu,dateManu,partNum,salesPr,serialNum).then(response =>{
            setOpenNew(false);
            setAlertContent("Success! New Motor Details Added");
            setAlertSeverity("success");
            setAlert(true);
            console.log(response);
            setCO2();
            setCostManufactured();
            setDateManufactured();
            setPartNumber();
            setSalesPrice();
            setSerialNumber();
            setTimeout(() => window.location.reload(false), 1000);

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

    const handleCloseDirty = (x) =>{
        if(x===0){
            setOpenDirty(false);
        }
        else{
            setOpenDirty(false);
            setDirty(false);
            handleClickCloseNew();
        }
    }
    const data3 = {
        labels: data1,
        datasets: [
            {
            label: "Motor Co2",
            data: data2,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
            },
            
        ]
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><FiSettings /></span> Hornet Motor Suppliers
                </Typography>
            </div>
            <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
             <Button  onClick={handleHistoryOpen} title="Motor History" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38',marginTop:'10px', marginRight:'10px' }}><span style={{paddingLeft:'1px'}}><BsGraphUp /></span></Button>
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
                            <TextField required error={partNumber !== null && partNumber !== '' ? false : true} id="partNumber" variant='outlined' label="Part Number" defaultValue="" value={partNumber} onChange={e => {setPartNumber(e.target.value); setDirty(true);}}/>
                        </div>
                        <div>
                            <TextField required error={co2 !== null && co2 !== '' ? false : true} id="co2" variant='outlined' label="Co2 Emitted" defaultValue="" value={co2} onChange={e =>{setCO2(e.target.value); setDirty(true);}}/>
                        </div>
                        <div>
                            <TextField required error={costManufactured !== null && costManufactured !== '' ? false : true} id="costManufactured" variant='outlined' label="Cost of Manufacture ($)" type="number" defaultValue="" value={costManufactured} onChange={e => {setCostManufactured(e.target.value); setDirty(true);}}/>
                        </div>
                        <div>
                            <TextField InputLabelProps={{ shrink: true }} required error={dateManufactured !== null && dateManufactured !== '' ? false : true} id="dateManufactured" variant='outlined' type="date" label="Date Manufactured" value={dateManufactured} onChange={e => {setDateManufactured(e.target.value); setDirty(true);}}/>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker dateFormat="MM/dd/yyyy" label="Date Manufactured" value={dateManufactured} onChange={(newVal) => setDateManufactured(newVal)} renderInput={(params) => <TextField {...params} />}/>
                            </LocalizationProvider> */}
                        </div>
                        <div>
                            <TextField required error={salesPrice !== null && salesPrice !== '' ? false : true} id="salesPrice" variant='outlined' label="Sales Price ($)" type="number" defaultValue="" value={salesPrice} onChange={e => {setSalesPrice(e.target.value); setDirty(true);}}/>
                        </div>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                        <Button onClick={handleClickSubmit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openHistory} fullWidth = {true} onClose={handleHistoryClose}>
                    <DialogTitle><span style={{paddingRight:'10px'}}><BsGraphUp /></span>Motor History</DialogTitle>
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Bar Chart" {...a11yProps(0)} />
                                <Tab label="Line Chart" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Bar data={data3} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Line data={data3} /> 
                            </TabPanel>
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
                    <FiSettings sx={{ mr: 1 }} fontSize="inherit" style={{marginRight: '5px'}} />
                    {" Motor Details"}
                    </Typography>
                </Breadcrumbs>
            </div>
            </div>
            {!displayRows? 
                <div style={{textAlign:'center'}}>
                    
                    <img src={loader} alt="" style={{width:'60%', height:'50%'}}/>
                </div>:<></>}
            {displayRows?<CustomPaginationActionsTable rows={rows} type='Motor'></CustomPaginationActionsTable>:<></>}

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
        </div>
        <FooterApp></FooterApp>
        </>
    );
}