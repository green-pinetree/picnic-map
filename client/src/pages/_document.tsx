import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="나들이 장소 추천 서비스⭐ 나들이 장소를 추천받아 보세요!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="나들이 갈까?" />
        <meta property="og:title" content="나들이 갈까?" />
        <meta
          property="og:description"
          content="나들이 장소 추천 서비스⭐ 나들이 장소를 추천받아 보세요!"
        />
        <meta property="og:url" content="https://picnic-map.polarmin.net/" />
        <meta property="og:image" content="https://picnic-map.polarmin.net/og_image.png" />

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
