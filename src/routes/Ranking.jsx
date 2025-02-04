import { Button, Col, Container, Row } from "react-bootstrap";
import RankTable from "../components/ranking/RankTable";
import { useEffect, useState } from "react";
import { getRankMenu, getRankRestaurant, getRankSurvey } from "../services/rank/rankService";
import RankSurveyBar from "../components/ranking/RankSurveyBar";

const Ranking = () => {
  const [menuRankData, setMenuRankData] = useState([]);
  const [surveyRankData, setSurveyRankData] = useState([]);
  const [type, setType] = useState("ALL");
  const [title, setTitle] = useState("전체 순위");

  const fetchData = async () => {
    const menuData = await getRankMenu({ type });
    const surveyData = await getRankSurvey({ type });

    setMenuRankData(menuData.data);
    setSurveyRankData(surveyData.data);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const typeTitles = {
    DAY: "일간 순위",
    WEEK: "주간 순위",
    MONTH: "월간 순위",
    YEAR: "연간 순위",
    ALL: "전체 순위",
  };

  const typeChange = (newType) => {
    setTitle(typeTitles[newType] || "전체 순위");
    setType(newType);
  };

  return (
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <RankTable title={title} type={type} data={menuRankData} callback={typeChange} />
          </Col>
          <Col md={6}>
            <RankSurveyBar data={surveyRankData} />
          </Col>
        </Row>
      </Container>
  );
};

export default Ranking;