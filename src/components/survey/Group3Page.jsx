import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";

function Group3Page() {
    const [group3Data, setGroup3Data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foodRecommendations, setFoodRecommendations] = useState([]);
    const [keyword, setKeyword] = useState("");  // keyword 상태 추가
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/group1/random`, {
            params: { previousSelections: location.state.previousSelections }
        })
        .then((response) => {
            setGroup3Data(response.data.selected);
        });
    }, [location.state.previousSelections]);

    const handleSelection = (selection) => {
        const fullPrompt = `${location.state.previousSelections},${selection.name}`;

        setLoading(true);

        axios.get(`${apiUrl}/gemini/2`, { params: { prompt: fullPrompt } })
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
        const regex = /\*\*(.*?)\*\*/g;
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

    const handleKeywordClick = (selectedKeyword) => {
        // 선택한 keyword를 MapPage로 전달
        navigate('/map', { state: { keyword: selectedKeyword } });
    };

    return (
      <Container className="mt-5">
          <Row className="text-center mb-4">
              <Col>
                  <h2 className="fw-bold text-dark">마지막 선택지</h2>
              </Col>
          </Row>
          <Row>
              {group3Data.map((item, index) => (
                <Col key={item.id} xs={12} md={6} className="mb-4">
                    <div
                      onClick={() => handleSelection(item)}
                      className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
                      style={{
                          cursor: 'pointer',
                          fontSize: '4rem',
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
                            {item.name}
                        </div>
                    </div>
                </Col>
              ))}
          </Row>
          <Row className="text-center mb-4">
              <Col>
                  <h2 className="fw-bold text-dark">
                      {loading && <p>메뉴 추천중...</p>}
                      {!loading && <p>추천된 음식</p>}
                  </h2>
              </Col>
          </Row>
          {foodRecommendations.length > 0 && (
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
          )}
      </Container>
    );
}

export default Group3Page;
