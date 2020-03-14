import classNames from "classnames";
import styles from "./card-label.module.css";
import { PropsWithChildren } from "react";

interface Props {
  left?: boolean;
}

export function CardLabel({ children, left }: PropsWithChildren<Props>) {
  const c = classNames(styles.cardLabel, {
    [styles.left]: left
  });
  return (
    <div className={c}>
      <span>{children}</span>
    </div>
  );
}
