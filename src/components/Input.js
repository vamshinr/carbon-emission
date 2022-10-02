import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Input() {
    const [buffHPT, setbuffHPT] = useState('');
    const [HPT, setHPT] = useState('')
    const [showResults,setShowResults] = useState(false)
    const handleSubmit = (e)=>{
        setShowResults(true)
        setHPT(buffHPT)

    }
    return (
      <div className="Input">
        <form >
          <label>
            HPT:
            <input type="text" 
            
            required 
            value = {buffHPT}
            onChange = {(e) => setbuffHPT(e.target.value)}
            name="HPT" />
          </label>
          <input onClick = {handleSubmit} type="button" value="Submit" />
         
        </form>
      <br />
      
        <div>
            {showResults?<div>HPT Number is {HPT}</div>:null}
            {showResults?<Results hpt={HPT}/>:null} 
        </div>

        
      </div>
    );
  }


  const Results = (params) => (
    <div id="results" className="search-results">
    <br/>
      <CalcResults hpt = {params.hpt} />
    </div>
  )

  const CalcResults = (params) => {
      const [motorSupplier,setmotorSupplier] = useState(24)
      const [batterySupplier, setbatterySupplier] = useState(30)
      const totalCo2 = motorSupplier+batterySupplier

        return (
            <div>
                <br/>
                total Co2 Emission: {totalCo2}
                For HPT number: {params.hpt}
                
            </div>
        )
  }
  
  export default Input;