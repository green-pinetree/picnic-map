import { css } from '@emotion/react';
import BREAK_POINT from './breakpoint';
import { COLOR } from './color';

export const title = css`
  font-family: 'ImcreSoojin';
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR.primary};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 22px;
  }
`;

export const subtitle1 = css`
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${COLOR.black};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 18px;
  }
`;

export const subtitle2 = css`
  font-family: sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${COLOR.black};
`;

export const subtitle3 = css`
  font-family: sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${COLOR.black};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 18px;
  }
`;

export const body1 = css`
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.black};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 16px;
  }
`;

export const body2 = css`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR.black};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 12px;
  }
`;

export const desc = css`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR.gray300};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 14px;
  }
`;

export const button1 = css`
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.white};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 14px;
  }
`;

export const button2 = css`
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR.white};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    font-size: 12px;
  }
`;
