import { css } from '@emotion/react';
import BREAK_POINT from './breakpoint';
import { COLOR } from './color';

const globalStyle = css`
  @font-face {
    font-family: 'ImcreSoojin';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.3/ImcreSoojin.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    height: 100%;
    padding: 0;
    overscroll-behavior: contain;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;

    /*
    Scrollbar from OnAirCode
    source: https://onaircode.com/html-css-custom-scrollbar-examples/
     */
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.4);
    }
    &::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.9);
    }
  }

  #__next {
    height: 100%;
    overflow: hidden;
  }

  *:link {
    text-decoration: none;
  }

  a:hover {
    color: #333;
  }
  li {
    list-style-type: none;
  }
  button {
    border: 0px;
  }
  .mobile-layout {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100vw;
    height: 100vh;
    height: -webkit-fill-available;
    height: fill-available;
    @media screen and (min-width: ${BREAK_POINT.mobile}px) {
      display: none;
    }
  }
  .desktop-layout {
    display: flex;
    @media screen and (max-width: ${BREAK_POINT.mobile}px) {
      display: none;
    }
  }
  .user-position {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLOR.warning};
    border-radius: 30px;
    box-shadow: 0px 1px 1px 1px ${COLOR.gray400};
    div {
      width: 50%;
      height: 50%;
      border-radius: 100%;
      background-color: ${COLOR.offWhite};
    }
  }
`;

export default globalStyle;
