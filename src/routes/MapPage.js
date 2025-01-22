import React from 'react';
import KakaoMap from '../components/map/KakaoMap';
import usePlaces from '../hooks/usePlaces';
import useGeolocation from '../hooks/useGeolocation';
import { useLocation } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';

const MapPage = () => {
    const { location, error: locationError } = useGeolocation();
    const { state } = useLocation(); // MapPage로 전달된 state를 받음
    const keyword = state?.keyword; // 전달된 keyword 값을 받음
    const resultMenuId = state?.resultMenuId; // resultMenuId 값도 받음
    const { places, loading, error: placesError } = usePlaces(keyword, location);

    const renderSpinner = (message) => (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="text-center">
              <Spinner animation="border" variant="primary" role="status" />
              <div className="mt-3">{message}</div>
          </div>
      </Container>
    );

    if (locationError) return renderSpinner(`Error: ${locationError}`);
    if (!location) return renderSpinner("Getting your location...");
    if (loading) return renderSpinner("Loading places...");
    if (placesError) return renderSpinner(`Error: ${placesError}`);

    return (
      <div>
          <KakaoMap places={places} center={location} resultMenuId={resultMenuId} />
      </div>
    );
};

export default MapPage;
