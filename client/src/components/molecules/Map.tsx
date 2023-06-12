/* eslint-disable consistent-return */
/* eslint-disable no-new */
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import styled from '@emotion/styled';
import { CenterLocation } from '@/store/centerLocation';
import { addBounds } from '@/store/mapBounds';
import { PlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';

export default function Map() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<naver.maps.Marker[] | void[]>([]);
  const mapElement = useRef(null);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const center = useSelector<ReducerType, CenterLocation>((state) => state.centerLocation);
  const placeList = useSelector<ReducerType, PlaceList>((state) => state.placeList);

  // 지도 그리기
  const drawMap = useCallback(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    if (!latitude || !longitude) return;
    if (!center.latitude || !center.longitude) return;
    const centerLocation = new naver.maps.LatLng(center.latitude - 0.001, center.longitude);
    const mapOptions: naver.maps.MapOptions = {
      center: centerLocation,
      zoom: 17,
    };
    const newMap = new naver.maps.Map(mapElement.current, mapOptions);
    // 사용자 위치 표시
    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: newMap,
      icon: {
        content: `<div class="user-position"><div /></div>`,
      },
    });
    setMap(newMap);
    const bounds = newMap.getBounds();
    // 지도 바운더리 반영
    dispatch(
      addBounds({
        min: { lat: bounds.getMin().y, lng: bounds.getMin().x },
        max: { lat: bounds.getMax().y, lng: bounds.getMax().x },
      })
    );
  }, [latitude, longitude]);

  // 지도에 표시할 마커 그리기
  const drawPlaceMarker = useCallback(() => {
    if (!map) return;
    setMarkers(
      placeList.map((place) => {
        const loc = new naver.maps.LatLng(place.lat, place.lng);
        const mark = new naver.maps.Marker({
          position: loc,
          map,
        });
        naver.maps.Event.addListener(mark, 'click', () => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, id: place.id, type: place.type.code },
          });
        });
        return mark;
      })
    );
  }, [map, placeList]);

  // 지도 업데이트
  useEffect(() => {
    if (!latitude || !longitude) return;
    if (center.latitude === 0 || center.longitude === 0) return;
    drawMap();
  }, [latitude, longitude]);

  useEffect(() => {
    if (!map) return;
    if (!center.latitude || !center.longitude) return;
    if (center.latitude === 0 || center.longitude === 0) return;
    const centerLocation = new naver.maps.LatLng(center.latitude - 0.001, center.longitude);
    const mapOptions: naver.maps.MapOptions = {
      center: centerLocation,
      zoom: 17,
    };
    map.setOptions(mapOptions);
  }, [map, center]);

  // 마커 업데이트
  useEffect(() => {
    if (!map) return;
    drawPlaceMarker();
    return () => markers.forEach((mark) => naver.maps.Event.clearListeners(mark, 'click'));
  }, [map, placeList]);

  // bounds변경 감지 이벤트 붙이기
  useEffect(() => {
    if (!map) return;
    naver.maps.Event.addListener(
      map,
      'bounds_changed',
      debounce(() => {
        const bounds = map.getBounds();
        dispatch(
          addBounds({
            min: { lat: bounds.getMin().y, lng: bounds.getMin().x },
            max: { lat: bounds.getMax().y, lng: bounds.getMax().x },
          })
        );
      }, 1000)
    );
    return () => naver.maps.Event.clearListeners(map, 'bounds_changed');
  }, [map]);

  return (
    <Wrapper>
      <MapContainer ref={mapElement} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    margin-top: 4px;
  }
`;

const MapContainer = styled.div`
  min-height: 100vh;
`;
