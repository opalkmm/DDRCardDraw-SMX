import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "regenerator-runtime/runtime";

import "./firebase";
import { render } from "react-dom";
import { Footer } from "./footer";
import { AuthManager } from "./auth";
import { UpdateManager } from "./update-manager";
import { DrawStateManager } from "./draw-state";
import styles from "./app.module.css";
import { ConfigStateManager } from "./config-state";
import { Header } from "./header";
import { HashRouter as Router, useRouteMatch } from "react-router-dom";
import { AppPages } from "./app-pages";

function App() {
  const match = useRouteMatch<{ dataSet: string }>("/:dataSet/");

  return (
    <DrawStateManager dataSet={match?.params.dataSet}>
      <UpdateManager />
      <Header />
      <div className={styles.scrollable}>
        <AppPages />
      </div>
      <Footer />
    </DrawStateManager>
  );
}

function AppShell() {
  return (
    <Router>
      <AuthManager>
        <ConfigStateManager>
          <App />
        </ConfigStateManager>
      </AuthManager>
    </Router>
  );
}

const appRoot = document.createElement("main");
document.body.prepend(appRoot);
appRoot.className = styles.container;
render(<AppShell />, appRoot);
