import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { Welcome } from '@Renderer/screens';
import { Screens } from '@Common/constants';

const Router: React.FC<{}> = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/${Screens.WELCOME.name}`} element={<Welcome />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
