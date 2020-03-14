import { useContext, memo } from "react";
import { DrawnSet } from "./drawn-set";
import styles from "./drawing-list.module.css";
import { DrawStateContext } from "./draw-state";
import { Drawing } from "./models/Drawing";

const renderDrawing = (drawing: Drawing) => (
  <DrawnSet key={drawing.id} drawing={drawing} />
);

function renderScrollableDrawings(drawings: Drawing[]) {
  return <div className={styles.scrollable}>{drawings.map(renderDrawing)}</div>;
}

export const DrawingList = memo(() => {
  const { drawings } = useContext(DrawStateContext);
  return renderScrollableDrawings(drawings);
});
