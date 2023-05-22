import type { AppProps } from 'next/app';
import { useState } from 'react';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';
import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider {...{ theme }}>
      <Global styles={globalStyle} />
      <AppStyle>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </AppStyle>
    </ThemeProvider>
  );
}

const AppStyle = styled.div`
  height: 100%;
`;
