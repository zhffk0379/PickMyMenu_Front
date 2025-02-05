import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {getReviews} from '../../../services/admin/reviewService';
import Table from '../../../components/admin/Table';

const Members = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getReviews();
            const filteredData = data.map(review => ({
                id: review.id,
                content: review.content,
                rating: review.rating,
                // reviewImageUrl: review.reviewImageUrl,
                reviewImageUrl: (
                    <img src={`https://hhjnn92.synology.me/Project/PickMyMenu/Review/${review.reviewImageUrl}`}
                         style={{width: "50px", height: "50px", cursor: "pointer"}}
                         onClick={() => openImageInNewWindow(`https://hhjnn92.synology.me/Project/PickMyMenu/Review/${review.reviewImageUrl}`)}/>
                    ),
                hiddenStatus: review.hiddenStatus,
                placeName: review.placeName,
                menu: review.menu,
                email: review.email,
            }));
            setReviews(filteredData);
        };
        fetchReviews();
    }, []);


    function openImageInNewWindow(imageSrc) {
        window.open(imageSrc, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,width=1000,height=800');
    }


    return (
        <div>
            <AdminLayout>
                <h2>리뷰 관리</h2>
                <Table data={reviews} columns={['ID', '내용', '별점', '사진', '숨김상태', '식당', '메뉴', '아이디']} />
            </AdminLayout>
        </div>
    );
};

export default Members;
