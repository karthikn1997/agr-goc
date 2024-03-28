import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Info from "./components/info";
import Register from "./components/register";
import KYCForm from "./components/kyc";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kyc" element={<KYCForm />} />
      </Routes>
    </Router>
  );
}

export default App;
