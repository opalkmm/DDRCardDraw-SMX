import {
  Navbar,
  NavbarGroup,
  Button,
  Position,
  Menu,
  Popover
} from "@blueprintjs/core";
import { useRouteMatch } from "react-router-dom";
import { SongSearch } from "./song-search";
import { VersionSelect } from "./version-select";
import { IconNames } from "@blueprintjs/icons";
import { FormattedMessage } from "react-intl";

export function Header() {
  const match = useRouteMatch<{ dataSet: string }>("/:dataSet");

  if (!match) {
    return null;
  }

  const menu = (
    <Menu>
      <Menu.Item
        href={`#/${match.params.dataSet}`}
        icon={IconNames.HOME}
        text="Home"
      />
      <Menu.Item
        href={`#/${match.params.dataSet}/draw`}
        icon={IconNames.LAYERS}
        text="Card Draw"
      />
      <Menu.Item
        href="#/credits"
        icon={IconNames.HELP}
        text={<FormattedMessage id="credits" />}
      />
      <Menu.Divider />
      <VersionSelect />
    </Menu>
  );

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
      <NavbarGroup>
        <Popover
          hasBackdrop={false}
          position={Position.LEFT}
          content={menu}
          autoFocus={false}
        >
          <Button icon={IconNames.MENU} />
        </Popover>
      </NavbarGroup>
      <NavbarGroup>
        <SongSearch />
      </NavbarGroup>
    </Navbar>
  );
}
