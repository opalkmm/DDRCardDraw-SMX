import { Switch, Route } from "react-router-dom";
import { DrawingList } from "./drawing-list";
import { NotFoundPage } from "./non-ideal-pages";
import { AboutPage } from "./about";
import { GameIndexPage, SongDetail } from "./game-index-page";

export function AppPages() {
  return (
    <Switch>
      <Route exact path="/credits" component={AboutPage} />
      <Route path="/:dataSet">
        <Switch>
          <Route path="/:dataSet/song/:songIndex" component={SongDetail} />
          <Route exact path="/:dataSet/draw" component={DrawingList} />
          <Route path="/:dataSet/:anything" component={NotFoundPage} />
          <Route exact path="/:dataSet" component={GameIndexPage} />
        </Switch>
      </Route>
    </Switch>
  );
}
