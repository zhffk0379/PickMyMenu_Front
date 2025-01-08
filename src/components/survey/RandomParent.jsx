import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";


function RandomParent() {
    const [group1Data, setGroup1Data] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;



    useEffect(() => {
        axios.get(`${apiUrl}/random/parent`)
            .then((response) => {
                setGroup1Data(response.data); // API에서 받은 목록을 group1Data에 저장
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
            });
    }, []);

    const handleSelection = (selection) => {
        axios.get(`${apiUrl}/random/child?parentId=${selection.id}`)
            .then((response) => {
                var chooseData = group1Data.find(data => data.id === selection.id);
                navigate('/children', {
                    state: {
                        parentCategory: chooseData,
                        childData: response.data // 자식 데이터
                    }
                });
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
            });
    };

    return (
        <Container className="mt-5">
            <Row className="text-center mb-4">
                <Col>
                    <h2 className="fw-bold text-dark">첫 번째 선택지를 고르세요!</h2>
                </Col>
            </Row>
            <Row>
                {group1Data.map((item, index) => (
                    <Col key={item.id} xs={12} md={6} className="mb-4">
                        <div
                            onClick={() => handleSelection(item)}
                            className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
                            style={{
                                cursor: 'pointer',
                                fontSize: '2rem',
                                minHeight: '300px',
                                background: `linear-gradient(135deg, ${index % 2 === 0 ? '#6a11cb' : '#2575fc'} 0%, ${index % 2 === 0 ? '#2575fc' : '#6a11cb'} 100%)`,
                                color: 'white',
                                transition: 'transform 0.3s ease',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div>
                                <div className="mb-3">
                                    <i className={`fas fa-${index % 2 === 0 ? 'heart' : 'star'} fa-3x`}></i>
                                </div>
                                {item.category}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RandomParent;
