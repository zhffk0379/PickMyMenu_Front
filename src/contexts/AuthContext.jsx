import React, { createContext, useState, useContext, useEffect } from 'react';
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

    // 브라우저 새로고침 시 토큰 유효성 확인
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/member/jwtChk`,
                    {},
                    { withCredentials: true }
                );

                // 인증 성공 시 로그인 상태로 설정
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('토큰 인증 실패:', error.response?.data || error.message);
                setIsAuthenticated(false); // 인증 실패 시 비로그인 상태로 설정
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
