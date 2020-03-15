import { Menu } from "@blueprintjs/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useContext } from "react";
import { DrawStateContext } from "./draw-state";
import { IconNames } from "@blueprintjs/icons";
import { FormattedMessage } from "react-intl";

const GAME_SETS = [
  { key: "a20", display: "DDR A20" },
  { key: "ace", display: "DDR Ace" },
  { key: "extreme", display: "DDR Extreme" },
  { key: "drs", display: "DANCERUSH" }
];

export function VersionSelect() {
  const { dataSetName } = useContext(DrawStateContext);
  const match = useRouteMatch<{ dataSetName: string }>("/:dataSetName");
  const history = useHistory();

  const handleSongListChange = (v: string) => {
    if (dataSetName === v) {
      return;
    }
    if (match && match.params.dataSetName === dataSetName) {
      history.push(
        history.location.pathname.replace(`/${dataSetName}`, `/${v}`)
      );
    } else {
      history.push(`/${v}`);
    }
  };

  return (
    <Menu.Item
      text={<FormattedMessage id="dataSource" />}
      icon={IconNames.TIME}
    >
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
