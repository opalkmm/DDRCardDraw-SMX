import { detectedLanguage } from "./utils";
import { NavbarHeading, MenuItem } from "@blueprintjs/core";
import { FormattedMessage } from "react-intl";

// note that month is zero-indexed for date constructor :)
const lastUpdate = new Date(2020, 1, 20);

export function LastUpdate() {
  return (
    <MenuItem
      disabled
      text={
        <FormattedMessage
          id="lastUpdate"
          values={{
            date: new Intl.DateTimeFormat(detectedLanguage).format(lastUpdate)
          }}
        />
      }
    />
  );
}
