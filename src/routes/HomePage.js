import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import "./HomePage.css";
import { Container, Row, Col } from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";

const HomePage = () => {
  const [nowDate, setNowDate] = useState("점심 메뉴 추천");
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const date = new Date();
    if (date.getHours() > 15) {
      setNowDate("저녁 메뉴 추천");
    }
  }, []);

  const isLogin = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      const proceed = window.confirm("로그인이 필요한 서비스입니다. 회원가입 페이지로 이동하시겠습니까?");
      if (proceed) {
        navigate("/join")
      }
    }
  }

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
          <Link to="/ranking" className="recommendation-link" onClick={isLogin}>
            순위
          </Link>
        </Col>
        <Col xs={6} className="mb-3">
          <Link to="/review" className="recommendation-link" onClick={isLogin}>
            리뷰
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;