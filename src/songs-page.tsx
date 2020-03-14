import { HTMLSelect, UL, Dialog } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { DrawStateContext } from "./draw-state";
import { Chart } from "./models/SongData";
import { ChartList } from "./chart-list";
import { MetaString } from "./game-data-utils";
import { SongList } from "./song-list";
import styles from "./songs-page.module.css";
import { useTranslateFunc } from "./hooks/useTranslateFunc";
import { useRouteMatch } from "react-router-dom";

function FlagsList({ flags }: { flags: string[] | undefined }) {
  return (
    <p>
      <UL>
        {flags?.map(f => (
          <li key={f}>
            <MetaString field={f} />
          </li>
        )) || <li>None</li>}
      </UL>
    </p>
  );
}

export function SongDetail() {
  const match = useRouteMatch<{ songID: string }>("/:dataSet/song/:songID");
  const gameData = useContext(DrawStateContext).gameData;
  const [detailChart, setDetailChart] = useState<Chart | undefined>(undefined);

  if (!gameData) {
    return <p>Game data not loaded</p>;
  }
  const song = match && gameData.songs[+match?.params.songID];
  if (!song) {
    return <p>404 Song Not Found</p>;
  }

  return (
    <div style={{ padding: "1em" }}>
      <img
        src={`/jackets/${song.jacket}`}
        style={{ float: "left", width: "25em", margin: "0 1em 1em 0" }}
      />
      <h1>{song.name}</h1>
      {song.name_translation && <h4>{song.name_translation}</h4>}
      <h2>{song.artist}</h2>
      {song.artist_translation && <h4>{song.artist_translation}</h4>}
      <p>BPM: {song.bpm}</p>
      <h3>Song Flags</h3>
      <FlagsList flags={song.flags} />
      <h3 style={{ clear: "left" }}>Charts</h3>
      <ChartList song={song} onClickChart={setDetailChart} />
      {detailChart && (
        <>
          <h3>Chart Flags</h3>
          <FlagsList flags={detailChart.flags} />
        </>
      )}
    </div>
  );
}

export function SongsPage() {
  const { t } = useTranslateFunc();
  const { gameData } = useContext(DrawStateContext);
  const [flag, setSelectedFlag] = useState<string | undefined>(undefined);
  if (!gameData) {
    return <div>No game data loaded yet</div>;
  }

  return (
    <div className={styles.container}>
      <Dialog
        isOpen={!!flag}
        title={flag && <MetaString field={flag} />}
        onClose={() => setSelectedFlag(undefined)}
      >
        {flag && (
          <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
            <SongList
              songs={gameData.songs.filter(song => {
                return (
                  song.flags?.includes(flag) ||
                  song.charts.some(chart => chart.flags?.includes(flag))
                );
              })}
            />
          </div>
        )}
      </Dialog>
      <HTMLSelect
        value=""
        onInput={e => {
          setSelectedFlag(e.currentTarget.value);
        }}
        options={[
          { label: "Show by flag", value: "" },
          ...gameData.meta.flags.map(f => ({
            value: f,
            label: t("meta." + f)
          }))
        ]}
      />
    </div>
  );
}
