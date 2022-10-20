// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import Battery from './pages/Battery';
import BatteryComponent from './pages/BatteryComponent';
import MotorComponent from './pages/MotorComponent';
import AdminComponent from './pages/AdminComponent';
import SeaTransportComponent from './pages/SeaTransportComponent';
<<<<<<< HEAD
import GroundTransportComponent from './pages/GroundTransportComponent';

=======
import History from './pages/History';
>>>>>>> b657d1ecc4cdb2cdd7ba19ec1172d88a6985680d
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/battery-supplier" element={<BatteryComponent/>}/>
      <Route path="/motor-supplier" element={<MotorComponent/>}/>
      <Route path="/sea-transport" element={<SeaTransportComponent/>}/>
      <Route path="/ground-transport" element={<GroundTransportComponent/>}/>
      <Route path="/admin" element={<AdminComponent />}/>
      <Route path="/history" element={<History />}/>
      {/* <Route path="/battery" element={<Battery />}/> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
