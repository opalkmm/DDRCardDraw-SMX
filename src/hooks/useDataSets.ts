import { useContext } from "react";
import { DrawStateContext } from "../draw-state";

export function useDataSets() {
  const { dataSetName } = useContext(DrawStateContext);
  const available = (process.env.DATA_FILES as unknown) as Array<{
    name: string;
    display: string;
  }>;
  const current = available.find((s) => s.name === dataSetName)!;
  return { available, current };
}
