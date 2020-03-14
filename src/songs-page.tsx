import { HTMLSelect } from "@blueprintjs/core";
import { useContext, useState } from "react";
import { DrawStateContext } from "./draw-state";
import { Song, Chart } from "./models/SongData";
import { ChartList } from "./chart-list";
import { SongSearch } from "./song-search";
import { Modal } from "./modal";
import { MetaString } from "./game-data-utils";
import { SongList } from "./song-list";
import styles from "./songs-page.module.css";
import { useTranslateFunc } from "./hooks/useTranslateFunc";

function FlagsList({ flags }: { flags: string[] | undefined }) {
  return (
    <ul>
      {flags?.map(f => (
        <li key={f}>
          <MetaString field={f} />
        </li>
      )) || <li>None</li>}
    </ul>
  );
}

function SongDetail({ song }: { song: Song }) {
  const [detailChart, setDetailChart] = useState<Chart | undefined>(undefined);
  return (
    <div>
      <img
        src={`/jackets/${song.jacket}`}
        style={{ float: "left", width: "25em", marginRight: "1em" }}
      />
      <h1>{song.name}</h1>
      {song.name_translation && <h4>{song.name_translation}</h4>}
      <h2>{song.artist}</h2>
      {song.artist_translation && <h4>{song.artist_translation}</h4>}
      <p>BPM: {song.bpm}</p>
      <h3>Song Flags</h3>
      <FlagsList flags={song.flags} />
      <h3>Charts</h3>
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
  const [song, setSelectedSong] = useState<Song | undefined>(undefined);
  const [flag, setSelectedFlag] = useState<string | undefined>(undefined);
  if (!gameData) {
    return <div>No game data loaded yet</div>;
  }

  if (song) {
    return (
      <Modal onClose={() => setSelectedSong(undefined)}>
        <SongDetail song={song} />
      </Modal>
    );
  }

  if (flag) {
    return (
      <Modal onClose={() => setSelectedFlag(undefined)}>
        <h1>
          <MetaString field={flag} />
        </h1>
        <SongList
          onSelect={setSelectedSong}
          songs={gameData.songs.filter(song => {
            return (
              song.flags?.includes(flag) ||
              song.charts.some(chart => chart.flags?.includes(flag))
            );
          })}
        />
      </Modal>
    );
  }

  return (
    <div className={styles.container}>
      <SongSearch onSongSelect={setSelectedSong} autofocus>
        <HTMLSelect
          value={flag}
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
      </SongSearch>
    </div>
  );
}
