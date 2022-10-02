import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Input from './components/Input';
import Login from './components/Login';
import NavScrollExample from './components/navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div>
      <NavScrollExample />
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