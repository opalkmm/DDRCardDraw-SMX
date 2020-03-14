import classNames from "classnames";
import { detectedLanguage } from "./utils";
import styles from "./footer.module.css";
import { AuthButton } from "./auth-button";
import { useState } from "react";
import { About } from "./about";
import { useTranslateFunc } from "./hooks/useTranslateFunc";
import {
  Navbar,
  NavbarGroup,
  Button,
  NavbarHeading,
  Alignment,
  Dialog
} from "@blueprintjs/core";

// note that month is zero-indexed for date constructor :)
const lastUpdate = new Date(2020, 1, 20);

export function Footer() {
  const { t } = useTranslateFunc();
  const [showAbout, updateShowAbout] = useState(false);

  return (
    <Navbar className={styles.footer}>
      <Dialog
        onClose={() => updateShowAbout(false)}
        isOpen={showAbout}
        title={t("about.header")}
      >
        <About />
      </Dialog>
      <NavbarGroup>
        <NavbarHeading>
          {t("lastUpdate", {
            date: new Intl.DateTimeFormat(detectedLanguage).format(lastUpdate)
          })}
        </NavbarHeading>
      </NavbarGroup>

      <NavbarGroup align={Alignment.RIGHT}>
        {/* <AuthButton />{" "} */}
        <Button onClick={() => updateShowAbout(true)}>{t("credits")}</Button>
      </NavbarGroup>
    </Navbar>
  );
}
