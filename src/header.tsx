import { Navbar, Button } from "@blueprintjs/core";
import { useRoute, Link } from "wouter-preact";
import styles from "./header.module.css";

export function Header() {
  const [_, params] = useRoute<{ dataSet: string }>("/:dataSet/:anything*");
  if (!params) {
    return null;
  }
  return (
    <header className={styles.header}>
      <Navbar id="HeaderNav">
        <Link href={`/${params.dataSet}`}>
          <Button>Browse</Button>
        </Link>

        <Link href={`/${params.dataSet}/draw`}>
          <Button>Draw Songs</Button>
        </Link>
      </Navbar>
    </header>
  );
}
