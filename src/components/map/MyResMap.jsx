import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Modal, Button, Form, Rating, Container, Spinner} from 'react-bootstrap';
import { FaStar } from 'react-icons/fa'; // 별 아이콘
import './MyResMap.css'
import axios from "axios";


const MyResMap = ({ restaurantData }) => {  // props를 제대로 받도록 수정
    const mapRef = useRef(null);
    const [selectedPlaceUrl, setSelectedPlaceUrl] = useState(null);
    const [placeName, setPlaceName] = useState(null);
    const [menu, setMenu] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [roadAddress, setRoadAddress] = useState(null);
    const [id, setId] = useState(null);
    const [resultMenuId, setResultMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false); // 이미지 업로드 모달 상태
    const [showList, setShowList] = useState(false);
    const [rating, setRating] = useState(5); // 별점 상태
    const [isImageUploading, setIsImageUploading] = useState(false);  // 이미지 업로드 상태
    const pythonUrl = process.env.REACT_APP_PYTHON_API_URL;

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    // 서울 위치로 초기화
                    const map = new window.kakao.maps.Map(mapRef.current, {
                        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 위치
                        level: 7, // zoom level
                    });

                    if (Array.isArray(restaurantData)) {
                        restaurantData.forEach((restaurant) => {
                            // x, y 값이 있는 데이터만 마커 추가
                            if (restaurant && restaurant.x && restaurant.y) {
                                const latitude = restaurant.y;
                                const longitude = restaurant.x;

                                const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
                                const marker = new window.kakao.maps.Marker({
                                    position: markerPosition,
                                    map: map,
                                    title: restaurant.place_name,
                                    clickable: true,
                                });

                                // 마커에 정보창을 추가하려면 아래와 같이 추가
                                const content = `
                                    <div style="position: relative; bottom: 35px; left: -50%; transform: translateX(-50%);
                                        background: white; border: 1px solid #ccc; border-radius: 10px;
                                        padding: 5px 10px; box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
                                        font-size: 12px; white-space: nowrap; text-align: center;">
                                        ${restaurant.place_name}
                                    </div>
                                `;

                                const customOverlay = new window.kakao.maps.CustomOverlay({
                                    position: markerPosition,
                                    content,
                                    xAnchor: -0.5,
                                    yAnchor: -1.3,
                                    map: map
                                });

                                // 마커 클릭 시 정보창 표시
                                window.kakao.maps.event.addListener(marker, "click", () => {
                                    if (restaurant.place_url.startsWith("http://")) {
                                        restaurant.place_url = restaurant.place_url.replace("http://", "https://");
                                        restaurant.place_url = restaurant.place_url.replace(".com/", ".com/m/");
                                    }
                                    setIsModalOpen(true);
                                    customOverlay.setMap(map);
                                    setSelectedPlaceUrl(restaurant.place_url);
                                    setPlaceName(restaurant.place_name);
                                    setMenu(restaurant.menu);
                                    setPhone(restaurant.phone)
                                    setAddress(restaurant.address_name)
                                    setRoadAddress(restaurant.road_address_name)
                                    setId(restaurant.id)
                                    setResultMenuId(restaurant.result_menu_id)
                                });
                            }
                        });
                    }
                });
            } else {
                console.error("카카오 맵 API가 로드되지 않았습니다.");
            }
        };
    }, [restaurantData]);

    // 리스트에서 리뷰 등록하기 클릭시 리뷰 모달 열기
    const ReviewModalOpen = () => {
        setIsModalOpen(false);
        setIsImageUploadModalOpen(true)
        // setIsReviewModalOpen(true);
    }

    // 리뷰쓰기 버튼 클릭 함수
    const handleApiCall = (resData) => {
        // setIsReviewModalOpen(true);
        setPlaceName(resData.place_name)
        setId(resData.id)
        setMenu(resData.menu)
        setPhone(resData.phone)
        setAddress(resData.address_name)
        setRoadAddress(resData.road_address_name)
        setResultMenuId(resData.result_menu_id)

        setIsImageUploadModalOpen(true)
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsImageUploading(true);  // 업로드 시작 시 true로 설정
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("placeName", placeName);
                formData.append("phone", phone);
                formData.append("address", address);
                formData.append("roadAddress", roadAddress);

                const response = await axios.post(`${pythonUrl}/image`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // 서버 응답 처리
                if (response.data === true) {
                    alert("확인이 완료되었습니다. 리뷰를 작성해주세요.");
                    setIsImageUploadModalOpen(false);  // 이미지 업로드 모달 닫기
                    setIsReviewModalOpen(true);  // 리뷰 모달 열기
                } else {
                    alert("업체명 혹은 주소가 일치하지 않습니다. 다시 시도해주세요.");
                    setIsImageUploadModalOpen(false);  // 이미지 업로드 모달 재오픈
                }
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
            } finally {
                setIsImageUploading(false);  // 업로드 완료 후 false로 설정
            }
        }
    };

    // 리뷰등록 함수
    const handleReviewSubmit = async ()=>{
        const content = document.getElementById("reviewText").value;
        const ratingCount = rating;
        const idx = id;
        const resultId = resultMenuId;

        const data = {
            content: content,
            rating: ratingCount,
            restaurantId: idx,
            resultMenuId: resultId,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/review/create`,// 실제 API 주소로 변경
                data,
                {
                    withCredentials: true, // 쿠키를 포함시킴
                    headers: {
                        "Content-Type": "application/json", // JSON 형식으로 보냄
                    },
                }
            );
            console.log(response)
            // 성공 시 처리
            if (response.status === 200) {
                alert("리뷰가 등록되었습니다!");
                setIsReviewModalOpen(false); // 모달 닫기
            } else {
                alert("리뷰 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("리뷰 등록 중 오류 발생:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };


    const renderSpinner = (message) => (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" role="status" />
                <div className="mt-3">{message}</div>
            </div>
        </Container>
    );


    return (
        <div className="map-container">
            {/* 지도 */}
            <div ref={mapRef} className="map"/>

            {/* '리스트 보기' 버튼 */}
            <button
                onClick={() => setShowList(prev => !prev)}
                className="toggle-button"
            >
                {showList ? '=' : '='}
            </button>


            {showList && (
                <div className="list-container">
                    <h3 className="visit-history-title">
                        방문 기록
                    </h3>
                    <ul className="restaurant-list">
                        {restaurantData.map((resData, index) => (
                            <li
                                key={index}
                                className="restaurant-item"
                            >
                                <div className="restaurant-image-container">
                                    {resData.image_url ? (
                                        <img
                                            src={resData.image_url}
                                            alt={resData.place_name}
                                            className="restaurant-image"
                                        />
                                    ) : (
                                        <div className="no-image">None</div>
                                    )}
                                </div>
                                <div>
                                    <div className="restaurant-details">
                                        {resData.place_name} · <span className="restaurant-menu">{resData.menu}</span>
                                    </div>
                                    <div className="restaurant-address">{resData.address_name}</div>
                                    <div style={{marginTop: '5px'}}>
                                        {resData.isReviewed == 0 ? (
                                            <button
                                                onClick={() => handleApiCall(resData)}
                                                className="review-button active"
                                            >
                                                리뷰 작성하기
                                            </button>
                                        ) : (
                                            <button
                                                disabled
                                                className="review-button disabled"
                                            >
                                                리뷰작성 완료
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {/* 모달 */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        transition={{type: "spring", stiffness: 100}}
                        className="motion-div"
                    >
                        <div className="modal-container">
                            {/* Iframe or Placeholder */}
                            <div className="place-info-container">
                                {selectedPlaceUrl ? (
                                    <iframe
                                        src={selectedPlaceUrl}
                                        className="place-info-iframe"
                                        title="Place Info"
                                        frameBorder="0"
                                    />
                                ) : (
                                    <p className="place-info-placeholder">
                                        장소 정보가 없습니다.
                                    </p>
                                )}
                            </div>

                            {/* 하단 버튼 영역 */}
                            <div className="bottom-button-area">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="modal-button modal-button-close"
                                >
                                    닫기
                                </button>

                                {/* "식당 이용하기" 버튼은 선택된 장소에 대해서만 보여지도록 수정 */}
                                {selectedPlaceUrl && (
                                    <button
                                        onClick={() => ReviewModalOpen()}
                                        className="modal-button modal-button-review"
                                    >
                                        리뷰 작성하기
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/*이미지 업로드 모달*/}
            <AnimatePresence>
                {isImageUploadModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="motion-div"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "20px",
                                padding: "20px",
                                borderRadius: "10px",
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                width: "40%"
                            }}
                        >
                            {/* 문구 */}
                            <label
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "700",
                                    color: "#333",
                                    marginBottom: "15px",
                                    textAlign: "center",
                                }}
                            >
                                리뷰를 작성 전에 업체명이나 주소를 확인할 수 있는 영수증 <br/> 또는 업체명이 보이는 간판 사진을 업로드해 주세요.
                            </label>

                            {/* 이미지 업로드 input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    fontFamily: "Arial, sans-serif",
                                    marginBottom: "20px",
                                }}
                            />


                            {/* 서버 응답 대기 중일 때 Spinner */}
                            {isImageUploading && (
                                <div style={{marginTop: "20px", textAlign: "center"}}>
                                    {renderSpinner("확인 중...")}
                                </div>
                            )}

                            <button
                                onClick={() => setIsImageUploadModalOpen(false)} // 모달 닫기
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#f44336",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    marginTop: "15px",
                                }}
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* 리뷰 작성 모달 */}
            <AnimatePresence>
                {isReviewModalOpen && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        transition={{type: "spring", stiffness: 100}}
                        className="modal-overlay"
                    >
                        <div className="modal-container">

                            {/* 상단 헤더 */}
                            <div
                                style={{
                                    padding: "20px",
                                    backgroundColor: "#4CAF50", // 초록색 배경
                                    color: "white",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    borderTopLeftRadius: "15px",
                                    borderTopRightRadius: "15px",
                                }}
                            >
                                리뷰를 남겨주세요
                            </div>

                            {/* 모달 본문 */}
                            <div className="restaurant-container">
                                {/* 식당 정보 */}
                                <div className="restaurant-info">
                                    <div>
                                        <h5 className="restaurant-name">
                                            식당 이름 : <span className="place-name-value">{placeName}</span>
                                        </h5>
                                        <h6 className="menu-name">
                                            메뉴 : <span className="menu-value">{menu}</span>
                                        </h6>
                                    </div>
                                </div>

                                {/* 리뷰 내용 */}
                                <div>
                                    <Form.Group controlId="reviewText">
                                        <Form.Label className="review-label">내용</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="리뷰를 작성해주세요"
                                            className="review-textarea"
                                        />
                                    </Form.Group>
                                </div>

                                {/* 별점 */}
                                <div className="review-rating-container">
                                    <Form.Group controlId="reviewRating">
                                        <Form.Label className="review-rating-label">별점</Form.Label>
                                        <div className="star-rating">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    color={index < rating ? "gold" : "gray"} // 별색 지정
                                                    size={30}
                                                    onClick={() => setRating(index + 1)} // 별 클릭 시 별점 설정
                                                    className="star-icon"
                                                />
                                            ))}
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            {/* 하단 버튼 영역 */}
                            <div className="button-container">
                                {/* 닫기 버튼 */}
                                <button
                                    onClick={() => setIsReviewModalOpen(false)}
                                    className="close-button"
                                >
                                    닫기
                                </button>

                                {/* 등록하기 버튼 */}
                                <button
                                    onClick={() => handleReviewSubmit()} // 리뷰 제출 핸들러 호출
                                    className="submit-button"
                                >
                                    등록하기
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyResMap;
