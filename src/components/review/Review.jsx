import React, {useEffect, useState} from "react";
import {Container, Dropdown, Button, Row, Col} from "react-bootstrap";
import PostList from "./PostList";
import Pagination from "../Pagenation";
import {getReviewList} from "../../services/review/reviewService";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0); // 총 리뷰 개수
    const [sortOption, setSortOption] = useState("createdDate,desc"); // 기본 정렬
    const reviewsPerPage = 10; // 한 페이지당 리뷰 수

    // 정렬 옵션 목록
    const sortOptions = [
        {value: "createdDate,desc", label: "최신순"},
        {value: "createdDate,asc", label: "오래된순"},
        {value: "rating,desc", label: "평점 높은순"},
        {value: "rating,asc", label: "평점 낮은순"},
    ];

    useEffect(() => {
        // API 요청
        getReviewList(currentPage - 1, reviewsPerPage, sortOption).then(res => {
            const {content, totalElements} = res.data; // content와 totalElements 추출
            setReviews(content); // 현재 페이지 리뷰
            setTotalReviews(totalElements); // 총 리뷰 개수 설정
        });
    }, [currentPage, reviewsPerPage, sortOption]); // sortOption 변경 시 API 호출

    return (
        <Container style={{maxWidth: "600px"}}>
            <Row className="align-items-center mb-3">
                <Col md={9}>
                    <h1 className="my-4 text-left">리뷰 게시판</h1>
                </Col>
                <Col>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle className="text-bg-primary">
                            {sortOptions.find(opt => opt.value === sortOption)?.label || "정렬 선택"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {sortOptions.map(option => (
                                <Dropdown.Item
                                    key={option.value}
                                    active={sortOption === option.value}
                                    onClick={() => setSortOption(option.value)}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {/* 정렬 드롭다운 */}

            <PostList reviews={reviews}/> {/* PostList에 현재 페이지 리뷰 전달 */}
            <Pagination
                totalPosts={totalReviews} // 총 리뷰 개수
                postsPerPage={reviewsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Container>
    );
};

export default Review;
