import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PasswordVerify.css';

function PasswordVerify() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordVerify = async (e) => {
    e.preventDefault();

    // 비밀번호만 보내고, 이미 쿠키에 토큰이 있음
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/member/verify-password`,
      { password }, // 비밀번호만 전송
      { withCredentials: true } // 쿠키 인증 정보 전송
    );

    if (response.data.success) {
      alert('비밀번호 확인이 완료되었습니다.');
      navigate('/edit'); // 회원정보 수정 페이지로 이동
    } else {
      setErrorMessage(response.data?.message || '비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg p-4 rounded">
            <Card.Body>
              <h2 className="text-center mb-4">비밀번호 확인</h2>
              <Form onSubmit={handlePasswordVerify}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  확인
                </Button>
              </Form>

              {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

              <div className="d-flex justify-content-center mt-3">
                <a href="/">홈으로</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordVerify;