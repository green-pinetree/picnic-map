import { CSSProperties } from 'react';

export const COLOR = {
  primary: '#83BD75',
  primaryLight: '#B4E197',
  primaryDark: '#4E944F',

  primary400: '#81bda4',

  alert: '#333333',
  info: '#1493FF',
  success: '#36B37E',
  warning: '#FFAB00',
  error: '#E6382F',

  black: '#333333',
  white: '#FEFEFE',
  offWhite: '#FBFCFD',
  background: '#1B242C',

  gray100: '#F0F3F5',
  gray200: '#CFD6DD',
  gray300: '#9EA8B3',
  gray400: '#555F6D',
} as const;

type Color = Exclude<CSSProperties['color'], undefined>;

export type ColorSet = {
  [P in keyof typeof COLOR]: Color;
};
