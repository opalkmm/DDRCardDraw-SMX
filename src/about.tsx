import { useTranslateFunc } from "./hooks/useTranslateFunc";
import { AnchorButton, ButtonGroup, UL } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export function About() {
  const { t } = useTranslateFunc();

  return (
    <div style={{ padding: "0 1.5em" }}>
      <p>
        <UL>
          {t("about")
            .split(" * ")
            .map((line, i) => (
              <li key={i}>{line}</li>
            ))}
        </UL>
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
  );
}
