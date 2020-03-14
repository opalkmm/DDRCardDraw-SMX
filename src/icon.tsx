import { Icon as BPIcon } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";

interface Props {
  icon: IconName;
  title: string;
}

export function Icon({ icon, title }: Props) {
  return <BPIcon tagName="figure" icon={icon} title={title} />;
}
