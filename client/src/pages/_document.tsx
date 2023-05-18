import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="og:site_name" content="picnic-map" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="picnic-map" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
