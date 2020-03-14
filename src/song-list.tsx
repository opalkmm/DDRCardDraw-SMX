import cn from "classnames";
import { Song, Chart } from "./models/SongData";
import { ChartList } from "./chart-list";
import styles from "./song-list.module.css";
import { useHistory, useRouteMatch } from "react-router-dom";

interface Props {
  songs: Song[];
  showCharts?: boolean;
  onSelect?: (song: Song, index: number) => void;
  onSelectChart?: (song: Song, chart: Chart) => void;
  filterCharts?: boolean;
}

export function SongList(props: Props) {
  const match = useRouteMatch<{ dataSet: string }>("/:dataSet/");
  const history = useHistory();
  let onSelect = props.onSelect;
  if (!onSelect && !props.onSelectChart && match) {
    onSelect = (_song, index) =>
      history.push(`/${match.params.dataSet}/song/${index}`);
  }

  return (
    <>
      {props.songs.map((song, i) => (
        <div
          className={cn(styles.suggestion, {
            [styles.clickable]: !!onSelect
          })}
          onClick={onSelect && (() => onSelect!(song, i))}
        >
          <img src={`/jackets/${song.jacket}`} className={styles.img} />
          <div className={styles.title}>
            {song.name_translation || song.name}
            <br />
            {song.artist_translation || song.artist}
          </div>
          {props.showCharts && (
            <ChartList
              song={song}
              filter={props.filterCharts}
              onClickChart={
                props.onSelectChart && props.onSelectChart.bind(undefined, song)
              }
            />
          )}
        </div>
      ))}
    </>
  );
}
