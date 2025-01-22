import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./HomePage.css";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  const [nowDate, setNowDate] = useState("점심 메뉴 추천");

  useEffect(() => {
    const date = new Date();
    if (date.getHours() > 15) {
      setNowDate("저녁 메뉴 추천");
    }
  }, []);

  return (
    <Container className="mt-4">
      {/* 첫 번째 Row - 첫 번째 줄에 두 개 버튼 배치 */}
      <Row className="mb-4">
        <Col xs={6} className="mb-3">
          <Link to="/choice" className="recommendation-link">
            {nowDate}
          </Link>
        </Col>
        <Col xs={6} className="mb-3">
          <Link to="/parent" className="recommendation-link">
            오늘의 추천
          </Link>
        </Col>
      </Row>

      {/* 두 번째 Row - 두 번째 줄에 두 개 버튼 배치 */}
      <Row className="mb-4">
        <Col xs={6} className="mb-3">
          <Link to="/ranking" className="recommendation-link">
            순위
          </Link>
        </Col>
        <Col xs={6} className="mb-3">
          <Link to="/review" className="recommendation-link">
            리뷰
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
