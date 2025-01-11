import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 토큰 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request Config:', config); // 요청 정보를 로깅
    return config; // 수정된 요청 객체 반환
  },
  (error) => {
    console.error('Request Error:', error); // 요청 오류 처리
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data); // 응답 데이터를 로깅
    return response; // 응답 객체 그대로 반환 또는 가공 후 반환
  },
  (error) => {
    // 응답 에러 처리
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      localStorage.removeItem('accessToken'); // 토큰 제거
      window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    }

    return Promise.reject(error); // 에러를 호출한 쪽으로 전달
  }
);


export default axiosInstance;