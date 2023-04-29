import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import LandingPage from "./LandingPage";

function MainPages() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default MainPages;
