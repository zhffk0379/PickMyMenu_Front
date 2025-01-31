import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Carousel } from "react-bootstrap"; // Carousel 추가
import "./HomePage.css";
import { useAuth } from "../contexts/AuthContext";
import { getRankMenu } from "../services/rank/rankService";

const HomePage = () => {
  const [menuRankData, setMenuRankData] = useState([]);
  const [nowDate, setNowDate] = useState("점심 메뉴 추천");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const date = new Date();
    if (date.getHours() > 15) {
      setNowDate("저녁 메뉴 추천");
    }
    getRankMenu({ type: "DAY" }).then((data) => {
      setMenuRankData(data.data);
    });
  }, []);
  const isLoginByRank = () => {
    if (!isAuthenticated) {
      const proceed = window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (proceed) {
        navigate("/login");
      }
    }else{
      navigate("/ranking");
    }
  }

  const isLogin = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      const proceed = window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (proceed) {
        navigate("/login");
      }
    }
  };

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
          <Link to="/todayPick" className="recommendation-link" onClick={isLogin}>
            오늘의 추천
          </Link>
        </Col>
      </Row>

      {/* 두 번째 Row - 두 번째 줄에 두 개 버튼 배치 */}
      <Row className="mb-4">
        <Col xs={6} className="mb-3">
          {/* 순위 슬라이드 */}
          <Carousel controls={false} indicators={false} interval={3000} className="recommendation-link" onClick={isLoginByRank}>
            {menuRankData?.slice(0, 10).map((item, index) => (
              <Carousel.Item key={index}>
                <div>{`${index + 1}위: ${item.menu}`}</div>
              </Carousel.Item>
            ))}
          </Carousel>
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