import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { Welcome, Home } from '@Renderer/screens';
import { Screens } from '@Common/constants';

const Router: React.FC<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={`/${Screens.WELCOME.name}`} component={() => <Welcome />} />
        <Route exact path={`/${Screens.HOME.name}`} component={() => <Home />} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
