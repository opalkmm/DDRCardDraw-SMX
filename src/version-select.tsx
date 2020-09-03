import { Menu } from "@blueprintjs/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IconNames } from "@blueprintjs/icons";
import { FormattedMessage } from "react-intl";
import { useDataSets } from "./hooks/useDataSets";

export function VersionSelect() {
  const { available, current } = useDataSets();
  const match = useRouteMatch<{ dataSetName: string }>("/:dataSetName");
  const history = useHistory();

  const handleSongListChange = (newName: string) => {
    if (current.name === newName) {
      return;
    }
    if (match && match.params.dataSetName === current.name) {
      history.push(
        history.location.pathname.replace(`/${current.name}`, `/${newName}`)
      );
    } else {
      history.push(`/${newName}`);
    }
  };

  return (
    <>
      <Menu.Divider title={<FormattedMessage id="dataSource" />} />
      {available.map(({ name, display }) => (
        <Menu.Item
          key={name}
          text={display}
          active={name === current.name}
          onClick={() => handleSongListChange(name)}
          icon={name === current.name ? IconNames.SELECTION : IconNames.CIRCLE}
        />
      ))}
    </>
  );
}
