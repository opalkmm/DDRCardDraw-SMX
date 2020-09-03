import { Navbar, Button, Menu, Drawer, Position } from "@blueprintjs/core";
import { VersionSelect } from "./version-select";
import { IconNames } from "@blueprintjs/icons";
import { FormattedMessage } from "react-intl";
import { ThemeToggle } from "./theme-toggle";
import { LastUpdate } from "./last-update";
import { Route } from "react-router-dom";
import { DrawControls } from "./controls";
import { useDataSets } from "./hooks/useDataSets";
import { useState } from "react";

import styles from "./header.module.css";

function hasAnchorAncestor(e: HTMLElement): boolean {
  if (e.tagName === "A") {
    return true;
  }
  if (!e.parentElement) {
    return false;
  }
  return hasAnchorAncestor(e.parentElement);
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { current } = useDataSets();

  function toggleMenu() {
    setMenuOpen((isOpen) => !isOpen);
  }

  function maybeCloseMenu(e: React.MouseEvent<HTMLUListElement>) {
    hasAnchorAncestor(e.target as HTMLElement) && setMenuOpen(false);
  }

  const menu = (
    <div className={styles.menuContainer}>
      <Menu onClickCapture={maybeCloseMenu}>
        <Menu.Item
          href={`#/${current.name}`}
          icon={IconNames.HOME}
          text={<FormattedMessage id="home" defaultMessage="Home" />}
        />
        <Menu.Item
          href={`#/${current.name}/draw`}
          icon={IconNames.PROJECTS}
          text={<FormattedMessage id="cardDraw" defaultMessage="Card Draw" />}
        />
        <Menu.Item
          href={`#/${current.name}/credits`}
          icon={IconNames.ID_NUMBER}
          text={<FormattedMessage id="credits" />}
        />
        <ThemeToggle />
        <VersionSelect />
      </Menu>
      <LastUpdate />
    </div>
  );

  return (
    <Navbar
      id="HeaderNav"
      style={{
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Drawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        position={Position.LEFT}
        size="auto"
      >
        {menu}
      </Drawer>
      <Navbar.Group>
        <Button icon={IconNames.MENU} onClick={toggleMenu} />
        <Navbar.Divider />
        {current.display}
      </Navbar.Group>
      <Navbar.Group>
        <Route exact path="/:dataSet/draw">
          <DrawControls />
        </Route>
      </Navbar.Group>
    </Navbar>
  );
}
