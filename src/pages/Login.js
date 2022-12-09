import './Login.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import logo from './logos/sac_state_logo.jpg';
import cloud from './logos/cloud_co2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function Login(){

    const [hide, setHide] = useState(true);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);

    const handleSubmit = () =>{
        setHide(false);
        var currentLocation = window.location;
        console.log(currentLocation);
        if(username !== null && username !== '' && password !== null && password !== ''){
            if(username === "admin@csus.edu" && password === "admin@123"){
                window.location.replace(currentLocation.origin +"/admin");                
            }
            else if(username === "battery@csus.edu" && password === "battery@123"){
                window.location.replace(currentLocation.origin +"/battery-supplier");
            }
            else if(username === "motor@csus.edu" && password === "motor@123"){
                window.location.replace(currentLocation.origin +"/motor-supplier");
            }
            else if(username === "searoute@csus.edu" && password === "sea@123"){
                window.location.replace(currentLocation.origin +"/sea-transport");
            }
            else if(username === "groundroute@csus.edu" && password === "ground@123"){
                window.location.replace(currentLocation.origin +"/ground-transport");
            }
            else{
                setError(true);
                setHide(true);
            }
        }
        else{
            setError(true);
            setHide(true);
        }
    }
    
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

            <div className='row' id="login-body" style={{background:'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), URL("https://idp.csus.edu/idp/images/GuyWestBridge_l.jpg")'}}>
                <div className='row' style={{paddingTop:'80px', paddingBottom:'50px', height:'575px'}}>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12' ></div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12' style={{paddingTop:'40px', background:'rgba(0, 78, 56, 0.92)', borderRadius:'15px', boxShadow:'0px 0px 0px 3px #004e38a1'}}>
                    <div style={{textAlign:'center', height:'130px'}}><img src={cloud} alt=""  style={{width:'125px', height:'150px'}} /></div>
                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'15px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div style={{color:'#dc3545', fontSize:'15px', fontStyle:'sans-serif'}}>{error ? " * Username or Password is incorrect" : ""}</div>
                        <div>
                            <TextField required error={username !== null && username !== ''? false : true} id="username" variant='filled' label="Username" type="email" value={username} onChange={e=>{setUserName(e.target.value)}} pattern="[^ @]*@[^ @]*" />
                        </div>
                        <div>
                            <TextField required error={password !== null && password !== ''? false : true} id="password" variant='filled' label="Password" type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                        </div>
                        {/* { hide ? */}
                        <div style={{float:'right', paddingTop:'15px', paddingRight:'27px'}}>
                            <Button id="login" variant="contained" onClick={handleSubmit}>Login</Button>
                        </div>
                        {/* :
                        <div style={{textAlign:'right'}}>
                            <LoadingButton loading variant="outlined">
                            Submit
                            </LoadingButton>
                        </div>} */}
                    </Box>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'></div></div>
            </div>

        </div>
    );

}
