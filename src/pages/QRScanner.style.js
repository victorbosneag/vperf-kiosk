import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 80px);
  width: 100%;
  background-image: url("http://localhost:3000/wall.png")
`;

export const Header = styled.nav`
  width: 100%;
  height: 80px;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: left;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  padding: 20px;
  padding-left: 0px;
`;

export const StyledButton = styled.button`
  display: flex;
  border-radius: 15px;
  width: 130px;
  height: 50px;
  text-align: center;
  background-color: blue;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 40px;
  font-size: x-large;
`;

export const StyledLabel = styled.label`
  font-size: x-large;
  margin-bottom: 15px;
  color: blue;
`;

export const FormGroup = styled.div`
  margin: 20px;
`;

export const AnswerContainer = styled.div`
  display: flex;
  width: 100%
`;

export const AnswerArange = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%
`;

export const ScannerContainer = styled.div`
  display:flex;
  width:100%
  height:100px;
`;