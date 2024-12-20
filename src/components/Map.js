import React, {useEffect, useState} from "react";

/** global naver */ // naver 객체가 전역 객체임을 명시
const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false); // 지도 로딩 상태를 관리

  useEffect(() => {
    /**
     * 네이버 지도 API 스크립트를 동적으로 추가합니다.
     * - 스크립트가 로드되면 지도와 마커, 인포윈도우를 초기화합니다.
     */
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 지도 중심 좌표 설정
        zoom: 10, // 초기 줌 레벨 설정
      });

      /**
       * 마커 추가
       * - 서울시청 위치에 마커를 표시합니다.
       */
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.9780),
        map: map,
      });

      /**
       * 인포윈도우 추가
       * - 마커 클릭 시 표시될 내용을 설정합니다.
       */
      const infoWindow = new naver.maps.InfoWindow({
        content: '<div style="padding:10px;">서울시청</div>',
      });

      /**
       * 마커 클릭 이벤트 리스너
       * - 마커를 클릭하면 인포윈도우를 엽니다.
       */
      naver.maps.Event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });

      setMapLoaded(true); // 지도 로딩 완료
    };
    document.head.appendChild(script);

    /**
     * 컴포넌트 언마운트 시 스크립트를 제거하여 메모리 누수를 방지합니다.
     */
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {!mapLoaded && <p>지도를 로드 중입니다...</p>} {/* 로딩 상태 표시 */}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;