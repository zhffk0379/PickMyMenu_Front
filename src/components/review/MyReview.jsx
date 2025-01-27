import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "./PostList";
import Pagination from "../Pagenation";
import { getMyReviewList } from "../../services/review/myReviewService";
import MyReview from "./MyReview";
import MyReviewList from "./MyReviewList";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0); // 총 리뷰 개수
  const reviewsPerPage = 10; // 한 페이지당 리뷰 수

  useEffect(() => {
    // API 요청
      getMyReviewList(currentPage - 1, reviewsPerPage).then(res => {
          const { content, totalPages, totalElements } = res.data; // content와 totalElements 추출
          setReviews(content); // 현재 페이지 리뷰
          setTotalReviews(totalElements); // 총 리뷰 개수 설정
        })
  }, [currentPage, reviewsPerPage]); // currentPage 또는 reviewsPerPage 변경 시 호출

  return (
    <Container>
      <h1 className="my-4 text-center">내가 쓴 리뷰</h1>
      <MyReviewList reviews={reviews} /> {/* PostList에 현재 페이지 리뷰 전달 */}
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
