import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { FaUserAlt } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import './Page.css';

export default function NavbarApp(){
    return(
        <>
            <Navbar bg="white">
                <Container style={{marginLeft:'10px' }}>
                <Navbar.Brand href="#home" style={{ fontFamily: 'Trajan Pro Bold', color:'#004e38', padding:'15px', paddingLeft:'0px', fontSize:'22px'}}>
                    <img
                    alt="" src="https://logos-world.net/wp-content/uploads/2020/07/Sacramento-State-Hornets-Logo.png" width="50" height="40" className="d-inline-block align-top" />{' '}
                    Hornet Power Tools
                </Navbar.Brand>
                <Nav className="" >
                    <NavDropdown style={{paddingRight:'10px', color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'20px'}} title="Suppliers" id="navbarScrollingDropdown">
                        <NavDropdown.Item  href="battery-supplier" style={{color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'19px'}} id="option1">Battery Supplier</NavDropdown.Item>
                        <NavDropdown.Item  href="motor-supplier"   style={{color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'19px'}} id="option2">Motor Supplier</NavDropdown.Item>
                        <NavDropdown.Item  href="ground-transport" style={{color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'19px'}} id="option3">Ground Transport</NavDropdown.Item>
                        <NavDropdown.Item  href="sea-transport"    style={{color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'19px'}} id="option4">Sea Route Transport</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="dashboard" style={{paddingRight:'30px', color:'#004e38',  fontFamily: 'Trajan Pro Bold', fontSize:'19px'}}>Dashboard</Nav.Link>
                    <Button href="login" title="login" style={{padding:'10', marginRight:'-72px', color:'#004e38', backgroundColor:'#fff', border:'0.5px solid #004e38'}}><FaUserAlt /></Button>
                </Nav>
                </Container> 
            </Navbar>
        </>
    );
}