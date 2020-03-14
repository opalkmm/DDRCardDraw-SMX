import { Modal } from "./modal";
import styles from "./about.module.css";
import { useTranslateFunc } from "./hooks/useTranslateFunc";
import { AnchorButton, ButtonGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

interface Props {
  onClose: () => void;
}

export function About({ onClose }: Props) {
  const { t } = useTranslateFunc();

  return (
    <Modal onClose={onClose}>
      <div className={styles.about}>
        <p>
          <ul>
            {t("about")
              .split(" * ")
              .map((line, i) => (
                <li key={i}>{line}</li>
              ))}
          </ul>
        </p>
        <p>{t("contact.prompt")}</p>
        <ButtonGroup vertical>
          <AnchorButton
            href="https://m.me/noah.manneschmidt"
            target="_blank"
            text={t("contact.facebook")}
            rightIcon={IconNames.SHARE}
          />
          <AnchorButton
            href="https://twitter.com/Cathadan"
            target="_blank"
            text={t("contact.twitter")}
            rightIcon={IconNames.SHARE}
          />
          <AnchorButton
            href="https://github.com/noahm/DDRCardDraw"
            target="_blank"
            text={t("contact.github")}
            rightIcon={IconNames.SHARE}
          />
        </ButtonGroup>
      </div>
    </Modal>
  );
}
