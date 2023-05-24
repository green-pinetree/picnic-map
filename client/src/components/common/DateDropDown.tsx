import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { SKY, AIRGRADE } from '@/constants/weather';
import { ReducerType } from '@/store/rootReducer';
import { WeatherListSliceState, Weather, addWeather } from '@/store/weather';
import BREAK_POINT from '@/styles/breakpoint';
import { body1, body2 } from '@/styles/font';
import { buttonStyle } from '@/styles/mixin';
import { DROP_DOWN } from '@/styles/zIndex';

export default function DateDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { weatherList, current } = useSelector<ReducerType, WeatherListSliceState>(
    (state) => state.weather
  );
  const clickDateHandler = (weather: Weather) => {
    dispatch(addWeather({ ...weather }));
    setIsOpen(false);
  };
  return (
    <Wrapper>
      <Date
        role="button"
        id="date-trigger"
        aria-label="Date dropdown trigger"
        aria-haspopup="true"
        aria-controls="date-dropdown"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {current?.date}
      </Date>
      {isOpen && (
        <MenuList aria-labelledby="date-trigger" id="date-dropdown">
          {weatherList.map((weather) => (
            <Menu
              key={weather.date + weather.skyName}
              onClick={() => clickDateHandler(weather)}
              type="button"
            >
              <div>{weather.date}</div>
              <div>
                <div>날씨: {SKY[`${weather.skyCode}`] || weather.skyName}</div>
                <div>미세먼지: {AIRGRADE[`${weather.airGradeCode}`]}</div>
              </div>
            </Menu>
          ))}
        </MenuList>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Date = styled.button`
  ${body1}
  width: fit-content;
  text-align: right;
  border-radius: 10px;
  border: 0;
  background-color: ${({ theme }) => theme.color.white};
  ${buttonStyle}
`;

const MenuList = styled.div`
  position: absolute;
  z-index: ${DROP_DOWN};
  top: 25px;
  right: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 10px;
`;

const Menu = styled.button`
  padding: 10px 20px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  background-color: ${({ theme }) => theme.color.white};
  ${buttonStyle}
  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }
  &:last-of-type {
    border-bottom: 0px;
    border-radius: 0 0 10px 10px;
  }
  div {
    width: 190px;
    text-align: left;
    height: 20px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    ${body2}
    div:first-of-type {
      margin-right: 15px;
    }
    @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
      height: 14px;
    }
  }
`;
