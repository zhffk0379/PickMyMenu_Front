// src/routes/MapPage.js
import React from 'react';
import Map from '../components/Map';

/**
 * MapPage 컴포넌트
 * - 지도 페이지 역할을 합니다.
 * - Map 컴포넌트를 포함하여 네이버 지도를 표시합니다.
 */
const MapPage = () => {
  return (
    <div>
      <h1>지도 페이지</h1>
      <Map />
    </div>
  );
};

export default MapPage;
