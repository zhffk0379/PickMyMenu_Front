import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getTodayPick} from "../services/survey/TodayPickService";
import { Container, Spinner } from 'react-bootstrap';

const TodayPickPage = () => {
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    getTodayPick().then(response => {
          const todayPick = parseFoodRecommendations(response.data);
          console.log(todayPick);
          navigate('/result', { state: { todayPick } }); // 데이터가 성공적으로 로드되면 결과 페이지로 이동
        })
        .catch((error) => {console.error("Error loading survey data:", error);
        })
        .finally(() => {setLoading(false);  // 데이터 로딩이 끝나면 로딩 상태 종료
        });
  }, [navigate]);


  const parseFoodRecommendations = (text) => {
    const regex = /\*\*([^\*]+)\*\*/g;  // **로 감싼 부분을 추출
    let matches;
    const todayPick = [];

    while ((matches = regex.exec(text)) !== null) {
      let foodName = matches[1].trim();  // ** 사이의 텍스트를 추출
      todayPick.push(foodName);
    }

    return todayPick;
  };


  const renderSpinner = (message) => (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status" />
          <div className="mt-3">{message}</div>
        </div>
      </Container>
  );

  return (
      <div>
        {loading && renderSpinner("오늘의 메뉴 추천중")}
      </div>
  );
};

export default TodayPickPage;