import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { Settings, Welcome } from '@Renderer/screens';
import { Screens } from '@Common/constants';

const Router: React.FC<{}> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={`/${Screens.WELCOME.name}`} component={() => <Welcome />} />
        <Route exact path={`/${Screens.SETTING.name}`} component={() => <Settings />} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
