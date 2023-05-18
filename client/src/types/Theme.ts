import '@emotion/react';
import { COLOR } from '@/styles/color';

interface ColorTheme {
  color: typeof COLOR;
}

declare module '@emotion/react' {
  export interface Theme extends ColorTheme {}
}
