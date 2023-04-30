import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DelConfigPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.removeItem('pass');
    navigate("/config");
  },[])
  return <div>Config sters!</div>;
}

export default DelConfigPage;
