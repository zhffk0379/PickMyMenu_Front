import React from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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

// 리뷰 숨기기
const hideReview = async (review) => {
    const isConfirmed = window.confirm("리뷰를 숨길까요?");

    if (isConfirmed) {
        try {
            const response = await axios.post(`${apiUrl}/review/hide`, null, {
                params: {
                    resultMenuId: review.resultMenuId,
                },
                withCredentials: true,
            });

            console.log(response);

            if (response.data.success === true) {
                window.location.reload(); // 페이지 새로 고침
                alert("리뷰를 숨겼습니다.");
            }else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("리뷰 숨기기 실패:", error);
            alert("리뷰 숨기기 실패");
        }
    }
}


// 리뷰 보이기
const unhideReview = async (review) => {
    const isConfirmed = window.confirm("리뷰를 다시 공개할까요?");

    if (isConfirmed) {
        try {
            const response = await axios.post(`${apiUrl}/review/unHide`, null, {
                params: {
                    resultMenuId: review.resultMenuId,
                },
                withCredentials: true,
            });

            console.log(response);

            if (response.data.success === true) {
                window.location.reload(); // 페이지 새로 고침
                alert("리뷰를 다시 공개했습니다.");
            }else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("리뷰 공개 실패:", error);
            alert("리뷰 공개 실패");
        }
    }
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
                      <p className="text-muted" style={{fontSize: "0.9rem"}}>{review.email}</p>

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
                                  backgroundColor: review.hiddenStatus === 0 ? "#dc3545" : "#28a745", // 빨강 or 초록
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "8px",
                                  padding: "6px 12px",
                                  fontSize: "14px",
                                  cursor: "pointer",
                                  transition: "0.3s",
                              }}
                              onMouseOver={(e) => (e.target.style.backgroundColor = review.hiddenStatus === 0 ? "#c82333" : "#218838")}
                              onMouseOut={(e) => (e.target.style.backgroundColor = review.hiddenStatus === 0 ? "#dc3545" : "#28a745")}
                              onClick={() => review.hiddenStatus === 0 ? hideReview(review) : unhideReview(review)}
                          >
                              {review.hiddenStatus === 0 ? "리뷰 숨기기" : "리뷰 보이기"}
                          </button>
                      </div>

                      {/* 댓글 수 배지 (예시로 추가) */}
                      {/*<Badge bg="info">댓글 5개</Badge>*/}
                  </Card.Body>
              </Card>
          ))}
      </Container>
  );
};

export default PostList;
