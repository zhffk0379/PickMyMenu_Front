import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // react-router-dom의 useNavigate 사용
import './MyPage.css';

const MyPage = () => {
  const [memberData, setMemberData] = useState(null);
  const navigate = useNavigate();  // navigate 함수 초기화

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/member/mypage', {
          withCredentials: true,
        });
        setMemberData(response.data);
      } catch (error) {
        console.error('Failed to fetch member data:', error);
      }
    };

    fetchMemberData();
  }, []);

  if (!memberData) {
    return <p>Loading...</p>;
  }

  // 회원정보 수정 페이지로 이동
  const handleEditClick = () => {
    navigate('/edit');  // 예시로 '/edit' 페이지로 이동
  };

  // 회원탈퇴 페이지로 이동
  const handleDeleteClick = () => {
    navigate('/delete');  // 예시로 '/delete' 페이지로 이동
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="member-info">
        <p><strong>이름:</strong> {memberData.name}</p>
        <p><strong>이메일:</strong> {memberData.email}</p>
        <p><strong>전화번호:</strong> {memberData.phoneNumber}</p>
        <p><strong>생년월일:</strong> {memberData.birthdate}</p>
        <p><strong>성별:</strong> {memberData.gender}</p>
        <p><strong>가입 날짜:</strong> {new Date(memberData.createdDate).toLocaleDateString()}</p>
      </div>
      <div className="mypage-buttons">
        <button className="edit-button" onClick={handleEditClick}>회원정보 수정</button>
        <button className="delete-button" onClick={handleDeleteClick}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;
