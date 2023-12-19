// import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomeSite from "./components/Site-Home";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TBD from "./components/TBD";
import Contacts from "./components/Contacts";
import NoPage from "./components/No-Page";
import BreachedData from "./components/BreachedData";
import Accounts from "./components/Accounts";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeSite/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/tbd" element={<TBD/>}/>
          <Route path="/tech-contacts" element={<Contacts/>}/>
          <Route path="/breached-data" element={<BreachedData/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
