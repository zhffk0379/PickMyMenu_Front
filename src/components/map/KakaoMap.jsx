import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";

const KakaoMap = ({ places, center }) => {
  const mapRef = useRef(null);
  const [selectedPlaceUrl, setSelectedPlaceUrl] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
        console.log(places);

        // 현재 위치 마커
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(center.latitude, center.longitude),
          map: map,
          image: new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new window.kakao.maps.Size(35, 40)),

        });

        places.forEach(place => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
            title: place.place_name,
            clickable: true,
          });

          // 커스텀 오버레이 생성
          const content = `
            <div style="
              position: relative;
              bottom: 35px;
              left: -50%;
              transform: translateX(-50%);
              background: white;
              border: 1px solid #ccc;
              border-radius: 10px;
              padding: 5px 10px;
              box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
              font-size: 12px;
              white-space: nowrap;
              text-align: center;">
              ${place.place_name}
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position,
            content,
            xAnchor:-0.5,
            yAnchor: -1.3,
            map:map
          })
          window.kakao.maps.event.addListener(marker, "click", () => {
            setSelectedPlaceUrl(place.place_url);
            setIsPanelOpen(true);
            customOverlay.setMap(map);
          });
          // window.kakao.maps.event.addListener(map, "click", () => {
          //   customOverlay.setMap(null);
          // })

        });
      });
    };
  }, [places, center]);

  return (
    <div style={{position: "relative", width: "100%", height: "100vh"}}>
      <div ref={mapRef} style={{width: '95%', height: '400px', margin: "0 40px"}}/>

      {/* 슬라이드 패널 */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isPanelOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          backgroundColor: "white",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsPanelOpen(false)}
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        {/* 상세 정보 */}
        {selectedPlaceUrl ? (
          <iframe
            src={selectedPlaceUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="카카오맵 상세 정보"
          />
        ) : (
          <p>선택된 장소가 없습니다.</p>
        )}
      </motion.div>
    </div>

  );
};

export default KakaoMap;
