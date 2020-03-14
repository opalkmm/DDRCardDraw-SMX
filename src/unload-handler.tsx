import { useContext, useEffect } from "react";
import { useIntl } from "react-intl";

interface Props {
  confirmUnload: boolean;
}

export function UnloadHandler(props: Props) {
  const { formatMessage: t } = useIntl();
  const confirmText = t({ id: "confirmClose" });

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
