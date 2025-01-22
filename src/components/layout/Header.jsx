import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'; // useAuth 임포트
import './header.css';
import axios from 'axios';
import {Navbar} from "react-bootstrap"; // axios 임포트

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 보내기
      await axios.post(`${process.env.REACT_APP_API_URL}/member/logout`, {}, { withCredentials: true });

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
        <Link to="/" className="logo fs-1">PMM</Link>
        <Navbar className={"d-flex align-items-center"}>
          <ul>
            <li><Link className={"fs-5"} to="/review">리뷰</Link></li>
            <li><Link className={"fs-5"} to="/ranking">순위</Link></li>

            {isAuthenticated ? (
              <>
                {/* 로그아웃 링크를 기존 스타일과 동일하게 */}
                <li><Link className={"fs-5"} to="/" onClick={handleLogout}>로그아웃</Link></li>
                <li><Link className={"fs-5"} to="/mypage">마이페이지</Link></li>
              </>
            ) : (
              <>
                <li><Link className={"fs-5"} to="/login">로그인</Link></li>
                <li><Link className={"fs-5"} to="/join">회원가입</Link></li>
              </>
            )}
          </ul>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;