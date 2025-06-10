import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'
import Education from './Education/Education';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Projects" element={<Projects/>}/>
            <Route path="/Skills" element={<Skills/>}/>
            <Route path="/Education" element={<Education/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
