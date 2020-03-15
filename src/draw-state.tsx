import { createContext, Component } from "react";
import { UnloadHandler } from "./unload-handler";
import { draw } from "./card-draw";
import { Drawing } from "./models/Drawing";
import FuzzySearch from "fuzzy-search";
import { GameData, Song } from "./models/SongData";
import i18nData from "./assets/i18n.json";
import { detectedLanguage } from "./utils";
import { ApplyDefaultConfig } from "./apply-default-config";
import { ConfigState } from "./config-state";
import { IntlProvider } from "./intl-provider";

interface DrawState {
  gameData: GameData | null;
  fuzzySearch: FuzzySearch<Song> | null;
  drawings: Drawing[];
  dataSetName: string;
  lastDrawFailed: boolean;
  drawSongs: (config: ConfigState) => void;
  gameDataFailed: boolean;
}

export const DrawStateContext = createContext<DrawState>({
  gameData: null,
  fuzzySearch: null,
  drawings: [],
  dataSetName: "",
  lastDrawFailed: false,
  drawSongs() {},
  gameDataFailed: false
});

interface Props {
  dataSet?: string;
}

export class DrawStateManager extends Component<Props, DrawState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gameData: null,
      fuzzySearch: null,
      drawings: [],
      dataSetName: props.dataSet || "",
      lastDrawFailed: false,
      drawSongs: this.doDrawing,
      gameDataFailed: false
    };
  }

  componentDidMount() {
    this.loadSongSet(this.state.dataSetName);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.dataSet !== this.props.dataSet && this.props.dataSet) {
      this.loadSongSet(this.props.dataSet);
    }
  }

  render() {
    const allStrings = i18nData as Record<string, Record<string, string>>;
    const useTranslations = allStrings[detectedLanguage] || allStrings["en"];
    const additionalStrings = this.state.gameData?.i18n[detectedLanguage];
    return (
      <DrawStateContext.Provider value={this.state}>
        <IntlProvider
          translations={useTranslations}
          locale={detectedLanguage}
          mergeTranslations={additionalStrings}
        >
          <ApplyDefaultConfig defaults={this.state.gameData?.defaults} />
          <UnloadHandler confirmUnload={!!this.state.drawings.length} />
          {this.props.children}
        </IntlProvider>
      </DrawStateContext.Provider>
    );
  }

  loadSongSet = async (dataSetName: string) => {
    if (!dataSetName) {
      return; // don't attempt to load an empty data set
    }

    // remember current state, if good
    const prevDataSet =
      this.state.gameData &&
      !this.state.gameDataFailed &&
      this.state.dataSetName;
    this.setState({
      fuzzySearch: null,
      dataSetName,
      gameDataFailed: false,
      lastDrawFailed: false
    });

    try {
      const data: GameData = await import(
        /* webpackChunkName: "songData" */ `./songs/${dataSetName}.json`
      );

      if (this.state.dataSetName !== dataSetName) {
        return; // we're already using a different data set now, discard this one
      }
      const fuzzySearch = new FuzzySearch(
        data.songs,
        [
          "name",
          "name_translation",
          "artist",
          "artist_translation",
          "search_hint"
        ],
        {
          sort: true
        }
      );
      this.setState({
        gameData: data,
        fuzzySearch
      });
    } catch {
      if (this.state.dataSetName !== dataSetName) {
        return; // may have had an error, but we're already using a different data set now
      }
      if (prevDataSet) {
        // roll back to last known good state
        this.loadSongSet(prevDataSet);
      } else if (!this.state.gameDataFailed || this.state.dataSetName) {
        this.setState({
          gameDataFailed: true,
          dataSetName: ""
        });
      }
    }
  };

  doDrawing = (config: ConfigState) => {
    if (!this.state.gameData) {
      return;
    }

    const drawing = draw(this.state.gameData, config);
    if (!drawing.charts.length) {
      this.setState({
        lastDrawFailed: true
      });
      return;
    }

    this.setState(prevState => ({
      drawings: [drawing, ...prevState.drawings].filter(Boolean),
      lastDrawFailed: false
    }));
  };
}
