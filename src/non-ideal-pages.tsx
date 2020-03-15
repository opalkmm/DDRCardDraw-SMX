import { NonIdealState, Card, Spinner } from "@blueprintjs/core";
import { FormattedMessage } from "react-intl";
import styles from "./not-found-page.module.css";

interface Props {
  action?: JSX.Element;
}

export function NotFoundPage(props: Props) {
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
      action={props.action}
    />
  );
}

export function LoadingGameData() {
  return (
    <NonIdealState
      icon={<Spinner />}
      title={
        <FormattedMessage
          id="songs.loading"
          defaultMessage="Loading game data"
        />
      }
    />
  );
}
