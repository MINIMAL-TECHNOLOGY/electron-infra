import React from 'react';
import { Grid, Paper, CircularProgress, Typography, Stack } from '@Renderer/components';
// import { RendererEventService, QTSNetworkService } from '@Renderer/services';
// import { RouterIpcEvents } from '@Common/ipc-events';
// import { Constants, LocalStorageKeys, Screens } from '@Common/constants';
// import { useSnackbar } from 'notistack';

export const Welcome: React.FC = () => {
  return (
    <Grid container sx={{ width: '100vw', height: '100vh' }} justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CircularProgress color="secondary" />
          <Stack direction="column" sx={{ ml: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 900, fontSize: 30 }}>
              Welcome screen to Electron App
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
