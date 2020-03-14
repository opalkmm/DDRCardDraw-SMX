import { useEffect } from "react";
import { useTranslateFunc } from "./hooks/useTranslateFunc";

interface Props {
  confirmUnload: boolean;
}

export function UnloadHandler(props: Props) {
  const { t } = useTranslateFunc();
  const confirmText = t("confirmClose");

  function handleUnload(e: BeforeUnloadEvent) {
    if (props.confirmUnload) {
      e.returnValue = confirmText;
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [props.confirmUnload, confirmText]);

  return null;
}
