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
  const [isPhoneChecked, setIsPhoneChecked] = useState(false); // 중복 확인 여부
  const [isPhoneChanged, setIsPhoneChanged] = useState(false); // 전화번호 변경 여부
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

    if (isPhoneChanged && !isPhoneChecked) {
      alert('전화번호 중복 확인을 해주세요.');
      return;
    }

    const updatedData = {
      phoneNumber,
    };

    if (newPassword) updatedData.password = newPassword;

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/member/update`, updatedData, {
      withCredentials: true,
    });

    if (response.data.success) {
      alert('수정이 완료되었습니다. 재로그인 후 이용해주세요.');
      await handleLogout();
      navigate('/');
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

    if (formatted !== memberData.phoneNumber) {
      setIsPhoneChanged(true);
      setIsPhoneChecked(false);
      setPhoneCheckMessage('');
    } else {
      setIsPhoneChanged(false);
      setPhoneCheckMessage('');
    }
  };

  const handlePhoneNumberCheck = async () => {
    if (phoneNumber !== memberData.phoneNumber) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/check-phone`, {
          params: { phoneNumber },
        });

        if (response.data.success) {
          setPhoneCheckMessage('사용 가능한 전화번호 입니다.');
          setIsPhoneChecked(true);
        } else {
          setPhoneCheckMessage(response.data.message || '이미 사용 중인 전화번호 입니다.');
          setIsPhoneChecked(false);
        }
      } catch (error) {
        setIsPhoneChecked(false);
      }
    } else {
      setIsPhoneChecked(true);
    }
  };

  useEffect(() => {
    if (phoneNumber === memberData?.phoneNumber) {
      setIsPhoneChecked(true);
    }
  }, [phoneNumber, memberData]);

  if (!memberData) {
    return;
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
          <div className="phone-input-container">
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="전화번호를 입력하세요"
            />
            {phoneNumber !== memberData.phoneNumber && (
              <button className="phone-check-button" onClick={handlePhoneNumberCheck}>
                전화번호 중복 확인
              </button>
            )}
          </div>
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
          <button className="save-button" onClick={handleSave}>
            확인
          </button>
          <button className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
