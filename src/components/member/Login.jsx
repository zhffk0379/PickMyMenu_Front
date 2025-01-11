import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import './Login.css'; // 스타일 추가할 경우

function Login() {
    const [email, setEmail] = useState('');  // 아이디 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 로그인 요청
            const response = await axios.post('http://localhost:8080/member/login', {
                email,
                password
            }, {
                   withCredentials: true  // 쿠키 전송을 허용
            });

            // 로그인 성공 시 사용자 이름과 JWT 토큰을 받음
            const { token, name } = response.data;

            // 쿠키저장
            document.cookie = `token=${token}; Path=/;`;
            // Secure; SameSite=Strict; http://localhost에서는 Secure 쿠키가 적용되지 않음

            alert(`${name}님, PickMyMenu에 오신 것을 환영합니다!`);

            // 로그인 성공 후 루트 페이지로 이동
            navigate('/');
        } catch (error) {
            // 로그인 실패 시 에러 메시지 표시
            console.error('Login failed', error);
            if (error.response && error.response.status === 400) {
                setErrorMessage('아이디 또는 비밀번호가 틀립니다.');
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
                                        onChange={(e) => setEmail(e.target.value)}  // 아이디 상태 업데이트
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>비밀번호</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}  // 비밀번호 상태 업데이트
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    로그인
                                </Button>
                            </Form>

                            {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}  {/* 에러 메시지 표시 */}

                            <div className="d-flex justify-content-between mt-3">
                                <a href="/forgot-username">아이디 찾기</a>
                                <a href="/forgot-password">비밀번호 찾기</a>
                                <a href="/signup">회원가입</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
