import { useIntl } from "react-intl";
import { useCallback } from "react";

type PrimitiveType = string | number | Date | boolean | undefined | null;

export function useTranslateFunc() {
  const { formatMessage } = useIntl();
  const t = useCallback(
    (id: string, values?: Record<string, PrimitiveType>) => {
      return formatMessage({ id }, values);
    },
    [formatMessage]
  );
  return { t };
}
