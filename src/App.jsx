// app.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/pages/HomePage";
import Logo from "./logo.png";
import "./App.css";
import AppRoutes from "./Routes.js";
import Footer from './components/footer';



const App = () => {
  return (
    <Router>
      <div>
        <div className="logo-container">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          
          <Route path="/*" element={<AppRoutes />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
