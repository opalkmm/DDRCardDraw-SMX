import { useContext, memo } from "react";
import { DrawnSet } from "./drawn-set";
import { DrawStateContext } from "./draw-state";

export const DrawingList = memo(() => {
  const { drawings } = useContext(DrawStateContext);
  return (
    <>
      {drawings.map(d => (
        <DrawnSet key={d.id} drawing={d} />
      ))}
    </>
  );
});
