import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "regenerator-runtime/runtime";

import "./firebase";
import { render } from "react-dom";
import { useEffect } from "react";
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
import { Classes } from "@blueprintjs/core";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";

function App() {
  const match = useRouteMatch<{ dataSet: string }>("/:dataSet/");
  if (!match) {
    return null;
  }

  return (
    <DrawStateManager dataSet={match.params.dataSet}>
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
    document.body.classList.toggle(Classes.DARK, prefersDark);
  });
  return null;
}

function AppShell() {
  return (
    <BrowserRouter>
      <AuthManager>
        <ConfigStateManager>
          <ApplyDarkTheme />
          <App />
          <Redirect from="/" to="/a20" />
        </ConfigStateManager>
      </AuthManager>
    </BrowserRouter>
  );
}

const appRoot = document.createElement("main");
document.body.prepend(appRoot);
appRoot.className = styles.container;
render(<AppShell />, appRoot);
