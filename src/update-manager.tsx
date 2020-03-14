import * as OfflinePluginRuntime from "offline-plugin/runtime";
import { useState, useEffect } from "react";
import styles from "./update-manager.module.css";
import { useTranslateFunc } from "./hooks/useTranslateFunc";

export function UpdateManager() {
  const { t } = useTranslateFunc();
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
      return <p className={styles.updateBanner}>{t("updateLoading")}</p>;
    case "ready":
      return <p className={styles.updateBanner}>{t("updateReady")}</p>;
    default:
      return null;
  }
}
