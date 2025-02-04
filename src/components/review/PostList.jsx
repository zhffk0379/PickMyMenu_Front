import React from "react";
import { Card, Container } from "react-bootstrap";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";

// 별점 표시 컴포넌트
const StarRating = ({ rating }) => {
  const MAX_RATING = 5;
  const fullStar = "⭐"; // 채워진 별
  return (
    <span style={{ fontSize: "1.2rem", color: "#f8b400" }}>
      {fullStar.repeat(rating)} {/* 별점만큼 채워진 별 표시 */}
    </span>
  );
};

// 이미지 클릭하면 새창에서 열기 함수
function openImageInNewWindow(imageSrc) {
    window.open(imageSrc, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,width=1000,height=800');
}

const PostList = ({ reviews }) => {
  return (
        <Container className="my-4 d-flex flex-column align-items-center">
            {reviews.map((review) => (
                <Card key={review.id} className="shadow-sm mb-4 p-3" style={{ maxWidth: "600px", width: "100%" }}>
                    <Card.Body>
                        {/* 식당 이름 */}
                        <Card.Title>
                            <p className="fw-bold fs-4 text-center">{review.placeName}</p>
                        </Card.Title>
                        <hr/>
                        {/* 작성자 */}
                        <p className="text-muted" style={{fontSize: "0.9rem"}}>{review.email.slice(0, 2)}****</p>
                        {/* 별점 표시 */}
                        <StarRating rating={review.rating}/><span className="text-light"> |　</span><span
                        className="text-secondary">{review.createDate.split(' ')[0]} {/* 년월일만 출력 */}</span>

                        {/* 리뷰 이미지 */}
                        {review.reviewImageUrl && (
                            <div className="text-center my-3">
                                <img
                                    src={`https://hhjnn92.synology.me/Project/PickMyMenu/Review/${review.reviewImageUrl}`}
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => openImageInNewWindow(`https://hhjnn92.synology.me/Project/PickMyMenu/Review/${review.reviewImageUrl}`)}
                                />
                            </div>
                        )}

                        {/* 리뷰 내용 */}
                        <Card.Text className="mt-2 mb-4">{review.content}</Card.Text>
                        <span
                            style={{
                                display: "inline-block",
                                backgroundColor: "rgba(33, 150, 243, 0.2)",
                                color: "#1565c0",
                                padding: "6px 12px",
                                borderRadius: "20px",
                            }}
                        >
                          {review.menu}
                        </span>

                        <hr/>

                        <div className="d-flex justify-content-center mt-4">
                            <button
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.05)", // 연한 회색 배경
                                    color: "#555", // 어두운 회색 글씨
                                    border: "1px solid rgba(0, 0, 0, 0.2)", // 연한 테두리
                                    borderRadius: "8px",
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)")}
                            >
                                <FaThumbsUp size={18}/>
                            </button>
                            　　　
                            <button
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    color: "#555",
                                    border: "1px solid rgba(0, 0, 0, 0.2)",
                                    borderRadius: "8px",
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)")}
                            >
                                <FaThumbsDown size={18}/>
                            </button>
                        </div>

                    </Card.Body>
                </Card>
            ))}
        </Container>
  );
};

export default PostList;
