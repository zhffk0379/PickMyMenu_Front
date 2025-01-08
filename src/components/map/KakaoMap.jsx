import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const KakaoMap = ({ places, center }) => {
    const mapRef = useRef(null);
    const [selectedPlaceUrl, setSelectedPlaceUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(center.latitude, center.longitude),
                    map: map,
                    image: new window.kakao.maps.MarkerImage(
                        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                        new window.kakao.maps.Size(30, 40)
                    ),
                });

                places.forEach(place => {
                    const position = new window.kakao.maps.LatLng(place.y, place.x);
                    const marker = new window.kakao.maps.Marker({
                        position: position,
                        map: map,
                        title: place.place_name,
                        clickable: true,
                    });

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
                        xAnchor: -0.5,
                        yAnchor: -1.3,
                        map: map
                    });

                    window.kakao.maps.event.addListener(marker, "click", () => {
                        if (place.place_url.startsWith("http://")) {
                            place.place_url = place.place_url.replace("http://", "https://");
                            place.place_url = place.place_url.replace(".com/", ".com/m/");

                            console.log(place.place_url);
                        }
                        setSelectedPlaceUrl(place.place_url);
                        setIsModalOpen(true);
                        customOverlay.setMap(map);
                    });
                });
            });
        };
    }, [places, center]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            {/* 지도 컨테이너 */}
            <div
                ref={mapRef}
                style={{
                    width: '95%',
                    height: '80vh',
                    maxWidth: '1200px',
                    margin: "0 auto"
                }}
            />

            {/* 전체화면 모달 */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                width: "90%",
                                maxWidth: "800px",
                                height: "80%",
                                backgroundColor: "white",
                                borderRadius: "15px",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            {/* 닫기 버튼 */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "40px",
                                    color: "black", // X 버튼을 검정색으로
                                    cursor: "pointer",
                                    textShadow: "1px 1px 3px white", // 하얀색 그림자 효과 추가
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
                                <p style={{ textAlign: "center", marginTop: "20px" }}>선택된 장소가 없습니다.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KakaoMap;
