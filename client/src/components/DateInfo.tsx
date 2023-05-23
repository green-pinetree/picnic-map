import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateDropDown from './common/DateDropDown';
import { SKY, AIRGRADE } from '@/constants/weather';
import { ReducerType } from '@/store/rootReducer';
import { UserLocation } from '@/store/userLocation';
import { WeatherListSliceState, fetchWeatherList } from '@/store/weather';
import { body2 } from '@/styles/font';
import styled from '@emotion/styled';

export default function DateInfo() {
  const dispatch = useDispatch();
  const { current } = useSelector<ReducerType, WeatherListSliceState>((state) => state.weather);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  useEffect(() => {
    if (!longitude || !latitude) return;
    dispatch(fetchWeatherList({ longitude, latitude }));
  }, [latitude, longitude]);
  return (
    <TodayInfo>
      <DateDropDown />
      <TodayWeather>
        <span>날씨: {SKY[`${current?.skyCode || 1}`] || current?.skyName}</span>
        <span>미세먼지: {AIRGRADE[`${current?.airGradeCode || 1}`]}</span>
      </TodayWeather>
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
