import './Login.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import logo from './logos/sac_state_logo.jpg';
// import loginlogo from './login_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import BatteryCon from '../connections/BatteryCon';

export default function Battery(){
    var hide = true;
    
    return(
        <div style={{overflow:'hidden'}}>
            <div className="row" id="main-header" style={{height: '110px'}}>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12" id="hpt-header-logo" style={{width:'165px'}} >
                    <img src={logo} alt='Sacramento State' style={{width: '125px', height: '110px'}} />
                </div>   
                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12" id="hpt-header-title" style={{height: '110px', fontFamily: 'Trajan Pro Bold', color:'#004e38', padding:'25px', paddingLeft:'0px', fontSize:'35px'}}>
                    Hornet Power Tools
                </div>
            </div>

            <div className='row' id="login-body" style={{height:'711px', background:'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), URL("https://idp.csus.edu/idp/images/GuyWestBridge_l.jpg")'}}>
                <div className='row' style={{paddingTop:'70px'}}>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12' ></div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{height:'560px', paddingTop:'60px', background:'rgba(0, 78, 56, 0.92)', borderRadius:'15px', boxShadow:'0px 0px 0px 3px #004e38a1'}}>
                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'15px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div>
                            <TextField required id="co2" variant='filled' label="co2" type="number" defaultValue=""/>
                        </div>
                        <div>
                            <TextField required id="costManufactured" variant='filled' label="costManufactured" type="number" defaultValue=""/>
                        </div>
                        <div>
                            <TextField required id="dateManufactured" variant='filled' label="dateManufactured" defaultValue=""/>
                        </div>
                        <div>
                            <TextField required id="partNumber" variant='filled' label="partNumber" defaultValue=""/>
                        </div>
                        <div>
                            <TextField required id="salesPrice" variant='filled' label="salesPrice" type="number" defaultValue=""/>
                        </div>
                        <div>
                            <TextField required id="serialNumber" variant='filled' label="serialNumber" defaultValue=""/>
                        </div>
                        <div hidden={!hide} style={{float:'right', paddingTop:'15px', paddingRight:'27px'}}>
                            <Button id="login" variant="contained">SUBMIT</Button>
                        </div>
                        <div hidden={hide}>
                            <LoadingButton loading variant="outlined">
                            Submit
                            </LoadingButton>
                        </div>
                    </Box>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'></div></div>
            </div>

        </div>
    );

}
