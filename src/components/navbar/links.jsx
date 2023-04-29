import React from "react";
import { LinkContainer, NavbarLink } from "./style";
function NavbarLinks(props) {
  return (
    
    <LinkContainer extendedNavbar={props.extended}>
      <NavbarLink to="/">Acasa</NavbarLink>
      <NavbarLink to="/config">Configurare</NavbarLink>
      <NavbarLink to="/delconfig">Stergere configurare</NavbarLink>
      <NavbarLink to="/scan">Scanare</NavbarLink>
    </LinkContainer>
  );
}

export default NavbarLinks;
