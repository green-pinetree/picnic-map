/* eslint-disable no-new */
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { UserLocation, addLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';
import styled from '@emotion/styled';

export default function Map() {
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
    [mapElement]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      dispatch(addLocation({ ...location }));
      drawMap({ ...location });
    });
  }, []);
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
