import { Switch, Route, Redirect } from "react-router-dom";
import { DrawingList } from "./drawing-list";
import { NotFoundPage } from "./non-ideal-pages";
import { AboutPage } from "./about";
import { GameIndexPage, SongDetail } from "./game-index-page";
import { available } from "./hooks/useDataSets";

export function AppPages() {
  return (
    <Switch>
      <Route exact path="/:dataSet/credits" component={AboutPage} />
      <Route path="/:dataSet">
        <Switch>
          <Route path="/:dataSet/song/:songIndex" component={SongDetail} />
          <Route exact path="/:dataSet/draw" component={DrawingList} />
          <Route path="/:dataSet/:anything" component={NotFoundPage} />
          <Route exact path="/:dataSet" component={GameIndexPage} />
        </Switch>
      </Route>
      <Redirect to={`/${available[0].name}`} />
    </Switch>
  );
}
