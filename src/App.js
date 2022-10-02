import './App.css';
import Input from './components/Input';
import Data from './components/Data';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div>
    <div className="App"    >
      <div>
        Enter HPT number:
      </div>
      <Input />
    </div>
    <BrowserRouter>
        <Routes>
          <Route path="/data" element={<Data />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;