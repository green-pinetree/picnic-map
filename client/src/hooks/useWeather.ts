import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { ReducerType } from '@/store/rootReducer';
import { UserLocation } from '@/store/userLocation';
import { fetchWeatherList } from '@/store/weather';

export function useWeather(){
    const dispatch = useDispatch<AppDispatch>();
    const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
        (state) => state.userLocation
    );
    useEffect(() => {
        if (!longitude || !latitude) return;
        dispatch(fetchWeatherList({ longitude, latitude }));
    }, [latitude, longitude]);
}