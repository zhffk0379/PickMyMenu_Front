import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";


function RandomChild() {
    const location = useLocation();  // 이전 페이지에서 전달된 데이터
    const { parentCategory, childCategories, previousSelections } = location.state || {};
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [foodRecommendations, setFoodRecommendations] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSelection = (selection) => {
        const fullPrompt = `${previousSelections},${selection.category}`;  // 이전 선택과 현재 선택을 포함

        setLoading(true);

        axios.get(`${apiUrl}/gemini/question`, { params: { prompt: fullPrompt } })
            .then((response) => {
                const foodNames = parseFoodRecommendations(response.data);
                setFoodRecommendations(foodNames);
            })
            .catch((error) => {
                console.error('API 호출 오류', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const parseFoodRecommendations = (text) => {
        // 숫자와 점, 공백 제거 후 음식명만 추출하고 괄호 안의 내용도 제거
        const regex = /\d+\.\s*([^\(\n]+)/g;
        let matches;
        const foodNames = [];

        while ((matches = regex.exec(text)) !== null) {
            // 첫 번째 그룹이 음식명
            let foodName = matches[1].trim();
            foodNames.push(foodName);
        }

        return foodNames;
    };



    /*
    const parseFoodRecommendations = (text) => {
        const regex = /\*\*(.*?)\*\*!/g;
        let matches;
        const foodNames = [];

        while ((matches = regex.exec(text)) !== null) {
            let foodName = matches[1].trim();
            foodName = foodName.replace(/\(.*?\)/g, '').trim();
            foodName = foodName.replace(/:/g, '').trim();
            foodNames.push(foodName);
        }

        return foodNames;
    };

    */

    const handleKeywordClick = (selectedKeyword) => {
        // 선택한 keyword를 MapPage로 전달
        navigate('/map', { state: { keyword: selectedKeyword } });
    };

    return (
        <Container className="mt-5">
            <Row className="text-center mb-4">
                <Col>
                    <h2 className="fw-bold text-dark">두 번째 선택지를 고르세요!</h2>
                </Col>
            </Row>
            <Row className="mb-5">
                {childCategories.map((item) => (
                    <Col key={item.id} xs={12} md={6} className="mb-4">
                        <div
                            onClick={() => handleSelection(item)}
                            className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
                            style={{
                                cursor: 'pointer',
                                fontSize: '2rem',
                                minHeight: '300px',
                                background: `linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)`,
                                color: 'white',
                                transition: 'transform 0.3s ease',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {item.category}
                        </div>
                    </Col>
                ))}
            </Row>

            {loading && (
                <Row className="text-center mb-4">
                    <Col>
                        <h2 className="fw-bold text-dark">메뉴 추천중...</h2>
                    </Col>
                </Row>
            )}

            {foodRecommendations.length > 0 && !loading && (
                <>
                    <Row className="text-center mb-4">
                        <Col>
                            <h2 className="fw-bold text-dark">추천된 음식</h2>
                        </Col>
                    </Row>
                    <Row>
                        {foodRecommendations.map((item, index) => (
                            <Col key={item} xs={12} md={4} className="mb-4">
                                <div
                                    onClick={() => handleKeywordClick(item)}
                                    className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '3rem',
                                        minHeight: '300px',
                                        background: `linear-gradient(135deg, ${index === 0 ? '#6a11cb' : '#2575fc'} 0%, 
                                                     ${index === 0 ? '#2575fc' : '#6a11cb'} 100%)`,
                                        color: 'white',
                                        transition: 'transform 0.3s ease',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <div>
                                        <div className="mb-3">
                                            <i className={`fas fa-${index === 0 ? 'heart' : 'star'} fa-3x`}></i>
                                        </div>
                                        {item}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}

export default RandomChild;
