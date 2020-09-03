import { detectedLanguage } from "./utils";
import { MenuItem, Text } from "@blueprintjs/core";
import { FormattedMessage } from "react-intl";

// note that month is zero-indexed for date constructor :)
const lastUpdate = new Date(2020, 1, 20);

export function LastUpdate() {
  return (
    <p
      className="bp3-text-muted bp3-text-small"
      style={{ padding: "10px", margin: 0 }}
    >
      <FormattedMessage
        id="lastUpdate"
        values={{
          date: new Intl.DateTimeFormat(detectedLanguage).format(lastUpdate),
        }}
      />
    </p>
  );
}
