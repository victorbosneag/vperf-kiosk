import styled from "styled-components";
import { Link } from "react-router-dom";
export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendedNavbar ? "100vh": "80px")};
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  

`;

export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
  
`;
export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  padding-left: 50px;
  
`;
export const NavbarLinkContainer = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: red;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 20px;
  
  
`;
export const NavbarLinkExtended = styled(Link)`
  color: red;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 20px;
  
  
`;



export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;


export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 700px){
    display: none;
  }
`;

export const NavbarAccountContainer = styled.div`
   @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarAccountExtended = styled.div`
  @media (min-width: 700px){
    display: none;
  }
`;

export const DropdownLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LinkContainer = styled.div`
  display:flex;
  flex-direction:${(props)=>(props.extendedNavbar ? "column": "row")};
  align-items: center;
`;

