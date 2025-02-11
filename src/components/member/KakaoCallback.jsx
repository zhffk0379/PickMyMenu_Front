import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

function KakaoCallback() {
  const { login, isAuthenticated, logout, reviewCount, setReviewCount  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token", token);

    if (token) {
      // 1. 토큰을 localStorage & 쿠키에 저장
      document.cookie = `token=${token}; max-age=${7 * 24 * 60 * 60}; path=/`;

      // 로그인 후 리뷰 카운트 가져오기
      axios.get(`${process.env.REACT_APP_API_URL}/review/count`, {
        withCredentials: true
      })
      .then((response) => {
        if (response.status === 200) {
          const reviewCount = response.data.data;
          setReviewCount(reviewCount); // 상태에 저장
          localStorage.setItem('reviewCount', reviewCount); // localStorage에 저장
        }
      })
      .catch((error) => {
        console.error("리뷰 카운트를 가져오는 중 오류 발생:", error);
      });

      localStorage.setItem('role', "ROLE_USER");
      localStorage.setItem("token", token);

      login();
      navigate("/"); // 홈으로 이동
    } else {
      alert("카카오 로그인에 실패했습니다.");
      navigate("/login");
    }
  }, []);

  return <p>로그인 중입니다...</p>;
}

export default KakaoCallback;
