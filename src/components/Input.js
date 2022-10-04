import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Figure from 'react-bootstrap/Figure';
import battery_fetch from "../connections/BatteryCon";

function Input() {
    const [buffHPT, setbuffHPT] = useState('');
    const [HPT, setHPT] = useState('')
    const [showResults,setShowResults] = useState(false)
    const [fetchData, setfetchData] = useState('');
    

    const batteryfetchdata = battery_fetch();
    console.log("jyothi");
    battery_fetch().then(function(result) {
      console.log(result.items[0].co2);
    });
    const handleSubmit = (e)=>{
        setShowResults(true)
        setHPT(buffHPT)

    }
    return (
      <div className="Input">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      }} >
      <br />
      <Card border="secondary" style={{ width: '28rem' }}>
        <Card.Img variant="top" src="https://img.freepik.com/free-vector/global-co2-emissions-abstract-concept-illustration-global-carbon-footprint-greenhouse-effect-co2-emissions-country-rate-statistics-carbon-dioxide-air-pollution_335657-3395.jpg?w=2000" />
        <Card.Body>
          <Card.Title>Hornet Power Tools</Card.Title>
          <label>
            <input type="text" placeholder = "Enter HPT #"
            required 
            value = {buffHPT}
            onChange = {(e) => setbuffHPT(e.target.value)}
            name="HPT" />
          </label>
          <br></br>
          <br></br>
          <Button variant="primary" onClick = {handleSubmit} value="Submit">Submit</Button>
        </Card.Body>
      </Card>
      
      </div>
      <div>
            {showResults?<div>HPT Number is {HPT}</div>:null}
            {showResults?<Results hpt={HPT}/>:null} 
        </div>
        
      <br />
      
      </div>
    );
  }


  const Results = (params) => (
    <div id="results" className="search-results">
    <br/>
      <CalcResults hpt = {params.hpt} />
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">click to see break down</Button>
      </OverlayTrigger>
    </div>
  )

  const CalcResults = (params) => {
      const [motorSupplier,setmotorSupplier] = useState(24)
      const [batterySupplier, setbatterySupplier] = useState(30)
      const totalCo2 = motorSupplier+batterySupplier

        return (
            <div>
                total Co2 Emission: {totalCo2}
                <br/>
            </div>
        )
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">BreakDown</Popover.Header>
      <Popover.Body>
      <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src="holder.js/171x180"
      />
      <Figure.Caption>
        Nulla vitae elit libero, a pharetra augue mollis interdum.
      </Figure.Caption>
    </Figure>

      </Popover.Body>
    </Popover>
  );
  
  
  
  export default Input;