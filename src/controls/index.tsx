import cn from "classnames";
import { useContext, useRef, useState } from "react";
import { WeightsControls } from "./controls-weights";
import styles from "./controls.module.css";
import { DrawStateContext } from "../draw-state";
import { ConfigStateContext } from "../config-state";
import {
  HTMLSelect,
  FormGroup,
  NumericInput,
  Checkbox,
  Button,
  Intent,
  Drawer,
  Position,
  Tooltip,
  ButtonGroup,
  Divider,
  NavbarDivider,
  RangeSlider,
  NumberRange
} from "@blueprintjs/core";
import { useTranslateFunc } from "../hooks/useTranslateFunc";
import { IconNames } from "@blueprintjs/icons";
import { FormattedMessage } from "react-intl";

function preventDefault(e: { preventDefault(): void }) {
  e.preventDefault();
}

export function DrawControls() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lastDrawFailed, setLastDrawFailed] = useState(false);
  const { drawSongs } = useContext(DrawStateContext);
  const configState = useContext(ConfigStateContext);

  function handleDraw() {
    const couldDraw = drawSongs(configState);
    if (couldDraw !== !lastDrawFailed) {
      setLastDrawFailed(!couldDraw);
    }
  }

  function openSettings() {
    setSettingsOpen(open => !open);
    setLastDrawFailed(false);
  }

  return (
    <>
      <Drawer
        isOpen={settingsOpen}
        position={Position.TOP}
        size="auto"
        onClose={() => setSettingsOpen(false)}
        title={
          <FormattedMessage
            id="settings.title"
            defaultMessage="Card Draw Options"
          />
        }
      >
        <SettingsDrawer />
      </Drawer>
      <ButtonGroup>
        <Button
          onClick={handleDraw}
          icon={IconNames.DUPLICATE}
          intent={Intent.PRIMARY}
        >
          <FormattedMessage id="draw" defaultMessage="Draw!" />
        </Button>
        <Tooltip
          isOpen={lastDrawFailed}
          content={<FormattedMessage id="controls.invalid" />}
          intent={Intent.DANGER}
          usePortal={false}
          position={Position.BOTTOM_RIGHT}
        >
          <Button icon={IconNames.COG} onClick={openSettings} />
        </Tooltip>
      </ButtonGroup>
    </>
  );
}

export function SettingsDrawer() {
  const form = useRef<HTMLFormElement | null>(null);
  const { t } = useTranslateFunc();
  const { gameData } = useContext(DrawStateContext);
  const configState = useContext(ConfigStateContext);
  const {
    useWeights,
    lowerBound,
    upperBound,
    update: updateConfig,
    difficulties: selectedDifficulties,
    flags: selectedFlags,
    style: selectedStyle,
    chartCount
  } = configState;
  if (!gameData) {
    return null;
  }
  const { difficulties, flags, lvlMax, styles: gameStyles } = gameData.meta;

  const handleLowerBoundChange = (newValue: number) => {
    if (newValue > upperBound) {
      return;
    }
    updateConfig(state => {
      return {
        ...state,
        lowerBound: newValue
      };
    });
  };

  const handleUpperBoundChange = (newValue: number) => {
    if (newValue < lowerBound) {
      return;
    }
    updateConfig(state => {
      return {
        ...state,
        upperBound: newValue
      };
    });
  };

  function handleBoundsChange([low, high]: NumberRange) {
    if (low !== lowerBound || high !== upperBound) {
      updateConfig(state => ({
        ...state,
        lowerBound: low,
        upperBound: high
      }));
    }
  }

  return (
    <form ref={form} className={cn(styles.form)} onSubmit={preventDefault}>
      <section className={styles.columns}>
        <div className={styles.column}>
          <FormGroup labelFor="chartCount" label={t("chartCount")}>
            <NumericInput
              id="chartCount"
              value={chartCount}
              min={1}
              onValueChange={chartCount => {
                updateConfig(s => {
                  return { ...s, chartCount };
                });
              }}
            />
          </FormGroup>
          <FormGroup label={t("difficultyLevel")}>
            <RangeSlider
              value={[lowerBound, upperBound]}
              min={1}
              max={lvlMax}
              onChange={handleBoundsChange}
              labelStepSize={4}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              id="weighted"
              checked={useWeights}
              onChange={e => {
                const useWeights = !!e.currentTarget.checked;
                updateConfig(state => ({
                  ...state,
                  useWeights
                }));
              }}
              label={t("useWeightedDistributions")}
            />
          </FormGroup>
        </div>
        <div className={styles.column}>
          <FormGroup labelFor="style" label={t("style")}>
            <HTMLSelect
              id="style"
              value={selectedStyle}
              onChange={e => {
                const style = e.currentTarget.value;
                updateConfig(s => {
                  return { ...s, style };
                });
              }}
              large
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
                key={`${dif.key}`}
                name="difficulties"
                value={dif.key}
                checked={selectedDifficulties.has(dif.key)}
                onChange={e => {
                  const { checked, value } = e.currentTarget;
                  updateConfig(s => {
                    const difficulties = new Set(s.difficulties);
                    if (checked) {
                      difficulties.add(value);
                    } else {
                      difficulties.delete(value);
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
                <label key={`${key}`}>
                  <Checkbox
                    name="inclusions"
                    value={key}
                    checked={selectedFlags.has(key)}
                    onInput={e =>
                      updateConfig(s => {
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
        </div>
      </section>

      {useWeights && <WeightsControls high={upperBound} low={lowerBound} />}
    </form>
  );
}
