import { useMemo, useContext } from "react";
import styles from "./controls-weights.module.css";
import { times } from "../utils";
import { useIntl } from "react-intl";
import { ConfigStateContext } from "../config-state";
import { NumericInput, Switch, Checkbox } from "@blueprintjs/core";

interface Props {
  high: number;
  low: number;
}

export function WeightsControls({ high, low }: Props) {
  const { formatMessage: t } = useIntl();
  const { weights, update, forceDistribution } = useContext(ConfigStateContext);
  const levels = useMemo(() => times(high - low + 1, n => n + low - 1), [
    high,
    low
  ]);

  function toggleForceDistribution() {
    update(state => {
      return {
        ...state,
        forceDistribution: !state.forceDistribution
      };
    });
  }

  function setWeight(difficulty: number, value: number) {
    update(state => {
      const newWeights = state.weights.slice();
      if (Number.isInteger(value)) {
        newWeights[difficulty] = value;
      } else {
        delete newWeights[difficulty];
      }
      return { ...state, weights: newWeights };
    });
  }

  const totalWeight = levels.reduce(
    (total, level) => total + (weights[level] || 0),
    0
  );
  const percentages = levels.map(level => {
    const value = weights[level] || 0;
    return value ? ((100 * value) / totalWeight).toFixed(0) : 0;
  });

  return (
    <section className={styles.weights}>
      <p>{t({ id: "weights.explanation" })}</p>
      {levels.map((level, i) => (
        <div className={styles.level} key={level}>
          <NumericInput
            width={2}
            value={weights[level] || ""}
            min={0}
            onValueChange={v => setWeight(level, v)}
            placeholder="0"
            fill
          />
          {level} <sub>{percentages[i]}%</sub>
        </div>
      ))}
      <Checkbox
        label={t({ id: "weights.check.label" })}
        title={t({ id: "weights.check.title" })}
        checked={forceDistribution}
        onChange={toggleForceDistribution}
      />
    </section>
  );
}
