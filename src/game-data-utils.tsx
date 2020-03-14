import { useTranslateFunc } from "./hooks/useTranslateFunc";
import { FormattedMessage } from "react-intl";

export function MetaString({ field }: { field: string }) {
  const { t } = useTranslateFunc();
  return <FormattedMessage id={"meta." + field} />;
  // return <>{t()}</>;
}

interface AbbrProps {
  diffClass: string;
}

export function AbbrDifficulty({ diffClass }: AbbrProps) {
  const { t } = useTranslateFunc();
  return <>{t("meta.$abbr." + diffClass)}</>;
}
