import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import ConfigPage from "./ConfigPage";
import LandingPage from "./LandingPage";

function MainPages() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="config" element={<ConfigPage />} />
      </Routes>
    </div>
  );
}

export default MainPages;
