import React from "react";
import { Card, Button, Row, Col, Badge, Container } from "react-bootstrap";

// 별점 표시 컴포넌트
const StarRating = ({ rating }) => {
  const MAX_RATING = 5;
  const fullStar = "⭐"; // 채워진 별
  return (
    <span style={{ fontSize: "1.5rem", color: "#f8b400" }}>
      {fullStar.repeat(rating)} {/* 별점만큼 채워진 별 표시 */}
    </span>
  );
};

const PostList = ({ reviews }) => {
  return (
    <Container className="my-4">
      <Row>
        {reviews.map((review) => (
          <Col sm={12} md={6} lg={4} key={review.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  <h5>{review.placeName}</h5>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{review.menu}</Card.Subtitle>
                <Card.Text className="text-muted">
                  {review.createDate}
                </Card.Text>
                {/* 별점 표시 */}
                <StarRating rating={review.rating} />

                <hr />

                {/* 리뷰 내용 */}
                <Card.Text>{review.content}</Card.Text>

                {/* 이메일 */}
                <Card.Text className="text-muted">
                  {review.email}
                </Card.Text>
                {/* 댓글 수 배지 (예시로 추가) */}
                {/*<Badge bg="info">댓글 5개</Badge>*/}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostList;
