import cn from "classnames";
import {
  Navbar,
  NavbarDivider,
  NavbarHeading,
  NavbarGroup,
  Classes,
  Alignment,
  Icon,
  ButtonGroup
} from "@blueprintjs/core";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SongSearch } from "./song-search";
import { VersionSelect } from "./version-select";

const minButton = cn(Classes.BUTTON);

export function Header() {
  const match = useRouteMatch<{ dataSet: string }>("/:dataSet");
  if (!match) {
    return null;
  }
  return (
    <Navbar id="HeaderNav" style={{ position: "sticky", top: 0 }}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <VersionSelect />
        </NavbarHeading>
        <NavbarDivider />
        <ButtonGroup minimal>
          <NavLink
            to={`/${match.params.dataSet}`}
            activeClassName={Classes.ACTIVE}
            exact
            className={minButton}
          >
            Browse
          </NavLink>
          <NavLink
            to={`/${match.params.dataSet}/draw`}
            activeClassName={Classes.ACTIVE}
            className={minButton}
          >
            Draw Songs
          </NavLink>
        </ButtonGroup>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <SongSearch />
      </NavbarGroup>
    </Navbar>
  );
}
