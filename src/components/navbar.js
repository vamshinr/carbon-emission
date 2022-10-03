import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <Navbar bg="light" expand="lg" className="font-link">
        
      <Container fluid>
      <img
              src="https://logos-world.net/wp-content/uploads/2020/07/Sacramento-State-Hornets-Logo.png"
              width="50"
              height="40"
              // className="d-inline-block align-top"
              alt="Vendia logo"
            />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', alignContent:'center' }}
            navbarScroll>
            <Nav.Link style={{fontSize: '20px',}} href="#action1" className="font-link">HOME</Nav.Link>
            <Nav.Link style={{fontSize: '20px'}} href="#action2">HPT</Nav.Link>
            <NavDropdown style={{fontSize: '20px'}} title="SUPPLIERS" id="navbarScrollingDropdown">
              <NavDropdown.Item style={{fontSize: '20px'}} href="#action3">MOTOR</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize: '20px'}} href="#action4">BATTERY</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize: '20px'}} href="#action5">TRANSPORT</NavDropdown.Item>
            </NavDropdown>
          <Form className="d-flex">
            <Form.Control
              style={{width: '500px', height: '40px'}}
              alignContent='middle'
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          </Nav>
          <Nav.Link style={{fontSize: '20px',paddingRight:'1em'}} href="#action6">Create an Account </Nav.Link>
          <Button variant="outline-success" style={{padding:'10'}}>Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;