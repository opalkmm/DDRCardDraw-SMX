import { Component } from "react";
import { SongCard } from "./song-card";
import { ProgressBar } from "@blueprintjs/core";
import styles from "./drawn-set.css";
import {
  Drawing,
  DrawnChart,
  PlayerActionOnChart,
  PocketPick,
} from "./models/Drawing";

const HUE_STEP = (255 / 8) * 3;
let hue = Math.floor(Math.random() * 255);
let turnCounter = 0;

function getRandomGradiant() {
  hue += HUE_STEP;
  return `linear-gradient(hsl(${hue}, 40%, 80%), transparent, transparent)`;
}

interface Props {
  drawing: Drawing;
}

export class DrawnSet extends Component<Props> {
  _background = getRandomGradiant();

  render() {
    const { drawing } = this.props;
  
    
    return (
      <div style={{ backgroundImage: this._background }}>
      <div
        key={drawing.id}
        className={styles.chartList}
      >
        {drawing.charts.map(this.renderChart)}
        {console.log(turnCounter)}
      </div>
      </div>
    );
  }

  renderChart = (chart: DrawnChart, index: number) => {
    const veto = this.props.drawing.bans.find((b) => b.chartIndex === index);
    const protect = this.props.drawing.protects.find(
      (b) => b.chartIndex === index
    );
    const pocketPick = this.props.drawing.pocketPicks.find(
      (b) => b.chartIndex === index
    );
    return (
      <SongCard
        key={index}
        iconCallbacks={{
          onVeto: this.handleBanProtectReplace.bind(
            this,
            this.props.drawing.bans,
            index
          ),
          onProtect: this.handleBanProtectReplace.bind(
            this,
            this.props.drawing.protects,
            index
          ),
          onReplace: this.handleBanProtectReplace.bind(
            this,
            this.props.drawing.pocketPicks,
            index
          ),
          onReset: this.handleReset.bind(this, index),
        }}
        vetoedBy={veto && veto.player}
        protectedBy={protect && protect.player}
        replacedBy={pocketPick && pocketPick.player}
        replacedWith={pocketPick && pocketPick.pick}
        chart={chart}
        turnOrder={turnCounter}
      />
    );
  };

  handleBanProtectReplace(
    arr: Array<PlayerActionOnChart> | Array<PocketPick>,
    chartIndex: number,
    player: 1 | 2,
    chart?: DrawnChart
  ) {
    const existingBanIndex = arr.findIndex((b) => b.chartIndex === chartIndex);
    if (existingBanIndex >= 0) {
      arr.splice(existingBanIndex, 1);
    } else {
      arr.push({ chartIndex, player, pick: chart! });
      turnCounter++
    }
    this.forceUpdate();
  }

  handleReset(chartIndex: number) {
    const drawing = this.props.drawing;
    drawing.bans = drawing.bans.filter((p) => p.chartIndex !== chartIndex);
    drawing.protects = drawing.protects.filter(
      (p) => p.chartIndex !== chartIndex
    );
    drawing.pocketPicks = drawing.pocketPicks.filter(
      (p) => p.chartIndex !== chartIndex
    );
    this.forceUpdate();
  }
}
