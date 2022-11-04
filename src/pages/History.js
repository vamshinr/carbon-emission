import React from "react";
import NavbarApp from "../pages/NavbarApp";
import FooterApp from './FooterApp';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto'
Chart.register(CategoryScale);

// import "./styles.css";
const data1= ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const data2 = [33, 53, 85, 41, 44, 65]
const label = "Battery Co2"

const data = {
  labels: data1,
  datasets: [
    {
      label: label,
      data: data2,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    
  ]
};

export default function History() {
  return (
    <>
        <NavbarApp></NavbarApp>
        <div className="hpt-body" style={{ backgroundColor:'#d8d2b8'}}>
      <div className="History" style={{ backgroundColor:'#d8d2b8'}}>
      
        <Line data={data} />
      </div>
      </div>
      <FooterApp></FooterApp>
        </>
  );
}
