import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useAuth } from '../../contexts/AuthContext'; // useAuth 임포트

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 함수 가져오기

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/member/login`, {
      email,
      password,
    }, {
      withCredentials: true
    });

    if (response.data.success) {
      const { token, name } = response.data.data;

      // document.cookie를 사용하여 쿠키에 토큰을 저장
      document.cookie = `token=${token}; max-age=${7 * 24 * 60 * 60}; path=/`;  // 7일간 유효

      alert(`${name}님, PickMyMenu에 오신 것을 환영합니다!`);
      login(); // 로그인 상태 업데이트
      navigate('/'); // 로그인 후 루트 페이지로 이동
    }else{
      if (response.data?.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('로그인 요청 중 오류가 발생했습니다.');
      }
    }



  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg p-4 rounded">
            <Card.Body>
              <h2 className="text-center mb-4">PickMyMenu</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>아이디</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

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
                  로그인
                </Button>
              </Form>

              {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

              <div className="d-flex justify-content-between mt-3">
                <a href="/forgot-username">이메일 찾기</a>
                <a href="/forgot-password">비밀번호 찾기</a>
                <a href="/join">회원가입</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
