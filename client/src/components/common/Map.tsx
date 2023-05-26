/* eslint-disable no-new */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from './Loading';
import { CenterLocation } from '@/store/centerLocation';
import { addBounds } from '@/store/mapBounds';
import { RenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';
import { debounce } from 'lodash';

export default function Map() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<naver.maps.Marker[] | void[]>([]);
  const mapElement = useRef(null);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const center = useSelector<ReducerType, CenterLocation>((state) => state.centerLocation);
  const renderList = useSelector<ReducerType, RenderList>((state) => state.renderList);

  // 지도 그리기
  const drawMap = useCallback(() => {
    setIsLoading(true);
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    if (!latitude || !longitude) return;
    if (!center.latitude || !center.longitude) return;
    const centerLocation = new naver.maps.LatLng(center.latitude - 0.001, center.longitude);
    const mapOptions: naver.maps.MapOptions = {
      center: centerLocation,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
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
    setIsLoading(false);
    const bounds = newMap.getBounds();
    // 지도 바운더리 반영
    dispatch(
      addBounds({
        min: { lat: bounds.getMin().y, lng: bounds.getMin().x },
        max: { lat: bounds.getMax().y, lng: bounds.getMax().x },
      })
    );
  }, [latitude, longitude, center]);

  // 지도에 표시할 마커 그리기
  const drawPlaceMarker = useCallback(() => {
    if (!map) return;
    setMarkers(markers.map((mark) => mark && mark.setMap(null)));
    setMarkers(
      renderList.map((place) => {
        const loc = new naver.maps.LatLng(place.lat, place.lng);
        return new naver.maps.Marker({
          position: loc,
          map,
        });
      })
    );
  }, [map, renderList.length]);

  useEffect(() => {
    if (!latitude || !longitude) return;
    drawMap();
  }, [latitude, longitude, center]);

  // bounds변경 감지 이벤트 붙이기
  useEffect(() => {
    if (!map) return;
    drawPlaceMarker();
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
    // eslint-disable-next-line consistent-return
    return () => naver.maps.Event.clearListeners(map, 'bounds_changed');
  }, [map, renderList.length]);

  // 검색 혹은 특정 장소 클릭시 지도 가운데 위치 변경 -> 해당 장소 마커 표시
  useEffect(() => {
    if (!map || !center.latitude || !center.longitude) return;
    if (longitude === center.longitude && latitude === center.latitude) return;
    new naver.maps.Marker({
      position: new naver.maps.LatLng(center.latitude, center.longitude),
      map,
      icon: {
        content: `<div class="search-position"><div /></div>`,
      },
    });
  }, [center, map]);

  return (
    <Wrapper>
      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
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

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    height: 60%;
  }
`;

const MapContainer = styled.div`
  min-height: 100vh;
`;
