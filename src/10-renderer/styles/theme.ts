import createTheme from '@mui/material/styles/createTheme';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import yellow from '@mui/material/colors/yellow';
import purple from '@mui/material/colors/purple';
import cyan from '@mui/material/colors/cyan';

interface ApplicationThemeOptions {
  mode: 'dark' | 'light';
  variant?: 'primary' | 'secondary' | 'up' | 'down' | 'reference' | 'ceil' | 'floor' | 'background';
}

export const PRIMARY_COLOR = red;
export const SECONDARY_COLOR = blue;

export const Colors = {
  WHITE: '#fff',
  BLACK: '#000',
};

export const getColor = (opts: ApplicationThemeOptions) => {
  const { mode, variant } = opts;

  let color = Colors.WHITE;
  switch (variant) {
    case 'primary': {
      color = mode === 'dark' ? PRIMARY_COLOR[600] : PRIMARY_COLOR[900];
      break;
    }
    case 'secondary': {
      color = mode === 'dark' ? SECONDARY_COLOR[600] : SECONDARY_COLOR[900];
      break;
    }
    case 'up': {
      color = mode === 'dark' ? PRIMARY_COLOR[600] : PRIMARY_COLOR[900];
      break;
    }
    case 'down': {
      color = mode === 'dark' ? SECONDARY_COLOR[600] : SECONDARY_COLOR[900];
      break;
    }
    case 'reference': {
      color = mode === 'dark' ? yellow[700] : yellow[900];
      break;
    }
    case 'ceil': {
      color = mode === 'dark' ? purple['A200'] : purple[700];
      break;
    }
    case 'floor': {
      color = mode === 'dark' ? cyan['A400'] : cyan[600];
      break;
    }
    case 'background': {
      color = mode === 'dark' ? Colors.BLACK : Colors.WHITE;
      break;
    }
    default: {
      break;
    }
  }

  return color;
};

export const getPriceColor = (opts: { reference: number; ceil?: number; floor?: number; price: number }) => {
  const { reference, ceil, floor, price } = opts;

  if (ceil !== undefined && price >= ceil) {
    return purple[500];
  }

  if (floor !== undefined && price <= floor) {
    return cyan[500];
  }

  if (price > reference) {
    return red[500];
  }

  if (price < reference) {
    return blue[500];
  }

  return yellow[600];
};

export const createApplicationTheme = (opts: ApplicationThemeOptions) => {
  const { mode } = opts;

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: getColor({ mode, variant: 'primary' }) },
      secondary: { main: getColor({ mode, variant: 'secondary' }) },
      /* up: { main: getColor({ mode, variant: 'up' }) },
      down: { main: getColor({ mode, variant: 'down' }) }, */
    },
    typography: { fontSize: 12 },
    components: {
      MuiButton: {
        defaultProps: { size: 'small', variant: 'contained', disableElevation: true },
        styleOverrides: { root: { minWidth: 16 } },
      },
      MuiButtonGroup: {
        defaultProps: { size: 'small', variant: 'contained', disableElevation: true },
        styleOverrides: {
          root: { minWidth: 16 },
          grouped: { minWidth: 16 },
        },
      },
      MuiFormControl: {
        defaultProps: { margin: 'dense' },
      },
      MuiFormHelperText: {
        defaultProps: { margin: 'dense' },
      },
      MuiIconButton: {
        defaultProps: { size: 'small' },
      },
      MuiInputBase: {
        defaultProps: { margin: 'dense' },
      },
      MuiInputLabel: {
        defaultProps: { margin: 'dense' },
      },
      MuiListItem: {
        defaultProps: { dense: true },
      },
      MuiFab: {
        defaultProps: { size: 'small' },
      },
      MuiTable: {
        defaultProps: { size: 'small' },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', fullWidth: true, size: 'small' },
      },
      MuiToolbar: {
        defaultProps: { variant: 'dense' },
      },
    },
    spacing: 4,
  });

  return theme;
};

export const DEFAULT_APPLICATION_THEME = createApplicationTheme({
  mode: 'light',
});
