import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

function SurveyResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { parentCategory, childCategory } = location.state || {};
    const [foodRecommendations, setFoodRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fullPrompt = `${parentCategory.category}, ${childCategory.category}`;
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
    }, [parentCategory, childCategory]);

    const parseFoodRecommendations = (text) => {
        const regex = /\d+\.\s*([^\(\n]+)/g;
        let matches;
        const foodNames = [];

        while ((matches = regex.exec(text)) !== null) {
            let foodName = matches[1].trim();
            foodNames.push(foodName);
        }

        return foodNames;
    };


    const handleKeywordClick = (selectedKeyword) => {
        console.log("parentCategory", parentCategory);
        console.log("childCategory", childCategory);
        console.log("selectedKeyword", selectedKeyword);
        // 먼저 POST 요청을 보냄
        axios.post(`${apiUrl}/survey/collect`, {
            parentCategory: parentCategory,
            childCategory: childCategory,
            selectedKeyword: selectedKeyword
        })
            .then((response) => {
                console.log('성공적으로 저장되었습니다:', response);
                const resultMenuId = response.data.data;

                // 요청이 성공하면 MapPage로 이동
                navigate('/map', { state: { keyword: selectedKeyword, resultMenuId: resultMenuId } });
            })
            .catch((error) => {
                console.error('POST 요청 중 오류 발생:', error);
                // 필요시 에러 처리 로직 추가
            });
    };


    /*    const handleKeywordClick = (selectedKeyword) => {
            console.log(selectedKeyword);
            // 선택한 keyword를 MapPage로 전달
            navigate('/map', { state: { keyword: selectedKeyword } });
        };*/


    return (
        <Container>
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

export default SurveyResult;
