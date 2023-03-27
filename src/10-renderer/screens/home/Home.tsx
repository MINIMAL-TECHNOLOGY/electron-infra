import React from 'react';
import { Grid, Typography } from '@Renderer/components';

export const Home: React.FC<{}> = () => {
  return (
    <Grid sx={{ width: '100vw', height: '100vh' }} container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h6" gutterBottom>
          Welcome!
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          This screen is under construction!
        </Typography>
      </Grid>
    </Grid>
  );
};
