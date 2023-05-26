/* eslint-disable no-new */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from './Loading';
import { CenterLocation, addCenter } from '@/store/centerLocation';
import { RenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { SearchListSliceState } from '@/store/searchList';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';

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
  const { searchList } = useSelector<ReducerType, SearchListSliceState>(
    (state) => state.searchList
  );

  const drawMap = useCallback(() => {
    setIsLoading(true);
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    if (!latitude || !longitude) return;
    if (!center.latitude || !center.longitude) return;
    const centerLocation = new naver.maps.LatLng(center.latitude, center.longitude);
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
  }, [latitude, longitude, center]);

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
  }, [map]);

  useEffect(() => {
    if (!latitude || !longitude) return;
    drawMap();
  }, [latitude, longitude, center]);

  useEffect(() => {
    drawPlaceMarker();
  }, [map]);

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

  useEffect(() => {
    const searchLocation = searchList.filter((node) => node.lat !== 0 && node.lng !== 0);
    if (searchLocation.length !== 0)
      dispatch(addCenter({ latitude: searchLocation[0].lat, longitude: searchLocation[0].lng }));
    else dispatch(addCenter({ latitude, longitude }));
  }, [searchList.length]);

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
