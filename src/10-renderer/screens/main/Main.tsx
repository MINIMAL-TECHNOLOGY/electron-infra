import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@Renderer/components';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { SnackbarProvider } from 'notistack';

import Router from '@Renderer/screens/main/Router';
import { createApplicationTheme } from '@Renderer/styles/theme';
import { applicationStore } from '@Renderer/redux/slices';
import '@Renderer/styles/App.css';
import { Constants } from '@Common/constants';

const Application: React.FC<{}> = () => {
  /* const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const applicationTheme = React.useMemo(
    () => createApplicationTheme({ mode: prefersDarkMode ? 'light' : 'light' }),
    [prefersDarkMode],
  ); */

  return (
    <SnackbarProvider maxSnack={Constants.MAX_NOTIFICATION}>
      <ThemeProvider theme={createApplicationTheme({ mode: 'light' })}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </SnackbarProvider>
  );
};

const Main: React.FC<{}> = () => {
  return (
    <Provider store={applicationStore}>
      <Application />
    </Provider>
  );
};

export default Main;
