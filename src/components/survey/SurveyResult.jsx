import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import axios from "axios";

function SurveyResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const {selection, pushData, todayPick} = location.state || {};
    const [foodRecommendations, setFoodRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (todayPick && todayPick.length > 0) {  // todayPick이 존재하면
            setFoodRecommendations(todayPick);  // 바로 foodRecommendations에 설정
        } else if (selection && selection.length > 0) {  // todayPick이 없고 selection이 있으면
            const select = selection.join(", ");
            setLoading(true);

            axios
                .get(`${apiUrl}/gemini/question`, {params: {select: select}})
                .then((response) => {
                    const foodNames = parseFoodRecommendations(response.data);
                    setFoodRecommendations(foodNames);  // API 응답값을 설정
                })
                .catch((error) => {
                    console.error('API 호출 오류', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [selection, todayPick]);  // selection이나 todayPick이 변경될 때마다 실행

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
        axios.post(`${apiUrl}/survey/collect`, {
                "list": pushData,
                "menu": selectedKeyword
            },
            {
                withCredentials: true,
            })
            .then((response) => {
                const resultMenuId = response.data.data;

                // 요청이 성공하면 MapPage로 이동
                navigate('/map', {state: {keyword: selectedKeyword, resultMenuId}});
            })
            .catch((error) => {
                console.error('POST 요청 중 오류 발생:', error);
                // 필요시 에러 처리 로직 추가
            });
    };

    const renderSpinner = (message) => (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: '100vh'}}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" role="status"/>
                <div className="mt-3">{message}</div>
            </div>
        </Container>
    );

    return (
        <Container>
            {loading && (
                <Container
                    className="d-flex justify-content-center align-items-center"
                    style={{height: '50vh', marginTop: '10vh'}}
                >
                    <Row className="text-center">
                        {renderSpinner("메뉴 추천중...")}
                    </Row>
                </Container>
            )}

            {foodRecommendations.length > 0 && !loading && (
                <>
                    <Row className={"mt-5"}>
                        {foodRecommendations.map((item, index) => (
                            <Col key={item} xs={12} md={4} className="mb-4">
                                <div
                                    onClick={() => handleKeywordClick(item)}
                                    className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '3rem',
                                        minHeight: '300px',
                                        background: `linear-gradient(135deg, ${index === 0
                                            ? '#6a11cb' : '#2575fc'} 0%, 
                                                     ${index === 0 ? '#2575fc'
                                            : '#6a11cb'} 100%)`,
                                        color: 'white',
                                        transition: 'transform 0.3s ease',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <div>
                                        <div className="mb-3">
                                            <i className={`fas fa-${index === 0 ? 'heart'
                                                : 'star'} fa-3x`}></i>
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
