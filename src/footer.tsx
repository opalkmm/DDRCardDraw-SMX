import classNames from "classnames";
import { detectedLanguage } from "./utils";
import styles from "./footer.module.css";
import globalStyles from "./app.module.css";
import { AuthButton } from "./auth-button";
import { useState } from "react";
import { About } from "./about";
import { useTranslateFunc } from "./hooks/useTranslateFunc";

// note that month is zero-indexed for date constructor :)
const lastUpdate = new Date(2020, 1, 20);

export function Footer() {
  const { t } = useTranslateFunc();
  const [showAbout, updateShowAbout] = useState(false);

  return (
    <footer className={classNames(styles.footer, globalStyles.padded)}>
      {showAbout && <About onClose={() => updateShowAbout(false)} />}
      <div>
        {t("lastUpdate", {
          date: new Intl.DateTimeFormat(detectedLanguage).format(lastUpdate)
        })}
      </div>
      <div className={styles.icons}>
        {/* <AuthButton />{" "} */}
        <a href="#" onClick={e => (e.preventDefault(), updateShowAbout(true))}>
          {t("credits")}
        </a>
      </div>
    </footer>
  );
}
