import { FunctionComponent, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./icon";
import { IconNames } from "@blueprintjs/icons";
import styles from "./modal.module.css";

const modalRoot = document.createElement("div");
// modalRoot.className = styles.modalRoot;
document.body.appendChild(modalRoot);

interface Props {
  onClose?: () => void;
}

export const Modal: FunctionComponent<Props> = ({ children, onClose }) => {
  useLayoutEffect(() => {
    function escapeHandler(e: KeyboardEvent) {
      if (e.keyCode === 27 && !e.defaultPrevented && onClose) {
        onClose();
      }
    }

    document.addEventListener("keyup", escapeHandler);
    return () => {
      document.removeEventListener("keyup", escapeHandler);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContents}>
        {onClose && (
          <div className={styles.close} onClick={onClose}>
            <Icon icon={IconNames.CROSS} title="Close" />
          </div>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};
