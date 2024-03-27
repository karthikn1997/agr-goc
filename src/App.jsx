import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Info from "./components/info";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;