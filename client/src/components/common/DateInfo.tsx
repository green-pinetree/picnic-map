import React from 'react';
import DateDropDown from './DateDropDown';
import { body2 } from '@/styles/font';
import styled from '@emotion/styled';

export default function DateInfo() {
  return (
    <TodayInfo>
      <DateDropDown />
      <Weather>
        <span>날씨: 맑음</span>
        <span>미세먼지: 좋음</span>
      </Weather>
    </TodayInfo>
  );
}
const TodayInfo = styled.div`
  width: fit-content;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const Weather = styled.div`
  ${body2}
  span {
    padding-right: 7px;
  }
`;
