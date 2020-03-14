import { Navbar, Classes } from "@blueprintjs/core";
import { NavLink, useParams } from "react-router-dom";

export function Header() {
  const params = useParams<{ dataSet: string }>();
  if (!params.dataSet) {
    return null;
  }
  return (
    <Navbar id="HeaderNav">
      <NavLink to={`/${params.dataSet}`} className={Classes.BUTTON}>
        Browse
      </NavLink>

      <NavLink to={`/${params.dataSet}/draw`} className={Classes.BUTTON}>
        Draw Songs
      </NavLink>
    </Navbar>
  );
}
