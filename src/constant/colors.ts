import type { ThemeConfig } from 'react-select';

export const PRIMARY = {
  50: '#f6f3ef',
  100: '#e3dbce',
  200: '#d1c3ad',
  300: '#bfab8d',
  400: '#b39c78',
  500: '#937a53',
  600: '#725f40',
  700: '#52442e',
  800: '#31291c',
  900: '#100e09',
};

export const selectDarkTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#937a53',
    primary25: '#e3dbce',
    primary50: '#bfab8d',
    primary75: '#d1c3ad',
    neutral0: '#1c2434',
    neutral5: '#111',
    neutral10: '#222',
    neutral20: '#333',
    neutral30: '#443',
    neutral40: '#555',
    neutral50: '#666',
    neutral60: '#888',
    neutral70: '#aaa',
    neutral80: '#eee',
    neutral90: '#eee',
  },
});

export const selectPrimaryTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#937a53',
    primary25: '#e3dbce',
    primary50: '#bfab8d',
    primary75: '#d1c3ad',
    neutral0: '#DED3C4',
    neutral5: '#d1c3ad',
    neutral10: '#d1c3ad',
    neutral20: '#B09873',
    neutral30: '#443',
    neutral40: '#555',
    neutral50: '#666',
    neutral60: '#888',
    neutral70: '#aaa',
    neutral80: '#B09873',
    neutral90: '#eee',
  },
});
