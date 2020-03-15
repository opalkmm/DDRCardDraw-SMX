import { Menu } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { DrawStateContext } from "./draw-state";
import { IconNames } from "@blueprintjs/icons";

const GAME_SETS = [
  { key: "a20", display: "DDR A20" },
  { key: "ace", display: "DDR Ace" },
  { key: "extreme", display: "DDR Extreme" },
  { key: "drs", display: "DANCERUSH" }
];

export function VersionSelect() {
  const { dataSetName } = useContext(DrawStateContext);
  const history = useHistory();

  const handleSongListChange = (v: string) => {
    if (dataSetName === v) {
      return;
    }
    history.push(history.location.pathname.replace(`/${dataSetName}`, `/${v}`));
  };

  return (
    <Menu.Item text="Game" icon={IconNames.TIME}>
      {GAME_SETS.map(({ key, display }) => (
        <Menu.Item
          key={key}
          text={display}
          active={key === dataSetName}
          onClick={() => handleSongListChange(key)}
        />
      ))}
    </Menu.Item>
  );
}
