import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import DateDropDown from './DateDropDown';
import { ReducerType } from '@/store/rootReducer';
import { WeatherListSliceState } from '@/store/weather';
import { SKY, AIRGRADE } from '@/constants/weather';
import { body2 } from '@/styles/font';

export default function DateInfo() {
  const { current } = useSelector<ReducerType, WeatherListSliceState>((state) => state.weather);
  return (
    <TodayInfo id="date-info">
      <DateDropDown />
      {current && (
        <TodayWeather>
          <span>날씨: {SKY[`${current.skyCode}`] || current.skyName}</span>
          <span>미세먼지: {AIRGRADE[`${current.airGradeCode}`]}</span>
        </TodayWeather>
      )}
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

const TodayWeather = styled.div`
  ${body2}
  span {
    padding-right: 7px;
  }
`;
