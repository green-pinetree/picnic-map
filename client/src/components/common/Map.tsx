/* eslint-disable no-new */
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from './Loading';
import { RenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { SearchListSliceState } from '@/store/searchList';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';

export default function Map() {
  const router = useRouter();
  const { search } = router.query as { search: string | undefined };
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<naver.maps.Marker[] | void[]>([]);
  const mapElement = useRef(null);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const renderList = useSelector<ReducerType, RenderList>((state) => state.renderList);
  const { searchList } = useSelector<ReducerType, SearchListSliceState>(
    (state) => state.searchList
  );

  const drawMap = useCallback(
    (center: { lat: number; lng: number }) => {
      setIsLoading(true);
      const { naver } = window;
      if (!mapElement.current || !naver) return;
      if (!latitude || !longitude) return;
      const centerLocation = new naver.maps.LatLng(center.lat, center.lng);
      const mapOptions: naver.maps.MapOptions = {
        center: centerLocation,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const newMap = new naver.maps.Map(mapElement.current, mapOptions);
      if (center.lat === latitude && center.lng === longitude) {
        new naver.maps.Marker({
          position: centerLocation,
          map: newMap,
          icon: {
            content: `<div class="user-position"><div /></div>`,
          },
        });
      } else {
        new naver.maps.Marker({
          position: centerLocation,
          map: newMap,
          icon: {
            content: `<div class="search-position"><div /></div>`,
          },
        });
      }
      setMap(newMap);
      setIsLoading(false);
    },
    [latitude, longitude, searchList.length]
  );

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
    if (!longitude || !latitude) return;
    if (search) {
      const center = searchList.filter((node) => node.lat !== 0 && node.lng !== 0);
      if (center.length !== 0) drawMap({ lat: center[0].lat, lng: center[0].lng });
      else drawMap({ lat: latitude, lng: longitude });
      return;
    }
    drawMap({ lat: latitude, lng: longitude });
  }, [latitude, longitude, search, searchList.length]);

  useEffect(() => {
    drawPlaceMarker();
  }, [map]);

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
