import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'; // useAuth 임포트
import './header.css';
import axios from 'axios';
import {Navbar} from "react-bootstrap"; // axios 임포트
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 스타일 임포트

const Header = () => {
  const { isAuthenticated, logout, reviewCount, setReviewCount  } = useAuth();
  let navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);


  useEffect(() => {
    // 페이지 새로 고침 시 localStorage에서 리뷰 카운트를 가져와 상태에 저장
    const savedReviewCount = localStorage.getItem('reviewCount');
    if (savedReviewCount) {
      setReviewCount(savedReviewCount);
    }
  }, []); // 초기 로딩 시 한 번만 실행

  useEffect(() => {
    if (reviewCount !== null) {
      localStorage.setItem('reviewCount', reviewCount);
    }
  }, [reviewCount]); // reviewCount가 바뀔 때마다 localStorage에 저장

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

  const isLogin = (e) => {
    if(!isAuthenticated){
      e.preventDefault();
      const process = window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (process) {
        navigate("/login");
      }
    }
  }

  return (
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo fs-1">PMM</Link>
          <Navbar className={"d-flex align-items-center"}>
            <ul>
              <li><Link className={"fs-4"} to="/review" onClick={isLogin}>리뷰</Link></li>
              <li><Link className={"fs-4"} to="/ranking" onClick={isLogin}>순위</Link></li>

              <li className="dropdown">
                <button
                    className="dropdown-toggle"
                    onClick={toggleDropdown}
                    aria-expanded={dropdownOpen}
                >
                  {isAuthenticated && reviewCount > 0 && (
                      <span className="headerBadge">{reviewCount}</span> // 뱃지 표시
                  )}
                  <img src="https://hhjnn92.synology.me/Project/PickMyMenu/icon.png" className="auth-img"/>
                </button>
                {dropdownOpen && (
                    <ul className="dropdown-menu show">
                      {isAuthenticated ? (
                          <>
                            <li className={"dropdown-items"}>
                              <Link className={"fs-4 dropdown-item"}
                                      to={userRole === 'ROLE_ADMIN' ? '/adminpage' : '/mypage'}
                                      onClick={handleDropdownItemClick}>
                              {userRole === 'ROLE_ADMIN' ? '관리자 페이지' : '마이페이지'}
                            </Link></li>
                            <li className={"dropdown-items"}>
                              <Link className={"fs-4 dropdown-item"} to="/" onClick={() => {
                                handleLogout();
                                handleDropdownItemClick();
                              }}>로그아웃</Link></li>
                          </>
                      ) : (
                          <>
                            <li className={"dropdown-items"}>
                              <Link className={"fs-4 dropdown-item"} to="/login"
                                    onClick={handleDropdownItemClick}>로그인</Link></li>
                            <li className={"dropdown-items"}>
                              <Link className={"fs-4 dropdown-item"} to="/join"
                                    onClick={handleDropdownItemClick}>회원가입</Link></li>
                          </>
                      )}
                    </ul>
                )}
              </li>

            {/*{isAuthenticated ? (*/}
            {/*    <>*/}
            {/*      <li><Link className={"fs-5"} to="/" onClick={handleLogout}>로그아웃</Link></li>*/}
            {/*      <li><Link className={"fs-5"} to={userRole === 'ROLE_ADMIN' ? '/adminpage' : '/mypage'}>*/}
            {/*        {userRole === 'ROLE_ADMIN' ? '관리자 페이지' : '마이페이지'}</Link></li>*/}
            {/*      {reviewCount > 0 && (*/}
            {/*          <span className="headerBadge">{reviewCount}</span> // 뱃지 표시*/}
            {/*      )}*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*      <li><Link className={"fs-5"} to="/login">로그인</Link></li>*/}
            {/*      <li><Link className={"fs-5"} to="/join">회원가입</Link></li>*/}
            {/*    </>*/}
            {/*)}*/}

          </ul>
        </Navbar>
      </div>
</header>
)
  ;
};

export default Header;