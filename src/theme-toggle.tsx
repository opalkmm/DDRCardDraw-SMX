import { useDarkThemePreference } from "./hooks/useDarkThemePreference";
import { useEffect, useState } from "react";
import { Classes, Button, Pre, Tooltip } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

enum Preference {
  Light = "light",
  Dark = "dark"
}

export function ThemeToggle() {
  const systemPrefersDark = useDarkThemePreference();
  const [override, setOverride] = useState<Preference | undefined>(undefined);
  const useDark =
    override === undefined ? systemPrefersDark : override === Preference.Dark;
  useEffect(() => {
    document.body.classList.toggle(Classes.DARK, useDark);
  }, [useDark]);

  const icon = useDark ? IconNames.FLASH : IconNames.MOON;

  return (
    <Tooltip content="Toggle theme">
      <Button
        icon={icon}
        onClick={() =>
          setOverride(useDark ? Preference.Light : Preference.Dark)
        }
      />
    </Tooltip>
  );
}
