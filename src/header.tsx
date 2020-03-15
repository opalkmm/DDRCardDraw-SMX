import { Navbar, Button, Menu, Popover, Intent } from "@blueprintjs/core";
import { VersionSelect } from "./version-select";
import { IconNames } from "@blueprintjs/icons";
import { FormattedMessage } from "react-intl";
import { ThemeToggle } from "./theme-toggle";
import { LastUpdate } from "./last-update";
import { useContext } from "react";
import { DrawStateContext } from "./draw-state";
import { Route } from "react-router-dom";
import { DrawControls } from "./controls";

export function Header() {
  const { dataSetName } = useContext(DrawStateContext);

  const menu = (
    <Menu>
      <Menu.Item
        href={`#/${dataSetName}`}
        icon={IconNames.HOME}
        text={<FormattedMessage id="home" defaultMessage="Home" />}
      />
      <Menu.Item
        href={`#/${dataSetName}/draw`}
        icon={IconNames.PROJECTS}
        text={<FormattedMessage id="cardDraw" defaultMessage="Card Draw" />}
      />
      <Menu.Item
        href="#/credits"
        icon={IconNames.ID_NUMBER}
        text={<FormattedMessage id="credits" />}
      />
      <Menu.Divider />
      <ThemeToggle />
      <VersionSelect />
      <LastUpdate />
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
      <Navbar.Group>
        <Popover hasBackdrop={false} content={menu} autoFocus={false}>
          <Button icon={IconNames.MENU} />
        </Popover>
      </Navbar.Group>
      <Navbar.Group>
        <Route exact path="/:dataSet/draw">
          <DrawControls />
        </Route>
      </Navbar.Group>
    </Navbar>
  );
}
