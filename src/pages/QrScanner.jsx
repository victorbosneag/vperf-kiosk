import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import {
  AnswerArange,
  AnswerContainer,
  BackgroundContainer,
  ButtonContainer,
  CustomSelect,
  FormGroup,
  Header,
  PageContainer,
  ScannerWrapper,
  StyledButton,
  StyledForm,
  StyledLabel,
  TeamName,
} from "./QRScanner.style";
import { digitOptions, problemOptions } from "./QRScanner.config";
import { submitAnswer } from "../api/submitAnswer.api";
import { useNavigate } from "react-router-dom";
import beepFx from "./../beep_fx.mp3";
import { IMAGE_URL, LOGO_URL } from "../config";

function QrScannerPage() {
  //const beep = new UIfx({asset: beepFx})
  const beep = new Audio(beepFx);
  const navigate = useNavigate();
  useEffect(() => {
    beep.load();
    const password = localStorage.getItem("pass");
    if (!password) {
      navigate("/config");
    }
    // eslint-disable-next-line
  }, []);
  const previewStyle = {
    height: 240,
    width: 320,
  };
  const [team, setTeam] = useState({ id: 100, name: "NOQR" });
  let problem = { value: 100 };
  let answer = [{ value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }];
  const setNewTeam = (teamName) => {
    if (teamName.id !== team.id) {
      setTeam(teamName);
      beep.play();
      console.log([teamName, team]);
    }
  };

  const handleScan = (data) => {
    if (data) {
      const scannedTeamName = data.text;
      if (scannedTeamName === "CLEAR") {
        window.location.reload();
      }
      console.log(scannedTeamName);
      try {
        const teamObject = JSON.parse(scannedTeamName);
        if (!teamObject.id) {
          setNewTeam({ id: 101, name: "INVALIDQR" });
        } else {
          setNewTeam({ id: teamObject.id - 1, name: teamObject.name });
        }
      } catch (err) {
        setNewTeam({ id: 101, name: "INVALIDQR" });
      }
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  const handleSubmit = async (event) => {
    if (problem.value < 1 && problem.value > 20) {
      alert("Problema data nu exista");
      window.location.reload();
    }
    const answerValue = answer
      .map((element) => {
        return "" + element.value;
      })
      .join("");

    const password = localStorage.getItem("pass");
    const response = await submitAnswer(
      password,
      team.id,
      problem.value - 1,
      answerValue
    );
    if (response) {
      alert("Solutie inregistrata!");
    } else {
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
      <BackgroundContainer imageUrl={IMAGE_URL}>
        <Header>
          <div><img src={LOGO_URL} alt="" height="80"/></div>
          
        </Header>
        <PageContainer>
          <ScannerWrapper>
            <QrScanner
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          </ScannerWrapper>

          <TeamName>
            {team.name === "NOQR"
              ? "Niciun QR scanat"
              : team.name === "INVALIDQR"
              ? "QR invalid! Incercati din nou"
              : team.name}
          </TeamName>

          <PageData team={team} />
        </PageContainer>
      </BackgroundContainer>
    </div>
  );

  function PageData(props) {
    const [team, setTeam] = useState({ id: 100, name: "NOQR" });
    useEffect(() => {
      setTeam(props.team);
    }, [props.team]);
    return (
      <StyledForm onSubmit={preventDefault}>
        <input type={"hidden"} value={team.id} name={"team"} />
        <FormGroup>
          <StyledLabel>Problema:</StyledLabel>
          <CustomSelect
            onChange={handleProblemChange}
            options={problemOptions}
          />
        </FormGroup>
        <FormGroup>
          <StyledLabel>Raspuns:</StyledLabel>
          <AnswerArange>
            <AnswerContainer>
              <CustomSelect
                onChange={handleAns1Change}
                options={digitOptions}
              />
            </AnswerContainer>
            <AnswerContainer>
              <CustomSelect
                onChange={handleAns2Change}
                options={digitOptions}
              />
            </AnswerContainer>
            <AnswerContainer>
              <CustomSelect
                onChange={handleAns3Change}
                options={digitOptions}
              />
            </AnswerContainer>
            <AnswerContainer>
              <CustomSelect
                onChange={handleAns4Change}
                options={digitOptions}
              />
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
    );
  }
}

export default QrScannerPage;
