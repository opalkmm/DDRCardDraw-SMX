import { Component } from "react";
import { SongCard } from "./song-card";
import styles from "./drawn-set.css";
import {
  Drawing,
  DrawnChart,
  PlayerActionOnChart,
  PocketPick,
} from "./models/Drawing";

const HUE_STEP = (255 / 8) * 3;
let hue = Math.floor(Math.random() * 255);

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
      <div
        key={drawing.id}
        className={styles.chartList}
        style={{ backgroundImage: this._background }}
      >
        {drawing.charts.map(this.renderChart)}
      </div>
    );
  }

  renderChart = (chart: DrawnChart, index: number) => {
    const veto = this.props.drawing.bans.find((b) => b.chartId === chart.id);
    // TODO modify the rest - right now just doing VETO
    const protect = this.props.drawing.protects.find(
      (b) => b.chartId === chart.id
    );
    const pocketPick = this.props.drawing.pocketPicks.find(
      (b) => b.chartId === chart.id
    );
    return (
      <SongCard
        key={index}
        iconCallbacks={{
          onVeto: this.newHandleBanProtectReplace.bind(
            this,
            this.props.drawing.bans,
            chart.id as number,
          ),
          onProtect: this.newHandleBanProtectReplace.bind(
            this,
            this.props.drawing.protects,
            chart.id as number
          ),
          onReplace: this.newHandleBanProtectReplace.bind(
            this,
            this.props.drawing.pocketPicks,
            chart.id as number
          ),
          // TODO find and make sure this works below
          onReset: this.handleReset.bind(this, index),
        }}
        vetoedBy={veto && veto.player}
        protectedBy={protect && protect.player}
        replacedBy={pocketPick && pocketPick.player}
        replacedWith={pocketPick && pocketPick.pick}
        chart={chart}
      />
    );
  };
  newHandleBanProtectReplace(
    arr: Array<PlayerActionOnChart> | Array<PocketPick>,
    chartId: number,
    player: 1 | 2,
    chart: DrawnChart,
  ) {
    const existingBanIndex = arr.findIndex((b) => b.chartId === chart?.id);
    if (existingBanIndex >= 0) {
      arr.splice(existingBanIndex, 1);
      // not sure if above should be removed or not?
    } else {
      arr.push({ player, pick: chart!, chartId });
    }
    const shiftedChart = this.props.drawing.charts.find(chart => chart.id === chartId) as DrawnChart;
    const indexToCut = this.props.drawing.charts.indexOf(shiftedChart);
    this.props.drawing.charts.splice(indexToCut, 1);
    this.props.drawing.charts.unshift(shiftedChart);
    this.forceUpdate();
  }
  
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
    }
    const shiftedChart: DrawnChart = this.props.drawing.charts[chartIndex];
    this.props.drawing.charts.splice(chartIndex, 1);	    
    this.props.drawing.charts.unshift(shiftedChart);
    this.forceUpdate();
  }

  // TODO make sure to modify handleReset() as necessary
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
