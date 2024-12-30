import React from 'react';
import KakaoMap from '../components/map/KakaoMap';
import usePlaces from '../hooks/usePlaces';
import useGeolocation from '../hooks/useGeolocation';

const MapPage = () => {
  const { location, error: locationError } = useGeolocation();
  const { places, loading, error: placesError } = usePlaces(location);

  if (locationError) return <div>Error: {locationError}</div>;
  if (!location) return <div>Getting your location...</div>;
  if (loading) return <div>Loading places...</div>;
  if (placesError) return <div>Error: {placesError}</div>;

  return (
    <div>
      <h1>Places Near You</h1>
      <KakaoMap places={places} center={location} />
    </div>
  );
};

export default MapPage;
