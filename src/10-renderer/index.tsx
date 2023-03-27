import * as React from 'react';
import ReactDOM from 'react-dom';
import '@Renderer/styles/index.css';
import Main from '@Renderer/screens/main/Main';
import reportWebVitals from '@Renderer/reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
