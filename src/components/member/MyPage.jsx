import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "./MyPage.css";
import axios from "axios"; // 스타일 파일

const MyPageTabs = () => {
    const location = useLocation(); // 현재 경로 확인
    const [reviewCount, setReviewCount] = useState(0); // 리뷰 카운트 상태
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/review/count`,{
            withCredentials: true
        })
            .then((response) => {
                if (response.status === 200) {
                    setReviewCount(response.data.data); // 응답 데이터 저장
                }
            })
            .catch((error) => {
                console.error("리뷰 카운트를 가져오는 중 오류 발생:", error);
            });
    }, []);

    return (
        <div className="mypage-tabs">
            <Link
                to="/myinfo"
                className={`mypage-tab ${location.pathname === "/myinfo" ? "active-tab" : ""}`}
            >
                내 정보
            </Link>
            <Link
                to="/myRestaurantInfo"
                className={`mypage-tab ${location.pathname === "/myRestaurantInfo" ? "active-tab" : ""}`}
            >
                방문했던 식당
                {reviewCount > 0 && (
                    <span className="badge">{reviewCount}</span> // 뱃지 표시
                )}
            </Link>
            <Link
                to="/myReview"
                className={`mypage-tab ${location.pathname === "/myReview" ? "active-tab" : ""}`}
            >
                내 리뷰
            </Link>
        </div>
    );
};

export default MyPageTabs;
