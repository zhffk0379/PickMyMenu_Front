import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getReviews, updateReview, deleteReview } from '../../../services/admin/reviewService';
import { Button, Table, Form, Alert } from 'react-bootstrap';

const ReviewsManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null); // 수정 중인 리뷰
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const data = await getReviews();
            const filteredData = data.map(review => ({
                id: review.id,
                content: review.content,
                rating: review.rating,
                reviewImageUrl: review.reviewImageUrl,
                hiddenStatus: review.hiddenStatus,
                placeName: review.placeName,
                menu: review.menu,
                email: review.email,
            }));
            setReviews(filteredData);
        } catch (err) {
            setError('리뷰 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    };

    // 리뷰 수정 시작
    const handleEditClick = (review) => {
        setEditingReview({ ...review });
    };

    // 수정 입력 변경
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingReview(prev => ({ ...prev, [name]: value }));
    };

    // 리뷰 수정 저장
    const handleSave = async () => {
        try {
            const updated = await updateReview(editingReview);
            setReviews(reviews.map(review => review.id === updated.id ? updated : review));
            setEditingReview(null);
        } catch (err) {
            setError('리뷰 업데이트 중 오류가 발생했습니다.');
        }
    };

    // 수정 취소
    const handleCancel = () => {
        setEditingReview(null);
    };

    // 리뷰 삭제
    const handleDeleteClick = async (review) => {
        try {
            await deleteReview(review.id);
            fetchReviews();
        } catch (err) {
            setError('리뷰 삭제 중 오류가 발생했습니다.');
        }
    };

    // 이미지 클릭 시 새 창에서 크게 보여주기
    const openImageInNewWindow = (imageSrc) => {
        window.open(imageSrc, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,width=1000,height=800');
    };

    // 이미지 렌더링 함수
    const renderImage = (imageUrl) => {
        const fullUrl = `https://hhjnn92.synology.me/Project/PickMyMenu/Review/${imageUrl}`;
        return (
            <img
                src={fullUrl}
                style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                onClick={() => openImageInNewWindow(fullUrl)}
            />
        );
    };

    return (
        <AdminLayout>
            <h2>리뷰 관리</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table
                striped
                bordered
                hover
                responsive
                style={{ maxWidth: '90%', margin: '0 auto', justifyContent: 'center' }}
            >
                <thead>
                <tr>
                    <th style={{ width: '60px' }}>ID</th>
                    <th>내용</th>
                    <th style={{ width: '80px' }}>별점</th>
                    <th style={{ width: '80px' }}>사진</th>
                    <th style={{ width: '100px' }}>숨김상태</th>
                    <th>식당</th>
                    <th>메뉴</th>
                    <th style={{ width: '150px' }}>아이디</th>
                    <th style={{ width: '150px' }}>수정/삭제</th>
                </tr>
                </thead>
                <tbody>
                {reviews.map(review => (
                    <tr key={review.id}>
                        {editingReview && editingReview.id === review.id ? (
                            <>
                                <td>{editingReview.id}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="content"
                                        value={editingReview.content}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="rating"
                                        value={editingReview.rating}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>{renderImage(editingReview.reviewImageUrl)}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="hiddenStatus"
                                        value={editingReview.hiddenStatus}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>{review.placeName}</td>
                                <td>{review.menu}</td>
                                <td>{review.email}</td>
                                <td>
                                    <Button variant="success" onClick={handleSave} className="me-2">
                                        저장
                                    </Button>
                                    <Button variant="secondary" onClick={handleCancel} className="me-2">
                                        취소
                                    </Button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{review.id}</td>
                                <td>{review.content}</td>
                                <td>{review.rating}</td>
                                <td>{renderImage(review.reviewImageUrl)}</td>
                                <td>{review.hiddenStatus}</td>
                                <td>{review.placeName}</td>
                                <td>{review.menu}</td>
                                <td>{review.email}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEditClick(review)}
                                        className="me-2"
                                    >
                                        수정
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteClick(review)}>
                                        삭제
                                    </Button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>
        </AdminLayout>
    );
};

export default ReviewsManagement;