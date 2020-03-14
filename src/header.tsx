import cn from "classnames";
import {
  Navbar,
  NavbarDivider,
  NavbarHeading,
  NavbarGroup,
  Classes,
  Alignment,
  Icon,
  ButtonGroup,
  Tooltip
} from "@blueprintjs/core";
import { NavLink, useRouteMatch } from "react-router-dom";
import { SongSearch } from "./song-search";
import { VersionSelect } from "./version-select";
import { IconNames } from "@blueprintjs/icons";

const minButton = cn(Classes.BUTTON);

export function Header() {
  const match = useRouteMatch<{ dataSet: string }>("/:dataSet");
  if (!match) {
    return null;
  }
  return (
    <Navbar
      id="HeaderNav"
      style={{
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <NavbarGroup align={Alignment.CENTER}>
        <VersionSelect />{" "}
        <ButtonGroup minimal>
          <Tooltip content="Home">
            <NavLink
              to={`/${match.params.dataSet}`}
              activeClassName={Classes.ACTIVE}
              exact
              className={minButton}
            >
              <Icon icon={IconNames.HOME} />
            </NavLink>
          </Tooltip>{" "}
          <Tooltip content="Card Draw">
            <NavLink
              to={`/${match.params.dataSet}/draw`}
              activeClassName={Classes.ACTIVE}
              className={minButton}
            >
              <Icon icon={IconNames.LAYERS} />
            </NavLink>
          </Tooltip>
        </ButtonGroup>
      </NavbarGroup>
      <NavbarGroup align={Alignment.CENTER}>
        <SongSearch />
      </NavbarGroup>
    </Navbar>
  );
}
