import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
`;
export const LoginTitle = styled.div`
  font-size: xx-large;
  color: green;
  margin: 35px;
`;

export const FormContainer = styled.form`
  min-width: 400px;
  //height: 600 px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border-style: solid;
  border-color: red;
  overflow: hidden;
  align-items: center;
`;

export const FormLabel = styled.label`
  color: blue;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 30px;
  max-width: 300px;
  border-style: solid;
  border-color: green;
  border-width: 2px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

export const FormEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  margin: 10px;
`;

export const  SubmitButton = styled.button`
  width: 50%;
  height: 35px;
  background-color:green;
  border-radius:10px;
  margin:5px;
  border-style:style;
  border-width:2px;
  border-color:black;
  font-size:medium;
  color: white;
`;