import React from 'react';
import { Grid, Paper, CircularProgress, Typography, Stack } from '@Renderer/components';

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
          <CircularProgress />
          <Stack direction="column" sx={{ ml: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
              Welcome
            </Typography>
            <Typography variant="subtitle1">Please wait a moment...!</Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
