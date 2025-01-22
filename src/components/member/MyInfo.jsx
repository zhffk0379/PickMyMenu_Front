import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyInfo.css'; // MyPage 전용 CSS 파일 import

const MyPage = () => {
  const [memberData, setMemberData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/mypage`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setMemberData(response.data.data);
      } else {
        navigate('/login');
      }
    };

    fetchMemberData();
  }, [navigate]);

  if (!memberData) {
    return <p>Loading...</p>;
  }

  const handleEditClick = () => {
    navigate('/passwordverify');
  };

  const handleDeleteClick = () => {
    navigate('/delete');
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
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
          <input type="text" value={memberData.phoneNumber} readOnly />
        </div>

        <div className="form-group">
          <label>생년월일</label>
          <input type="text" value={memberData.birthdate} readOnly />
        </div>

        <div className="form-group">
          <label>성별</label>
          <input type="text" value={memberData.gender} readOnly />
        </div>

        <div className="form-group">
          <label>가입 날짜</label>
          <input type="text" value={memberData.createdDate} readOnly />
        </div>
      </div>

      <div className="mypage-buttons">
        <button className="edit-button" onClick={handleEditClick}>회원정보 수정</button>
        <button className="delete-button" onClick={handleDeleteClick}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;
