import React from 'react';
import './style.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NotFound from './pages/404/404';
import Header from './components/header/header';
import GamePage from './pages/game-page/game-page';
import { MainPage } from './pages/main-page/main-page';

const App = (): JSX.Element => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path={["/", ":gameId"]} render ={(props => <MainPage {...props}/>)}/>

        <Route path="/lobby"><NotFound /></Route>
        <Route path="/game"><GamePage /></Route>
        <Route path="/settings"><NotFound /></Route>
        <Route path="*"><NotFound /></Route>
      </Switch>
    </Router>
  </>
);

export default App;
