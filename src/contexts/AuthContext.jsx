// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// 로그인 상태를 관리할 Context 생성
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 로그인 상태 설정 함수
    const login = () => {
        setIsAuthenticated(true);
    };

    // 로그아웃 상태 설정 함수
    const logout = () => {
        setIsAuthenticated(false);
    };

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/member/logout`, {}, { withCredentials: true });
            logout(); // 로그아웃 처리
            document.cookie = 'token=; Max-Age=-99999999;'; // 쿠키 삭제
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    // 회원탈퇴 처리 함수
    const handleDeleteAccount = async (password) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/member/delete-account`,
                { password },
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('회원탈퇴가 완료되었습니다.');

                // 쿠키에서 JWT 토큰 삭제
                document.cookie = 'token=; Max-Age=-99999999;'; // 토큰 삭제
                setIsAuthenticated(false); // 로그인 상태 갱신

                // 로그인 페이지로 리디렉션
                window.location.href = '/login';
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('회원탈퇴 오류:', error);
        }
    };

    // 브라우저 새로고침 시 토큰 유효성 확인
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/member/jwtChk`,
                    {},
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                Cookies.remove('token');
                console.error('토큰 인증 실패:', error.response?.data || error.message);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, handleLogout, handleDeleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};
