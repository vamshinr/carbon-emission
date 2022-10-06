import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Figure from 'react-bootstrap/Figure';

import battery_fetch from "../connections/BatteryCon";
import hpt_fetch from "../connections/HptCon";
import motor_fetch from "../connections/MotorCon";
import sea_fetch from "../connections/SeaTransportCon";
import ground_fetch from "../connections/groundTransportCon";

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

    const [hptco2,setHPTco2] = useState(0);
    const [seaTransportationco2,setseaTransportationco2] = useState(0);
    const [groundTransportationco2,setgroundTransportationco2] = useState(0);
    const [userAuthco2,setuserAuthco2] = useState(0);
    const [motorSupplierco2,setmotorSupplierco2] = useState(0);
    const [batterySupplierco2, setbatterySupplierco2] = useState(0);
    const [batteryid,setbatteryid] = useState();
    const [motorid,setmotorid] = useState();
    const [seaid,setseaid] = useState();
    const [groundid,setgroundid] = useState();


    // setseaTransportationco2(0);
    // setgroundTransportationco2(0);
    // setbatterySupplierco2(0);
    // setmotorSupplierco2(0);

    hpt_fetch().then(function(result) {
      for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].SerialNumber == params.hpt){
          console.log("hpt found")
          console.log("hpt:", result.items[i]);
          setHPTco2(result.items[i].co2);
          setbatteryid(result.items[i].BatteryId);
          setmotorid(result.items[i].motorId);
          setseaid(result.items[i].seaTransportId);
          setgroundid(result.items[i].groundTransportId);
        }
        else{
          setHPTco2(0);
        }
      }
    });
    
    
    battery_fetch().then(function(result) {
      for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].serialNumber == batteryid){
          console.log("battery found");
          setbatterySupplierco2(result.items[i].co2);
        }
        else{
          setbatterySupplierco2(0);
        }
      }
    });


    motor_fetch().then(function(result) {
      for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].serialNumber == motorid){
          setmotorSupplierco2(result.items[i].co2);
        }
        else{
          setmotorSupplierco2(0);
        }
      }
    });


    sea_fetch().then(function(result) {
      for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].trackingNumber == seaid){
          setseaTransportationco2(result.items[i].co2);
        }
        else{
          setseaTransportationco2(0);
        }
      }
    });


    ground_fetch().then(function(result) {
      for (var i = 0; i < result.items.length; i++) {
        if (result.items[i].trackingNumber == groundid){
          setgroundTransportationco2(result.items[i].co2);
        }
        else{
          setgroundTransportationco2(0);
        }
      }
    });

      return (
          <div>
              total Co2 Emission: {hptco2}
              <br/>
              BreakDown
              <br/>
              battery co2: {batterySupplierco2}
              <br/>
              motor co2: {motorSupplierco2}
              <br/>
              sea transport co2: {seaTransportationco2}
              <br/>
              ground transport co2: {groundTransportationco2}
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