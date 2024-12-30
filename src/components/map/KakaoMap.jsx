import React, { useEffect, useRef } from 'react';

const KakaoMap = ({ places, center }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(center.latitude, center.longitude),
          level: 3
        });

        // 현재 위치 마커
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(center.latitude, center.longitude),
          map: map,
          image: new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new window.kakao.maps.Size(70, 80)),

        });

        places.forEach(place => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map
          });

          // 커스텀 오버레이 생성
          const content = `
    <div style="
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 15px;
      padding: 5px 10px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">
      ${place.place_name}
    </div>
  `;
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position,
            content,
            map:map
          })

        });
      });
    };
  }, [places, center]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default KakaoMap;
