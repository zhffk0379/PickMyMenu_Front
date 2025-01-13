import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'; // useAuth 임포트
import './header.css';
import axios from 'axios'; // axios 임포트

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 보내기
      await axios.post('http://localhost:8080/member/logout', {}, { withCredentials: true });

      // 클라이언트 상태 처리
      logout(); // 로그아웃 처리
      document.cookie = 'token=; Max-Age=-99999999;'; // 쿠키 삭제
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">PMM</Link>
        <nav>
          <ul>
            <li><Link to="/">홈</Link></li>
            {/*<li><Link to="/map">지도</Link></li>*/}
            <li><Link to="/group1">설문 1</Link></li>
            <li><Link to="/parent">설문 2</Link></li>

            {isAuthenticated ? (
              <>
                {/* 로그아웃 링크를 기존 스타일과 동일하게 */}
                <li><Link to="/" onClick={handleLogout}>로그아웃</Link></li>
                <li><Link to="/mypage">마이페이지</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">로그인</Link></li>
                <li><Link to="/join">회원가입</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;