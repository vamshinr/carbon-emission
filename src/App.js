// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Battery from './pages/Battery';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/battery" element={<Battery />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
