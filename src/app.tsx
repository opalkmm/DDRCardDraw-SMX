import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import "./firebase";
import { render } from "react-dom";
import { useEffect } from "react";
import { Route, Switch, useLocation, useRoute } from "wouter-preact";
import { Controls } from "./controls";
import { DrawingList } from "./drawing-list";
import { Footer } from "./footer";
import { AuthManager } from "./auth";
import { UpdateManager } from "./update-manager";
import { DrawStateManager } from "./draw-state";
import styles from "./app.module.css";
import { ConfigStateManager } from "./config-state";
import { SongsPage } from "./songs-page";
import { Header } from "./header";
import { useDarkThemePreference } from "./hooks/useDarkThemePreference";

interface RedirectProps {
  replace?: boolean;
  to: string;
}

function Redirect({ to, replace }: RedirectProps) {
  const [_, setLocation] = useLocation();
  useEffect(() => setLocation(to, replace), [to, replace]);
  return null;
}

function App() {
  const [_, params] = useRoute<{ dataSet: string }>("/:dataSet/:anything*");
  if (!params) {
    return null;
  }

  return (
    <DrawStateManager dataSet={params.dataSet}>
      <UpdateManager />
      <Header />
      <Switch>
        <Route path="/:dataSet">
          <SongsPage />
        </Route>
        <Route path="/:dataSet/draw">
          <Controls />
          <DrawingList />
        </Route>
        <Route path="/:anything*">
          <p>404 Not Found</p>
        </Route>
      </Switch>
      <Footer />
    </DrawStateManager>
  );
}

function ApplyDarkTheme() {
  const prefersDark = useDarkThemePreference();
  useEffect(() => {
    document.body.classList.toggle("bp3-dark", prefersDark);
  });
  return null;
}

function AppShell() {
  return (
    <AuthManager>
      <ConfigStateManager>
        <ApplyDarkTheme />
        <App />
        <Route path="/">
          <Redirect to="/a20" replace />
        </Route>
      </ConfigStateManager>
    </AuthManager>
  );
}

const appRoot = document.createElement("main");
document.body.prepend(appRoot);
appRoot.className = styles.container;
render(<AppShell />, appRoot);
