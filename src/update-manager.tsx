import * as OfflinePluginRuntime from "offline-plugin/runtime";
import { useState, useEffect, useContext } from "react";
import styles from "./update-manager.module.css";
import { useIntl } from "react-intl";

export function UpdateManager() {
  const { formatMessage: t } = useIntl();
  const [updateStatus, setStatus] = useState<null | "loading" | "ready">(null);
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      OfflinePluginRuntime.install({
        onUpdateReady() {
          OfflinePluginRuntime.applyUpdate();
          setStatus("loading");
        },
        onUpdated: () => {
          setStatus("ready");
        }
      });
    }
  }, []);

  switch (updateStatus) {
    case "loading":
      return (
        <p className={styles.updateBanner}>{t({ id: "updateLoading" })}</p>
      );
    case "ready":
      return <p className={styles.updateBanner}>{t({ id: "updateReady" })}</p>;
    default:
      return null;
  }
}
