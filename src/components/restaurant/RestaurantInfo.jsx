import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './RestaurantInfo.css';  // 별도의 CSS 파일을 추가

const RestaurantInfo = () => {
    const { state } = useLocation();
    const promptResponse = state?.data;
    const keyword = state?.keyword;


    return (
        <Container className="mt-5 container">
            <h1 className="text-center mb-5">{keyword} 맛집 정보</h1>
            <Row>
                {promptResponse && promptResponse.length > 0 ? (
                    promptResponse.map((item, index) => (
                        <Col xs={12} key={index} className="post-container mb-4">
                            <a className="url" href={item.url}>
                            <div className="post-header">
                                <span className="username">{item.author}</span>　·　
                                <span className="timestamp">{item.time}</span>
                            </div>
                            </a>
                            <div className="post-content">
                                <a className="url" href={item.url}>
                                    <h2 className="post-title text-start">{item.title}</h2>
                                    <p className="post-description">{item.description}</p>
                                </a>
                                <div className="image-gallery">
                                    {Array.from({ length: 5 }).map((_, i) => {
                                        const imageKey = `image${i + 1}`;
                                        return (
                                            item[imageKey] && (
                                                <img
                                                    key={imageKey}
                                                    src={item[imageKey]}
                                                    alt={`이미지 ${i + 1}`}
                                                    className="gallery-image"
                                                />
                                            )
                                        );
                                    })}
                                </div>
                            </div>
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


};

export default RestaurantInfo;