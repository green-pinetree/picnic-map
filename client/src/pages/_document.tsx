import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="og:site_name" content="picnic-map" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="picnic-map" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.svg" />
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=q37yd8578a"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
