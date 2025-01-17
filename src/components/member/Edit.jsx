// Edit.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Edit.css';

const Edit = () => {
  const [memberData, setMemberData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneCheckMessage, setPhoneCheckMessage] = useState('');
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(true);
  const navigate = useNavigate();
  const { handleLogout } = useAuth(); // handleLogout 함수 가져오기

  useEffect(() => {
    const fetchMemberData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/mypage`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setMemberData(response.data.data);
        setPhoneNumber(response.data.data.phoneNumber);
      } else {
        navigate('/login');
      }
    };

    fetchMemberData();
  }, [navigate]);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!isPhoneAvailable && phoneNumber !== memberData.phoneNumber) {
      alert('전화번호 중복 확인을 해주세요.');
      return;
    }

    const updatedData = {
      phoneNumber,
      password: newPassword,
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/member/update`, updatedData, {
        withCredentials: true,
      });

      if (response.data.success) {
        alert('수정이 완료되었습니다. 재로그인 후 이용해주세요.');

        await handleLogout(); // handleLogout 호출

        navigate('/');  // 메인 페이지로 이동
      } else {
        alert(response.data.message || '수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('서버 오류:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/mypage');
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, '');
    let formatted = input;

    if (input.length > 3 && input.length <= 7) {
      formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 7) {
      formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }

    setPhoneNumber(formatted);
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
