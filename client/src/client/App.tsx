import React from 'react';
import './style.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HelloPage from './pages/hello-page/hello-page';
import NotFound from './pages/404/404';
import Header from './components/header/header';
import GamePage from './pages/game-page/game-page';
import Lobby from './pages/lobby/lobby';

const App = (): JSX.Element => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HelloPage />
        </Route>
        <Route path="/lobby"><Lobby /></Route>
        <Route path="/game"><GamePage /></Route>
        <Route path="/settings"><NotFound /></Route>
        <Route path="*"><NotFound /></Route>
      </Switch>
    </Router>
  </>
);

export default App;
