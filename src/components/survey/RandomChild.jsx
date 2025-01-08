import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";


function RandomChild() {
    const location = useLocation();  // 이전 페이지에서 전달된 데이터
    const navigate = useNavigate();
    const { parentCategory, childData } = location.state || {}; // 전달받은 데이터

    useEffect(() => {
        console.log(location);
    }, []);

    const handleSelection = (selection) => {
        // 세 번째 페이지로 이동하면서 선택된 두 번째 옵션을 전달
        navigate('/result', {
            state: { parentCategory, childCategory: selection.category }
        });
    };

    return (
        <Container className="mt-5">
            <Row className="text-center mb-4">
                <Col>
                    <h2 className="fw-bold text-dark">두 번째 선택지를 고르세요!</h2>
                </Col>
            </Row>
            <Row className="mb-5">
                {childData && childData.length > 0 ? (
                    childData.map((item) => (
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
                    ))
                ) : (
                    <Col>
                        <p>데이터가 없습니다.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default RandomChild;
