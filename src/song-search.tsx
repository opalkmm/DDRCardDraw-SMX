import { InputGroup, Popover, PopoverInteractionKind } from "@blueprintjs/core";
import { useContext, useState, useRef } from "react";
import { DrawStateContext } from "./draw-state";
import { Song, Chart } from "./models/SongData";
import { SongList } from "./song-list";
import { IconNames } from "@blueprintjs/icons";

interface Props {
  autofocus?: boolean;
  onChartSelect?: (song: Song, chart: Chart) => void;
  onSongSelect?: (song: Song) => void;
  filterCharts?: boolean;
  showCharts?: boolean;
}

export function SongSearch(props: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    autofocus,
    onChartSelect,
    onSongSelect,
    filterCharts,
    showCharts
  } = props;
  const [searchTerm, updateSearchTerm] = useState("");

  const { fuzzySearch } = useContext(DrawStateContext);

  let results: Song[] = [];
  if (fuzzySearch && searchTerm) {
    results = fuzzySearch.search(searchTerm).slice(0, 10);
  }

  return (
    <Popover
      isOpen={!!results.length}
      content={
        <SongList
          songs={results}
          showCharts={showCharts}
          filterCharts={filterCharts}
          onSelectChart={onChartSelect}
          onSelect={onSongSelect}
        />
      }
    >
      <InputGroup
        fill
        inputRef={e => (inputRef.current = e)}
        leftIcon={IconNames.SEARCH}
        placeholder="Find a song"
        type="search"
        autoFocus={autofocus}
        onKeyUp={e => {
          if (e.keyCode === 27) {
            e.preventDefault();
            updateSearchTerm("");
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          } else if (e.currentTarget.value !== searchTerm) {
            updateSearchTerm(e.currentTarget.value);
          }
        }}
        defaultValue={searchTerm}
      />
    </Popover>
  );
}
