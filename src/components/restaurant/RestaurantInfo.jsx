import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './RestaurantInfo.css';  // 별도의 CSS 파일을 추가

const RestaurantInfo = () => {
    const { state } = useLocation();
    const promptResponse = state?.data;
    const keyword = state?.keyword;

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-5">{keyword} 맛집 정보</h1>
            <Row className="g-4">
                {promptResponse && promptResponse.length > 0 ? (
                    promptResponse.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
                                <Card className="custom-card">
                                    {/* 이미지 없이 텍스트만 */}
                                    <Card.Body>
                                        <Card.Title className="card-title">{item.title}</Card.Title>
                                        <Card.Text className="card-text">
                                            {item.description.length > 100
                                                ? `${item.description.slice(0, 100)}...`
                                                : item.description}
                                        </Card.Text>
                                        <div className="text-muted small">{item.postdate}</div>
                                    </Card.Body>
                                </Card>
                            </a>
                        </Col>
                    ))
                ) : (
                    <Col xs={12} className="text-center">
                        <p>해당 데이터가 없습니다.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default RestaurantInfo;
