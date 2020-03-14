import { HTMLSelect } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { DrawStateContext } from "./draw-state";

export function VersionSelect() {
  const { dataSetName } = useContext(DrawStateContext);
  const history = useHistory();

  const handleSongListChange = (v: string) => {
    history.push(history.location.pathname.replace(`/${dataSetName}`, `/${v}`));
  };

  return (
    <HTMLSelect
      id="dataSource"
      onChange={e => handleSongListChange(e.currentTarget.value)}
      value={dataSetName}
    >
      <option value="a20">DDR A20</option>
      <option value="ace">DDR Ace</option>
      <option value="extreme">DDR Extreme</option>
      <option value="drs">DANCERUSH</option>
    </HTMLSelect>
  );
}
