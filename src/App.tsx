import React from 'react';
import './style.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HelloPage from './hello-page/hello-page';
import NotFound from './404/404';
import Header from './header/header';
import GamePage from './game-page/game-page';

const App = (): JSX.Element => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HelloPage />
          </Route>
          <Route path="/lobby"><NotFound /></Route>
          <Route path="/game"><GamePage /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>        
      </Router>
    </>
  );
};

export default App;
