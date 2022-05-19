import { GameData } from "./models/SongData";
import { useEffect, useContext } from "react";
import { ConfigStateContext } from "./config-state";

interface Props {
  defaults?: GameData["defaults"];
}

export function ApplyDefaultConfig({ defaults }: Props) {
  const { update } = useContext(ConfigStateContext);
  useEffect(() => {
    if (!defaults) {
      return;
    }

    update((config) => {
      const {
        lowerLvlBound,
        upperLvlBound,
        flags,
        difficulties,
        style,
        chartCount,
        useWeights,
        weights,
      } = defaults;
      return {
        ...config,
        chartCount: chartCount || config.chartCount,
        lowerBound: lowerLvlBound,
        upperBound: upperLvlBound,
        flags: new Set(flags),
        difficulties: new Set(difficulties),
        style,
        useWeights,
        weights
      };
    });
  }, [defaults, update]);
  return null;
}
