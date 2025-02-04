import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getMemberRecord } from "../../services/member/memberService";
import { Container } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // 아이콘 추가
import "./MyPage.css";

const MyPageTabs = () => {
    const location = useLocation();
    const [reviewCount, setReviewCount] = useState(0);
    const [record, setRecord] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
        .get(`${apiUrl}/review/count`, { withCredentials: true })
        .then((response) => {
            if (response.status === 200) {
                setReviewCount(response.data.data);
            }
        })
        .catch((error) => console.error("리뷰 카운트 오류:", error));

        getMemberRecord("test").then((data) => {
            setRecord(data.data.recordSurveyGroupResList || []);
        });
    }, [apiUrl]);

    return (
        <Container>
            {/* 상단 탭 메뉴 */}
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
                    {reviewCount > 0 && <span className="badge">{reviewCount}</span>}
                </Link>
                <Link
                    to="/myReview"
                    className={`mypage-tab ${location.pathname === "/myReview" ? "active-tab" : ""}`}
                >
                    내 리뷰
                </Link>
            </div>

            {/* 설문 기록 가로 슬라이드 */}
            <div className="history-container">
                {record.length > 0 ? (
                    <div className="history-scroll">
                        {record.map((item) => (
                            <div key={item.id} className="history-item">
                                <h3 className="history-menu">{item.menu}</h3>
                                <p className="history-date">{item.createdDate}</p>
                                <p className="history-restaurant">{item.restaurantName}</p>
                                <div className="survey-results">
                                    <div className="survey-summary">
                                        <b>선택됨</b><span>선택 안됨</span>
                                    </div>
                                    {item.surveyResList.map((survey) => (
                                        <div key={survey.surveyId} className="survey-result">
                                            <div className="survey-details">
                                                {survey.selected && (
                                                    <div className="selected-item">
                                                        <FaCheckCircle className="icon-check" /> <span>{survey.selected}</span>
                                                    </div>
                                                )}
                                                {survey.notSelected && (
                                                    <div className="not-selected-item">
                                                        <FaTimesCircle className="icon-times" /> <span>{survey.notSelected}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-record">설문 기록이 없습니다.</p>
                )}
            </div>
        </Container>
    );
};

export default MyPageTabs;
