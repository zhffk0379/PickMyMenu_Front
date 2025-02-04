import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";  // 별 아이콘 추가
import './RestaurantModal.css';  // 스타일 파일

const RestaurantModal = ({ isOpen, onClose, restaurantData }) => {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [selectedPlaceUrl, setSelectedPlaceUrl] = useState(null);

    if (!isOpen) return null;

    // 링크 클릭 시 모달 열기
    const handleLinkClick = (url) => {
        setSelectedPlaceUrl(url);
        setIsLinkModalOpen(true);
    };

    // 별점 표시 함수
    const renderStars = (rating) => {
        const maxStars = 5;
        const displayRating = parseFloat(rating.toFixed(1)); // 소수점 1자리까지 반영
        const fullStars = Math.floor(displayRating); // 완전한 별 개수
        const hasHalfStar = displayRating % 1 >= 0.5; // 반 별 유무
        const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <span className="star-rating">
                {[...Array(fullStars)].map((_, index) => (
                    <BsStarFill key={`full-${index}`} className="star-icon full-star" />
                ))}
                {hasHalfStar && <BsStarHalf className="star-icon half-star" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <BsStar key={`empty-${index}`} className="star-icon empty-star" />
                ))}
                <span className="rating-text"> ({displayRating})</span>
            </span>
        );
    };

    return (
        <>
            {/* 기존 식당 순위 모달 */}
            <Modal show={isOpen} onHide={onClose} size="xl" centered className="restaurant-modal">
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>{restaurantData[0]?.name} 식당순위</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    {restaurantData && restaurantData.length > 0 ? (
                        restaurantData.map((restaurant) => (
                            <Card key={restaurant.resId} className="restaurant-card mb-3">
                                <Card.Body>
                                    <Card.Title className="restaurant-title">{restaurant.placeName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">총 방문수 : {restaurant.resCount}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>별점:</strong> {renderStars(restaurant.startCount)}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>주소:</strong> {restaurant.roadAddressName}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>식당 링크:</strong>{' '}
                                        <Button
                                            variant="link"
                                            onClick={() => handleLinkClick(restaurant.placeUrl)}
                                            className="restaurant-link"
                                        >
                                            모달에서 보기
                                        </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p className="no-data">정보가 없습니다.</p>
                    )}
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button variant="secondary" onClick={onClose} className="close-btn">
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 새로운 식당 링크 모달 */}
            <Modal show={isLinkModalOpen} onHide={() => setIsLinkModalOpen(false)} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>식당 위치</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPlaceUrl ? (
                        <iframe
                            src={selectedPlaceUrl}
                            style={{ width: "100%", height: "500px", border: "none" }}
                            title="Restaurant Location"
                        />
                    ) : (
                        <p>링크가 없습니다.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsLinkModalOpen(false)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RestaurantModal;
