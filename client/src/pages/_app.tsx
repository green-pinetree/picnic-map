import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import store from '@/store';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...{ theme }}>
      <Global styles={globalStyle} />
      <AppStyle>
        <Head>
          <title>나들이 갈까?</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AppStyle>
    </ThemeProvider>
  );
}

const AppStyle = styled.div`
  height: 100%;
`;
