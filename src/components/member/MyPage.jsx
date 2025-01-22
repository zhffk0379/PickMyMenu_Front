import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MyPage.css"; // 스타일 파일

const MyPageTabs = () => {
  const location = useLocation(); // 현재 경로 확인

  return (
      <div className="mypage-tabs">
        <Link
            to="/myinfo"
            className={location.pathname === "/myinfo" ? "active-tab" : ""}
        >
          내 정보
        </Link>
        <Link
            to="/myRestaurantInfo"
            className={location.pathname === "/myRestaurantInfo" ? "active-tab" : ""}
        >
          방문했던 식당
        </Link>
      </div>
  );
};

export default MyPageTabs;
