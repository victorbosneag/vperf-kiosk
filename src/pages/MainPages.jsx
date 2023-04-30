import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import ConfigPage from "./ConfigPage";
import DelConfigPage from "./DelConfigPage";
import LandingPage from "./LandingPage";

function MainPages() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="delconfig" element={<DelConfigPage />} />
      </Routes>
    </div>
  );
}

export default MainPages;
