import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import "./App.css";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
