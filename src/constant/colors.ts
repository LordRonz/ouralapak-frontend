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
    primary: '#eb2754',
    primary25: '#ff3377',
    primary50: '#fa8072',
    primary75: '#ff3377',
    neutral0: '#000',
    neutral5: '#111',
    neutral10: '#222',
    neutral20: '#992323',
    neutral30: '#443',
    neutral40: '#555',
    neutral50: '#666',
    neutral60: '#888',
    neutral70: '#aaa',
    neutral80: '#ffd1d1',
    neutral90: '#eee',
  },
});
