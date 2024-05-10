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
import { IMAGE_URL, LOGO_URL, TESTING_MODE } from "../config";

function QrScannerPage() {

  let audioFileNames = []
  function importAllAudio(r) {
    let audio = {};
    r.keys().map((item, index) => {
      audio[item.replace('./', '')] = r(item);
      audioFileNames.push(item.replace('./', ''))
    });
    return audio;
  }
  let effectFileNames = []
  function importAllEffect(r) {
    let audio = {};
    r.keys().map((item, index) => {
      audio[item.replace('./', '')] = r(item);
      effectFileNames.push(item.replace('./', ''))
    });
    return audio;
  }
  const audioFiles = importAllAudio(require.context('./../audio', false, /\.(mp3)$/));
  const effectFiles = importAllEffect(require.context('./../effects', false, /\.(mp3)$/));

  let audio = []
  audioFileNames.forEach((audioFileName, index) => {
    audio[index] = new Audio(audioFiles[audioFileName])
  })

  let effect = []
  effectFileNames.forEach((effectFileName, index) => {
    effect[index] = new Audio(effectFiles[effectFileName])
  })
  console.log(effectFileNames)
  const navigate = useNavigate();
  useEffect(() => {
    audio.forEach((audioElement) => {
      audioElement.load()
    })
    effect.forEach((audioElement) => {
      audioElement.load()
    })
    const password = localStorage.getItem("pass");
    if (!password && !TESTING_MODE) {
      navigate("/config");
    }
    setInterval(function(){
      effect[Math.floor(Math.random() * (effect.length - 1))].play();
    }, 1000*60*10)
    // eslint-disable-next-line
  }, []);
  //Math.floor(Math.random() * (effect.length - 1))

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
      audio[Math.floor(Math.random() * (audio.length - 1))].play();
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
          <div><img src={LOGO_URL} alt="" height="200"/></div>
          
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
