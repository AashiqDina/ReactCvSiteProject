import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "../Home/Home";
import Projects from '../Projects/Projects'
import Skills from '../Skills/Skills'
import Education from '../Education/Education';
import Experience from '../Experience/Experience';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Projects" element={<Projects/>}/>
            <Route path="/Skills" element={<Skills/>}/>
            <Route path="/Education" element={<Education/>}/>
            <Route path="/Experience" element={<Experience/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
