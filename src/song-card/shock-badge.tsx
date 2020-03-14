import styles from "./shock-badge.module.css";
import { useTranslateFunc } from "../hooks/useTranslateFunc";
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export function ShockBadge() {
  const { t } = useTranslateFunc();
  return (
    <div className={styles.shockBadge}>
      <Icon icon={IconNames.OFFLINE} title={t("shockArrows")} iconSize={12} />
    </div>
  );
}
