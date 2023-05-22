/* eslint-disable no-new */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from './Loading';
import { UserLocation, addLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';
import styled from '@emotion/styled';

export default function Map() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const mapElement = useRef(null);

  const drawMap = useCallback(
    ({ longitude, latitude }: UserLocation) => {
      const { naver } = window;
      if (!mapElement.current || !naver) return;
      const location = new naver.maps.LatLng(latitude, longitude);
      const mapOptions: naver.maps.MapOptions = {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map,
      });
    },
    [mapElement, isLoading]
  );

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      dispatch(addLocation({ ...location }));
      drawMap({ ...location });
      setIsLoading(false);
    });
  }, []);
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
