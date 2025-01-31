import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const Restaurant = () => {
    const location = useLocation();
    const { place, resultMenuId } = location.state || {}; // place와 resultMenuId를 추출
    const [currentPosition, setCurrentPosition] = useState({ lat: null, lon: null });
    const navigate = useNavigate();

    const mapRef = useRef(null); // 지도 DOM을 참조하기 위한 ref
    const mapInstance = useRef(null); // 지도 인스턴스를 저장하기 위한 ref
    const markers = useRef([]); // 마커 배열을 저장할 ref
    const scriptLoaded = useRef(false); // 스크립트 로드 상태를 추적하기 위한 ref
    const mapInitialized = useRef(false); // 지도 초기화 상태 추적용 ref

    useEffect(() => {
        // 현재 위치를 가져오는 함수
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        setCurrentPosition({ lat: latitude, lon: longitude });
                    },
                    (error) => {
                        console.error("위치 정보를 가져오는 데 실패했습니다.", error);
                    }
                );
            } else {
                console.error("Geolocation을 사용할 수 없습니다.");
            }
        };
        getCurrentPosition();  // 컴포넌트 마운트 시 호출

        // 카카오 지도 SDK가 이미 로드되었는지 확인
        if (!scriptLoaded.current) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
            document.head.appendChild(script);

            script.onload = () => {
                scriptLoaded.current = true; // 스크립트 로드 완료 상태로 설정
                window.kakao.maps.load(() => {
                    // 지도 인스턴스가 이미 생성되었으면 다시 생성하지 않음
                    if (!mapInitialized.current) {
                        mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
                            center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon),
                            level: 4, // 지도의 확대 레벨
                        });
                        mapInitialized.current = true; // 지도 초기화 상태 변경
                    }

                    // 기존 마커가 있다면 모두 삭제
                    markers.current.forEach(marker => marker.setMap(null));
                    markers.current = []; // 마커 배열 초기화

                    // 1. 출발 마커 (현재 위치)
                    const startSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 출발 마커 이미지 주소
                    const startSize = new window.kakao.maps.Size(30, 40); // 출발 마커 이미지 크기
                    const startOption = {
                        offset: new window.kakao.maps.Point(15, 43) // 출발 마커 이미지에서 마커의 좌표에 일치시킬 좌표
                    };

                    const startImage = new window.kakao.maps.MarkerImage(startSrc, startSize, startOption);
                    const startPosition = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon);
                    const startMarker = new window.kakao.maps.Marker({
                        map: mapInstance.current,
                        position: startPosition,
                        image: startImage,
                    });
                    markers.current.push(startMarker); // 출발 마커 배열에 추가

                    const startContent = `
                        <div style="position: relative; bottom: 35px; left: -50%; transform: translateX(-50%);
                                    background: white; border: 1px solid #ccc; border-radius: 10px;
                                    padding: 5px 10px; box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
                                    font-size: 12px; white-space: nowrap; text-align: center;">
                            내 위치
                        </div>
                    `;
                    const startCustomOverlay = new window.kakao.maps.CustomOverlay({
                        position: startPosition,
                        content: startContent,
                        xAnchor: -0.5,
                        yAnchor: -1.3,
                        map: mapInstance.current
                    });

                    // 2. 도착 마커 (place에서 받은 y, x 좌표)
                    const arriveSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png';
                    const arriveSize = new window.kakao.maps.Size(50, 45);
                    const arriveOption = {
                        offset: new window.kakao.maps.Point(15, 43)
                    };

                    const arriveImage = new window.kakao.maps.MarkerImage(arriveSrc, arriveSize, arriveOption);
                    const arrivePosition = new window.kakao.maps.LatLng(place.y, place.x); // place.y와 place.x 사용
                    const arriveMarker = new window.kakao.maps.Marker({
                        map: mapInstance.current,
                        position: arrivePosition,
                        image: arriveImage,
                    });
                    markers.current.push(arriveMarker); // 도착 마커 배열에 추가

                    window.kakao.maps.event.addListener(arriveMarker, 'click', () => {
                        openKakaoMapRoute()
                    });

                    function openKakaoMapRoute() {
                        const url = `https://m.map.kakao.com/actions/routeView?ex=484093&ey=1107380&endLoc=${place.place_name}&ids=%2CP${place.id}`;
                        window.open(url, '_blank');
                    }
                    window.openKakaoMapRoute = openKakaoMapRoute;

                    const arriveContent = `
                        <div style="position: relative; bottom: 35px; left: -50%; transform: translateX(-50%);
                                    background: white; border: 1px solid #ccc; border-radius: 10px;
                                    padding: 5px 10px; box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
                                    font-size: 12px; white-space: nowrap; text-align: center;" onclick="openKakaoMapRoute()">
                            ${place.place_name}
                        </div>
                    `;
                    const arriveCustomOverlay = new window.kakao.maps.CustomOverlay({
                        position: arrivePosition,
                        content: arriveContent,
                        xAnchor: -0.5,
                        yAnchor: -1.3,
                        map: mapInstance.current
                    });

                });
            };
        }
    }, [currentPosition, place]); // currentPosition과 place가 바뀔 때마다 실행


    const handleNavigate = () => {
        navigate('/myRestaurantInfo');  // '/review' 페이지로 이동
    };


    return (
        <div>
            <div id="map" ref={mapRef} style={{width: '100%', height: 'calc(100vh - 220px)'}}></div>

            <div
                style={{
                    display: 'block',
                    margin: '0 auto',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: 'black',
                    marginTop: '20px'
                }}
            >
                식사는 맛있게 하셨나요? 식당이 마음에 드셨다면
            </div>
            <button
                onClick={handleNavigate}
                style={{
                    display: 'block',        // 블록 레벨 요소로 만들어서 가로 전체 차지
                    margin: '0 auto',        // 좌우 가운데 정렬
                    padding: '8px 20px',    // 버튼 안쪽 여백
                    fontSize: '16px',        // 글씨 크기
                    backgroundColor: '#4CAF50', // 버튼 배경색
                    color: 'white',          // 버튼 글씨 색
                    border: 'none',          // 테두리 없애기
                    borderRadius: '5px',     // 둥근 모서리
                    cursor: 'pointer',      // 마우스 커서 변경
                    marginTop: '10px'
                }}
            >
                리뷰 등록하기
            </button>
        </div>
    );
};

export default Restaurant;
