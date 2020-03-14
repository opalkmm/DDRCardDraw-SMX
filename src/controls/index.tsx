import classNames from "classnames";
import { useContext, useRef, useState } from "react";
import globalStyles from "../app.module.css";
import { WeightsControls } from "./controls-weights";
import styles from "./controls.module.css";
import { DrawStateContext } from "../draw-state";
import { ConfigStateContext } from "../config-state";
import {
  HTMLSelect,
  FormGroup,
  NumericInput,
  Checkbox,
  Button
} from "@blueprintjs/core";
import { useTranslateFunc } from "../hooks/useTranslateFunc";
import { useHistory } from "react-router-dom";

function preventDefault(e: { preventDefault(): void }) {
  e.preventDefault();
}

export function Controls() {
  const form = useRef<HTMLFormElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslateFunc();
  const history = useHistory();
  const { drawSongs, dataSetName, lastDrawFailed, gameData } = useContext(
    DrawStateContext
  );
  const configState = useContext(ConfigStateContext);
  const {
    useWeights,
    lowerBound,
    upperBound,
    update: updateState,
    difficulties: selectedDifficulties,
    flags: selectedFlags,
    style: selectedStyle,
    chartCount
  } = configState;
  if (!gameData) {
    return null;
  }
  const { difficulties, flags, lvlMax, styles: gameStyles } = gameData.meta;

  const handleLowerBoundChange = (e: { currentTarget: HTMLInputElement }) => {
    const newValue = parseInt(e.currentTarget.value, 10);
    if (newValue > upperBound) {
      return;
    }
    updateState(state => {
      return {
        ...state,
        lowerBound: newValue
      };
    });
  };

  const handleUpperBoundChange = (e: { currentTarget: HTMLInputElement }) => {
    const newValue = parseInt(e.currentTarget.value, 10);
    if (newValue < lowerBound) {
      return;
    }
    updateState(state => {
      return {
        ...state,
        upperBound: newValue
      };
    });
  };

  const handleSongListChange = (v: string) => {
    history.push(`/${v}`);
  };

  const handleRandomize = (e: { preventDefault(): void }) => {
    e.preventDefault();
    drawSongs(configState);
  };

  return (
    <form
      ref={form}
      className={styles.form + (collapsed ? " " + styles.collapsed : "")}
      onSubmit={preventDefault}
    >
      <section className={styles.columns}>
        <div className={styles.column}>
          <FormGroup labelFor="dataSource" label={t("dataSource")}>
            <HTMLSelect
              id="dataSource"
              onChange={e => handleSongListChange(e.currentTarget.value)}
              value={dataSetName}
            >
              <option value="a20">A20</option>
              <option value="ace">Ace</option>
              <option value="extreme">Extreme</option>
              <option value="drs">DANCERUSH</option>
            </HTMLSelect>
          </FormGroup>
          <FormGroup labelFor="chartCount" label={t("chartCount")}>
            <NumericInput
              // type="number"
              id="chartCount"
              value={chartCount}
              min={1}
              onInput={e => {
                updateState(s => {
                  return { ...s, chartCount: +e.currentTarget.value };
                });
              }}
            />
          </FormGroup>
          <FormGroup label={t("difficultyLevel")}>
            <FormGroup labelFor="upperBound" label={t("upperBound")}>
              <NumericInput
                id="upperBound"
                onChange={handleUpperBoundChange}
                value={upperBound}
                min={lowerBound}
                max={lvlMax}
              />
            </FormGroup>
            <FormGroup labelFor="lowerBound" label={t("lowerBound")}>
              <NumericInput
                id="lowerBound"
                onChange={handleLowerBoundChange}
                value={lowerBound}
                min={1}
                max={upperBound}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Checkbox
              id="weighted"
              checked={useWeights}
              onChange={e =>
                updateState(state => ({
                  ...state,
                  useWeights: !!e.currentTarget.checked
                }))
              }
              label={t("useWeightedDistributions")}
            />
          </FormGroup>
        </div>
        <div className={styles.column}>
          <FormGroup labelFor="style" label={t("style")}>
            <HTMLSelect
              id="style"
              value={selectedStyle}
              onInput={e => {
                updateState(s => {
                  return { ...s, style: e.currentTarget.value };
                });
              }}
            >
              {gameStyles.map(style => (
                <option key={style} value={style}>
                  {t("meta." + style)}
                </option>
              ))}
            </HTMLSelect>
          </FormGroup>
          <FormGroup label={t("difficulties")}>
            {difficulties.map(dif => (
              <Checkbox
                key={`${dataSetName}:${dif.key}`}
                name="difficulties"
                value={dif.key}
                checked={selectedDifficulties.has(dif.key)}
                onInput={e => {
                  updateState(s => {
                    const difficulties = new Set(s.difficulties);
                    if (e.currentTarget.checked) {
                      difficulties.add(e.currentTarget.value);
                    } else {
                      difficulties.delete(e.currentTarget.value);
                    }
                    return { ...s, difficulties };
                  });
                }}
                label={t("meta." + dif.key)}
              />
            ))}
          </FormGroup>
        </div>
        <div className={styles.column}>
          {!!flags.length && (
            <FormGroup label={t("include")}>
              {flags.map(key => (
                <label key={`${dataSetName}:${key}`}>
                  <Checkbox
                    name="inclusions"
                    value={key}
                    checked={selectedFlags.has(key)}
                    onInput={e =>
                      updateState(s => {
                        const newFlags = new Set(s.flags);
                        if (newFlags.has(key)) {
                          newFlags.delete(key);
                        } else {
                          newFlags.add(key);
                        }
                        return { ...s, flags: newFlags };
                      })
                    }
                    label={t("meta." + key)}
                  />
                </label>
              ))}
            </FormGroup>
          )}
          <div className={classNames(globalStyles.padded, styles.buttons)}>
            <Button onClick={handleRandomize}>{t("draw")}</Button>{" "}
            <Button onClick={() => setCollapsed(!collapsed)}>
              {t(collapsed ? "controls.show" : "controls.hide")}
            </Button>
          </div>
          {!!lastDrawFailed && <div>{t("controls.invalid")}</div>}
        </div>
      </section>

      {useWeights && !collapsed && (
        <WeightsControls high={upperBound} low={lowerBound} />
      )}
    </form>
  );
}
