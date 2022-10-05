import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FaRegCopyright, FaSearch, FaUserAlt } from 'react-icons/fa';
import './Dashboard.css';
import Box from '@mui/material/Box';
import ToolView from "./ToolView";

export default function Dashboard(){

    return(
        <>
            <><Navbar bg="white">
                <Container style={{marginLeft:'10px' }}>
                <Navbar.Brand href="#home" style={{ fontFamily: 'Trajan Pro Bold', color:'#004e38', padding:'15px', paddingLeft:'0px', fontSize:'22px'}}>
                    <img
                    alt=""
                    src="https://logos-world.net/wp-content/uploads/2020/07/Sacramento-State-Hornets-Logo.png" 
                    width="50"
                    height="40"
                    className="d-inline-block align-top"
                    />{' '}
                    Hornet Power Tools
                </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
                {/* <Navbar.Collapse id="navbarScroll" > */}
                    <Nav className="" >
                        <Nav.Link href="dashboard" style={{paddingRight:'30px', color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'19px'}}>Dashboard</Nav.Link>
                        <Button href="login" variant="outline-success" style={{padding:'10', marginRight:'-72px'}}><FaUserAlt /></Button>
                    </Nav>
                {/* </Navbar.Collapse>    */}
                </Container> 
            </Navbar></>
            <div className="row hpt-body" style={{ height:'680px', backgroundColor:'#d8d2b8', paddingTop: '20px', paddingLeft: '20px', minHeight:'100%', overflow:'hidden'}}>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <Card sx={{ maxWidth: '100%', height:'75%'}}>
                        {/* <CardHeader title="Hornet Power Tools Finder" subheader=""/> */}
                        <CardMedia component="img" alt="green iguana" height="255" image="https://img.freepik.com/free-vector/global-co2-emi…rbon-dioxide-air-pollution_335657-3395.jpg?w=2000"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                            HP Tool Finder
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                Search for tools with HPT ID
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Stack spacing={2} sx={{ width: 300,  paddingBottom:'40px' }}>
                            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '210px', backgroundColor:'#fff' }, paddingLeft:'15px', '& .MuiButton-root':{width:'80px',backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                                <span><TextField id="hpt-sno-search-text" label="HPT ID" variant="outlined"  style={{marginRight:'0px'}} /></span>
                                <span><Button variant="outlined" style={{marginTop:'8px', border:'1px solid', height:'56px', width:'66px', borderRadius:'0px 6px 6px 0px', backgroundColor:'#a17f0f', color:'#fff'}}><FaSearch /></Button></span>
                             </Box>   
                            </Stack>
                        </CardActions>
                    </Card>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12" style={{paddingRight:'30px'}}>
                    <Card sx={{ maxWidth: '100%', height:'96%' }}>
                        <CardContent>
                            <ToolView></ToolView>   
                        </CardContent>
                    </Card>
                </div>
            </div>
            <footer className="row" style={{backgroundColor:'#022e22', height:'55px', color:'#fff'}}> 
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12" style={{padding: '15px', paddingLeft:'40px'}}>
                    <FaRegCopyright /> Team-4
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12" style={{padding: '15px'}}></div>
                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12" style={{padding: '15px', paddingRight:'0px', marginRight:'-25px'}}>
                    <span ><a href="https://community.vendia.net/c/support-share/6" style={{color:'#fff', float:'right'}}>Vendia Community Support</a></span>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12" style={{padding: '15px', paddingLeft:'0px'}}>
                    <span><a href="https://community.vendia.net/t/sac-state-ux-test-razer-keyboard-raffle/43" style={{color:'#fff' , paddingRight:'25px', float:'right' }}> Vendia tutorial</a></span>
                </div>
            </footer>

        </>
    );
}