import type { AppProps } from 'next/app';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';
import { Global, ThemeProvider } from '@emotion/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...{ theme }}>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
