import { Switch, Route, Redirect } from "react-router-dom";
import { SongsPage, SongDetail } from "./songs-page";
import { Controls } from "./controls";
import { DrawingList } from "./drawing-list";
import { NotFoundPage } from "./not-found-page";
import { useContext } from "react";
import { DrawStateContext } from "./draw-state";

export function AppPages() {
  const gameDataNotFound = useContext(DrawStateContext).gameDataFailed;
  if (gameDataNotFound) {
    return <NotFoundPage />;
  }

  return (
    <Switch>
      <Route exact path="/:dataSet" component={SongsPage} />
      <Route path="/:dataSet/song/:songIndex" component={SongDetail} />
      <Route exact path="/:dataSet/draw">
        <Controls />
        <DrawingList />
      </Route>
      <Route exact path="/">
        <Redirect to="/a20" />
      </Route>
      <Route path="/:anything*" component={NotFoundPage} />
    </Switch>
  );
}
