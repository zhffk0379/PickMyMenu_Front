import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 경로에 맞게 수정
import './Delete.css';

const Delete = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { handleLogout } = useAuth(); // AuthContext에서 로그아웃 함수 가져오기

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/mypage`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserName(response.data.data.name);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleAccountDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/member/delete-account`,
        { password },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('회원탈퇴가 완료되었습니다.');

        // 회원탈퇴 후 로그아웃 처리
        handleLogout();

        // 토큰 쿠키 삭제
        document.cookie = 'token=; Max-Age=-99999999;'; // 쿠키 삭제

        navigate('/'); // 홈페이지로 리디렉션
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setErrorMessage('탈퇴 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container className="delete-vh-100 d-flex justify-content-center align-items-center">
      <Row className="delete-w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="delete-shadow-lg p-4 rounded">
            <Card.Body>
              <h2 className="delete-h2 mb-4">회원탈퇴</h2>
              <p className="delete-card-body-text mb-4">
                <strong>{userName}</strong> 회원님의 계정이 삭제됩니다.
                <br />
                탈퇴 시 개인정보 및 이용정보가 삭제되며 복구할 수 없습니다.
                <br />
                본인의 비밀번호를 입력한 후 진행해 주시기 바랍니다.
              </p>

              <Form onSubmit={handleAccountDelete}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button className="delete-button w-100" type="submit">
                  회원탈퇴
                </Button>
              </Form>

              {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

              <div className="d-flex justify-content-center mt-3">
                <Button onClick={() => navigate('/mypage')} className="back-button" variant="link">
                  뒤로가기
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Delete;
