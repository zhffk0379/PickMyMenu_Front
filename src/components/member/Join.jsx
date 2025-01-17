import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Join.css';

function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // 모든 필드가 비어 있지 않은지 확인
        if (!email || !password || !confirmPassword || !name || !birthdate || !phoneNumber || !gender) {
            setErrorMessage('모든 필드를 채워주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        const memberInfo = {
            email,
            password,
            name,
            birthdate,
            phoneNumber,
            gender,
        };

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/member/join`,
          memberInfo, {
              headers: {
                  'Content-Type': 'application/json', // 명시적으로 JSON Content-Type 설정
              },

            withCredentials: true,
        });
        if (response.data.success) {
            alert('회원가입을 축하드립니다!');
            navigate('/login');
        }
        if (response.data?.message) {
            setErrorMessage(response.data?.message);
        } else {
            setErrorMessage('회원가입 요청 중 알 수 없는 오류가 발생했습니다.');
        }
    };

    const handleEmailCheck = async () => {
        // 이메일이 비어 있으면 오류 처리
        if (!email) {
            setEmailError('이메일을 입력하세요.');
            setIsEmailValid(false);
            return;
        }

        // 이메일 형식 검증 (정규식 사용)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
            setIsEmailValid(false);
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/check-email`, {
                params: { email }
            });

            if (response.data.success === true) {
                setEmailError('사용 가능한 이메일입니다.');
                setIsEmailValid(true);
            } else {
                setEmailError(response.data.message);
                setIsEmailValid(false);
            }
        } catch (error) {
            setEmailError('이미 등록된 이메일입니다.');
            setIsEmailValid(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <Card className="shadow-lg p-4 rounded">
                        <Card.Body>
                            <h2 className="text-center mb-4">회원가입</h2>
                            <Form onSubmit={handleSignup}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>이메일</Form.Label>
                                    <div className="input-email-container">
                                        <Form.Control
                                            type="email"
                                            placeholder="이메일을 입력하세요."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Button variant="outline-primary" onClick={handleEmailCheck}>
                                            중복 확인
                                        </Button>
                                    </div>
                                    {emailError && <p className="text-danger">{emailError}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>비밀번호</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호를 입력하세요."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>비밀번호 확인</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호 확인"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>이름</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="이름을 입력하세요."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicBirthdate">
                                    <Form.Label>생년월일</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                    <Form.Label>전화번호</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="숫자만 입력"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const input = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
                                            let formatted = input;

                                            // 번호를 형식에 맞게 변환
                                            if (input.length > 3 && input.length <= 7) {
                                                formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
                                            } else if (input.length > 7) {
                                                formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
                                            }

                                            setPhoneNumber(formatted); // 포맷팅된 값으로 상태 업데이트
                                        }}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formBasicGender">
                                    <Form.Label>성별</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">성별을 선택하세요</option> {/* 기본 선택 옵션 추가 */}
                                        <option value="male">남성</option>
                                        <option value="female">여성</option>
                                    </Form.Control>
                                </Form.Group>

                                {/* 제출 버튼을 입력값 상태에 따라 비활성화 */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={!isEmailValid || !email || !password || !confirmPassword || !name || !birthdate || !phoneNumber || !gender}
                                >
                                    회원가입
                                </Button>
                            </Form>

                            {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Join;
