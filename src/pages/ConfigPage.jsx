import React from 'react'
import { authCheck } from '../api/authCheck.api';
import CustomForm from '../components/formBox'
import formData from './ConfigPage.config';

function ConfigPage() {
  const handleSubmit = async(event)=>{
    event.preventDefault()
    const data = new FormData(event.target);
    let value = Object.fromEntries(data.entries());
    const response = await authCheck(value["adminPass"]);
    if(response){
      localStorage.setItem('pass', value["adminPass"])
    }
    else{
      alert("Parola introdusa nu este corecta!")
    }
  }
  return (
    <CustomForm formData={formData} title={"Test"} submitFunction={handleSubmit} buttonText={"Test"}/>
  )
}

export default ConfigPage