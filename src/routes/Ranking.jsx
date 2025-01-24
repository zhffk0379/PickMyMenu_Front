import {Button, Col, Container, Row} from "react-bootstrap"
import RankTable from "../components/ranking/RankTable";
import {useEffect, useState} from "react";
import {getRankMenu, getRankSurvey} from "../services/rank/rankService";
import RankSurveyBar from "../components/ranking/RankSurveyBar";

const Ranking = () => {
  const [menuRankData, setMenuRankData] = useState([]);
  const [surveyRankData, setSurveyRankData] = useState([]);
  const [type, setType] = useState("ALL");
  const [title, setTitle] = useState("전체 순위")

  useEffect(() => {
    getRankMenu({type: type}).then((data) => {
      setMenuRankData(data.data);
    });
    getRankSurvey({type: type}).then((data) => {
      setSurveyRankData(data.data);
    });
  }, []);

  useEffect(() => {
    getRankMenu({type: type}).then((data) => {
      setMenuRankData(data.data);
    });
  }, [type]);

  const typeChange = (newType) => {
    switch (newType) {
      case "DAY":
        setTitle("일간 순위");
        break;
      case "WEEK":
        setTitle("주간 순위");
        break;
      case "MONTH":
        setTitle("월간 순위");
        break;
      case "YEAR":
        setTitle("연간 순위");
        break;
      default:
        setTitle("전체 순위");
    }
    setType(newType);
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <RankTable title={title} data={menuRankData}
                     callback={typeChange}/>
        </Col>
        <Col md={6}>
          <RankSurveyBar data={surveyRankData}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Ranking;
