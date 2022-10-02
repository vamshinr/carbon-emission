import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Input from './components/Input';
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;