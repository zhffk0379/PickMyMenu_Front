import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Edit.css'; // Edit 전용 CSS 파일 import

const Edit = () => {
  const [memberData, setMemberData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(''); // 새 비밀번호 확인
  const [phoneCheckMessage, setPhoneCheckMessage] = useState(''); // 전화번호 중복 확인 메시지
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(true); // 전화번호 사용 가능 여부
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/mypage`, {
        withCredentials: true, // 쿠키에서 자동으로 인증 정보를 가져옴
      });

      if (response.data.success) {
        setMemberData(response.data.data);
        setPhoneNumber(response.data.data.phoneNumber); // 전화번호 초기값 설정
      } else {
        navigate('/login'); // 로그인 페이지로 리디렉션
      }
    };

    fetchMemberData();
  }, [navigate]);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!isPhoneAvailable) {
      alert('전화번호가 이미 사용 중입니다.');
      return;
    }

    const updatedData = {
      phoneNumber,
      password: newPassword, // 새 비밀번호로 변경
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/member/update`, updatedData, {
        withCredentials: true, // 쿠키에서 인증 정보를 사용
      });

      console.log(response);  // 응답 내용 확인

      if (response.data.success) {
        alert('수정이 완료되었습니다. 재로그인 후 이용해주세요.');
        navigate('/login');
      } else {
        alert(response.data.message || '수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('서버 오류:', error);  // 에러 로그 추가
      alert('서버 오류가 발생했습니다.');
    }
  };


  const handleCancel = () => {
    navigate('/mypage');
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
    let formatted = input;

    // 번호를 형식에 맞게 변환
    if (input.length > 3 && input.length <= 7) {
      formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 7) {
      formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }

    setPhoneNumber(formatted); // 포맷팅된 값으로 상태 업데이트
  };

  const handlePhoneNumberCheck = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/check-phone`, {
        params: { phoneNumber },
      });

      if (response.data.success) {
        setPhoneCheckMessage('사용 가능한 전화번호입니다.');
        setIsPhoneAvailable(true);
      } else {
        setPhoneCheckMessage(response.data.message || '이미 사용 중인 전화번호입니다.');
        setIsPhoneAvailable(false);
      }
    } catch (error) {
      setPhoneCheckMessage('전화번호 중복 확인에 실패했습니다.');
    }
  };

  if (!memberData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-page-container">
      <h2>회원정보 수정</h2>
      <div className="edit-form">
        <div className="form-group">
          <label>이름</label>
          <input type="text" value={memberData.name} readOnly />
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input type="email" value={memberData.email} readOnly />
        </div>

        <div className="form-group">
          <label>전화번호</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="전화번호를 입력하세요"
          />
          <button onClick={handlePhoneNumberCheck}>전화번호 중복 확인</button>
          <p>{phoneCheckMessage}</p>
        </div>

        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
          />
        </div>

        <div className="buttons">
          <button className="save-button" onClick={handleSave}>확인</button>
          <button className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
