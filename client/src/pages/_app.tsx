import type { AppProps } from 'next/app';
import { COLOR } from '@/styles/color';
import { CdsProvider } from '@chwh/cds';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CdsProvider themeColor={COLOR}>
      <Component {...pageProps} />
    </CdsProvider>
  );
}
