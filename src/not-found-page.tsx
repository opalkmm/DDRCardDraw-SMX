import { NonIdealState, Card } from "@blueprintjs/core";
import { FormattedMessage } from "react-intl";
import styles from "./not-found-page.module.css";

export function NotFoundPage() {
  return (
    <NonIdealState
      description={
        <Card className={styles.notFoundCard}>
          <h1 className={styles.notFoundHeader}>
            404
            <br />
            DEAD END
          </h1>
          <div>
            <FormattedMessage
              id="not-found.desc"
              defaultMessage="You have found a place that doesn't exist."
            />
          </div>
        </Card>
      }
    />
  );
}
