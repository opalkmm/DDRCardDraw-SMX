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

  loadSongSet = (dataSetName: string) => {
    this.setState({
      gameData: null,
      drawings: [],
      fuzzySearch: null,
      dataSetName,
      gameDataFailed: false
    });

    return import(
      /* webpackChunkName: "songData" */ `./songs/${dataSetName}.json`
    )
      .then(({ default: data }) => {
        this.setState({
          gameData: data,
          fuzzySearch: new FuzzySearch(
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
          )
        });
        return data;
      })
      .catch(e => {
        this.setState({
          gameDataFailed: true
        });
      });
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
