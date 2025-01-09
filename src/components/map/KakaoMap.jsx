import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';  // axios 추가

const KakaoMap = ({ places, center }) => {
    const mapRef = useRef(null);
    const [selectedPlaceUrl, setSelectedPlaceUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeImages, setPlaceImages] = useState({});  // 각 장소의 이미지 URL을 저장
    const location = useLocation();
    const { keyword } = location.state || {};  // state가 없으면 빈 객체로 처리
    const navigate = useNavigate();

    // useEffect(() => {
    //     // 이미지 크롤링
    //     const fetchPlaceImages = async () => {
    //         const updatedPlaceImages = {};
    //         for (const place of places) {
    //             try {
    //                 const response = await axios.get(`http://localhost:9005/placeImageCrawl?query=${place.id}`);
    //                 updatedPlaceImages[place.id] = response.data.image_url || null;
    //             } catch (error) {
    //                 console.error("Error fetching image:", error);
    //                 updatedPlaceImages[place.id] = null;
    //             }
    //         }
    //         setPlaceImages(updatedPlaceImages);  // 이미지 URL 저장
    //     };
    //
    //     fetchPlaceImages();
    // }, [places]);

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

    const handleReselect = () => {
        navigate('/parent'); // "다시 선택하기" 버튼 클릭 시 /parent 페이지로 이동
    };

    const handlePlaceClick = (place) => {
        setSelectedPlaceUrl(place.place_url);
        setIsModalOpen(true);
    };

    return (
        <div style={{display: "flex", width: "100%", height: "100vh"}}>
            <div style={{
                width: '35%',
                height: '100%',
                overflowY: 'auto',
                padding: '20px',
                boxSizing: 'border-box',
                position: 'relative',
                zIndex: 10,
            }}>
                <h3 style={{textAlign: 'center', marginBottom: '15px', fontSize: '1.2em'}}>'{keyword}' 검색 결과</h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {places.map((place, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => handlePlaceClick(place)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '15px',
                                    marginBottom: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: '#f9f9f9',
                                    transition: '0.3s',
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginRight: '10px'
                                }}>
                                    {place.image_url ? (
                                        <img src={place.image_url} alt={place.place_name}
                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: '#ddd',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#fff',
                                        }}>None</div>
                                    )}
                                </div>
                                <div>
                                    <div style={{fontWeight: 'bold', fontSize: '1em'}}>{place.place_name}</div>
                                    <div style={{fontSize: '0.9em', color: '#555'}}>{place.address_name}</div>
                                    <div style={{fontSize: '0.8em', color: '#888'}}>{place.phone}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div ref={mapRef} style={{width: '65%', height: '100%'}}/>

            <button
                onClick={handleReselect}
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    zIndex: 10,
                    fontSize: "16px",
                }}
            >
                다시 선택하기
            </button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        transition={{type: "spring", stiffness: 100}}
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
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "40px",
                                    color: "black",
                                    cursor: "pointer",
                                    textShadow: "1px 1px 3px white",
                                }}
                            >
                                &times;
                            </button>

                            {selectedPlaceUrl ? (
                                <iframe
                                    src={selectedPlaceUrl}
                                    style={{width: "100%", height: "100%", border: "none"}}
                                    title="Place Info"
                                    frameBorder="0"
                                />
                            ) : (
                                <p>장소 정보가 없습니다.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KakaoMap;
