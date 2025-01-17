import {Button, Col, Container, Row} from "react-bootstrap"
import RankTable from "../components/ranking/RankTable";
import {useEffect, useState} from "react";
import {getRank} from "../services/rank/rankService";

const Ranking = () => {
  const [menuRankData, setMenuRankData] = useState([]);
  const [type, setType] = useState("ALL");

  useEffect(() => {
    getRank({type: type}).then((data) => {
      setMenuRankData(data.data);
    });
  }, []);

  useEffect(() => {
    getRank({type: type}).then((data) => {
      setMenuRankData(data.data);
    });
  }, [type]);

  const typeChange = (newType) => {
    setType(newType);
    console.log(type);
  }

    return (
        <Container className="mt-5">
            <Row>
                <RankTable title={"메뉴 순위"} data={menuRankData} callback={typeChange}/>
            </Row>
        </Container>
    );
}

export default Ranking;
