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
            this, // always this
            this.props.drawing.bans, // array to work with
            chart.id as number, // first argument defined below
          ),
          onProtect: this.handleBanProtectReplace.bind(
            this,
            this.props.drawing.protects,
            chart.id as number,
          ),
          onReplace: this.handleBanProtectReplace.bind(
            this,
            this.props.drawing.pocketPicks,
            chart.id as number,
            // index
          ),
          onReset: this.handleReset.bind(this, index, chart.id as number),
        }}
        vetoedBy={veto && veto.player}
        protectedBy={protect && protect.player}
        replacedBy={pocketPick && pocketPick.player}
        replacedWith={pocketPick && pocketPick.pick}
        chart={chart}
      />
    );
  };

  handleBanProtectReplace(
    arr: Array<PlayerActionOnChart> | Array<PocketPick>,
    // chartIndex: number,
    chartId: number,
    player: 1 | 2,
    chart: DrawnChart,
    
  ) {
    const existingBanIndex = arr.findIndex((b) => b.chartId === chart?.id);
    if (existingBanIndex >= 0) {
      // why do we do this
      arr.splice(existingBanIndex, 1);
    } else {
      arr.push({ player, pick: chart!, chartId: chart?.id });
    }
    // have to get the chart by its id instead of its index
    let shiftedChart:DrawnChart = this.props.drawing.charts[0];
    if (!!chartId) {
      shiftedChart = this.props.drawing.charts.find(chart => chart.id === chartId) as DrawnChart;
    } 
    // else if (!chartId) {
    //   shiftedChart = this.props.drawing.charts[chartIndex];
    // }
    if (!!chartId) {
      const indexToCut = this.props.drawing.charts.indexOf(shiftedChart);
      this.props.drawing.charts.splice(indexToCut, 1);
    } else {
      // this.props.drawing.charts.splice(chartIndex, 1);
    }
    this.props.drawing.charts.unshift(shiftedChart);
    this.forceUpdate();
  }

  handleReset(chartIndex: number, chartId: number) {
    const drawing = this.props.drawing;
    drawing.bans = drawing.bans.filter((p) => p.chartId !== chartId);
    drawing.protects = drawing.protects.filter(
      (p) => p.chartIndex !== chartIndex
    );
    drawing.pocketPicks = drawing.pocketPicks.filter(
      (p) => p.chartIndex !== chartIndex
    );
    this.forceUpdate();
  }
}
