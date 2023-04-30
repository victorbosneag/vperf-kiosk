import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import {
  AnswerArange,
  AnswerContainer,
  ButtonContainer,
  FormGroup,
  Header,
  PageContainer,
  StyledButton,
  StyledForm,
  StyledLabel,
} from "./QRScanner.style";
import Select from "react-dropdown-select";
import { digitOptions, problemOptions } from "./QRScanner.config";
import { submitAnswer } from "../api/submitAnswer.api";
import { useNavigate } from "react-router-dom";

function QrScannerPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    const password = localStorage.getItem("pass");
    if(!password){
      navigate("/config");
    }
  },[])
  const previewStyle = {
    height: 240,
    width: 320,
  }
  const [team, setTeam] = useState({id:100, name:"NOQR"});
  let problem = { value: 100 };
  let answer = [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }];
  const setNewTeam = (teamName) => {
    if (teamName !== team) {
      setTeam(teamName);
    }
  };
  const handleScan = (data) => {
    if (data) {
      const scannedTeamName = data.text;
      console.log(scannedTeamName);
      try {
        const teamObject = JSON.parse(scannedTeamName);
        if (!teamObject.id) {
          setNewTeam({id:100, name:"INVALIDQR"});
        } else {
          setNewTeam({id: teamObject.id, name:teamObject.name});
        }
      } catch (err) {
        setNewTeam({id:100, name:"INVALIDQR"});
      }
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  const handleSubmit = async (event) => {
    if(problem.value<1&&problem.value>20){
      alert("Problema data nu exista");
      window.location.reload();
    }
    const answerValue = answer.map((element)=>{
      return ''+element.value;
    }).join('');

    console.log(answerValue)
    const password = localStorage.getItem("pass")
    const response = await submitAnswer(password, team.id, problem.value-1, answerValue);
    if(response){
      alert("Solutie inregistrata!");
    }
    else{
      alert("Eroare!");
    }
    window.location.reload();
  };
  const preventDefault = (event) => {
    event.preventDefault();
  };
  const handleChangeFactory = (field) => {
    return (event) => {
      field.value = event[0].value;
    };
  };
  const handleClear = (event) => {
    window.location.reload();
  };
  const handleProblemChange = handleChangeFactory(problem);
  const handleAns1Change = handleChangeFactory(answer[0]);
  const handleAns2Change = handleChangeFactory(answer[1]);
  const handleAns3Change = handleChangeFactory(answer[2]);
  const handleAns4Change = handleChangeFactory(answer[3]);
  return (
    <div>
      <Header />
      <PageContainer>
        <QrScanner style={previewStyle} delay={10000} onError={handleError} onScan={handleScan}/>

        <h1>
          {team.name === "NOQR"
            ? "Niciun QR scanat"
            : team.name === "INVALIDQR"
            ? "QR invalid! Incercati din nou"
            : team.name}
        </h1>

        <StyledForm onSubmit={preventDefault}>
          <input type={"hidden"} value={team.id} name={"team"} />
          <FormGroup>
            <StyledLabel>Problema:</StyledLabel>
            <Select onChange={handleProblemChange} options={problemOptions} />
          </FormGroup>
          <FormGroup>
            <StyledLabel>Raspuns:</StyledLabel>
            <AnswerArange>
              <AnswerContainer>
                <Select onChange={handleAns1Change} options={digitOptions} />
              </AnswerContainer>
              <AnswerContainer>
                <Select onChange={handleAns2Change} options={digitOptions} />
              </AnswerContainer>
              <AnswerContainer>
                <Select onChange={handleAns3Change} options={digitOptions} />
              </AnswerContainer>
              <AnswerContainer>
                <Select onChange={handleAns4Change} options={digitOptions} />
              </AnswerContainer>
            </AnswerArange>
          </FormGroup>

          <ButtonContainer>
            <StyledButton type="input" onClick={handleSubmit}>
              Submit
            </StyledButton>
            <StyledButton type="input" onClick={handleClear}>
              Clear
            </StyledButton>
          </ButtonContainer>
        </StyledForm>
      </PageContainer>
    </div>
  );
}

export default QrScannerPage;
