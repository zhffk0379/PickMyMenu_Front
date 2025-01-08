import React from 'react';
import KakaoMap from '../components/map/KakaoMap';
import usePlaces from '../hooks/usePlaces';
import useGeolocation from '../hooks/useGeolocation';
import { useLocation } from 'react-router-dom';

const MapPage = () => {
    const { location, error: locationError } = useGeolocation();
    const { state } = useLocation();  // MapPage로 전달된 state를 받음
    const keyword = state?.keyword;  // 전달된 keyword 값을 받음

    const { places, loading, error: placesError } = usePlaces(keyword, location);

    if (locationError) return <div>Error: {locationError}</div>;
    if (!location) return <div>Getting your location...</div>;
    if (loading) return <div>Loading places...</div>;
    if (placesError) return <div>Error: {placesError}</div>;

    return (
        <div>
            <KakaoMap places={places} center={location} />
        </div>
    );
};

export default MapPage;
