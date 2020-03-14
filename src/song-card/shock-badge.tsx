import { useIntl } from "react-intl";
import { Zap } from "preact-feather";
import { useContext } from "react";
import styles from "./shock-badge.module.css";

export function ShockBadge() {
  const { formatMessage: t } = useIntl();
  return (
    <div className={styles.shockBadge} title={t({ id: "shockArrows" })}>
      <Zap size={12} aria-hidden color="black" fill="yellow" stroke-width="1" />
    </div>
  );
}
