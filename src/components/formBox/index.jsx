import React from "react";
import {
  FormContainer,
  FormLabel,
  FormEntryContainer,
  FormInput,
  LoginContainer,
  LoginTitle,
  SubmitButton,
} from "./style";

function CustomForm(props) {
  return (
    <LoginContainer>
      <LoginTitle>{props.title}</LoginTitle>
      <FormContainer onSubmit={props.submitFunction} autoComplete={"off"}>
        {props.formData.map((data) => {
          return (
            <FormEntryContainer>
              <FormLabel>{data.label}</FormLabel>
              <FormInput name={data.name} type={data.type}></FormInput>
            </FormEntryContainer>
          );
        })}
        {props.children}
        <SubmitButton type="input">{props.buttonText}</SubmitButton>
      </FormContainer>
    </LoginContainer>
  );
}

export default CustomForm;
