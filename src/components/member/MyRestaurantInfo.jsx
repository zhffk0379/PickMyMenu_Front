import React, { useEffect, useState } from 'react';
import axios from "axios";
import MyResMap from "../map/MyResMap";
import { Container, Spinner } from 'react-bootstrap';

function MyRestaurantInfo() {
    const [restaurantData, setRestaurantData] = useState(null); // 식당 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurant/inquiry`, {
                    withCredentials: true, // 쿠키 포함
                });

                if (response.data.success) {
                    setRestaurantData(response.data.data); // 데이터 설정
                    console.log(response.data.data)
                } else {
                    throw new Error("데이터를 가져오지 못했습니다.");
                }
            } catch (err) {
                setError(err.message); // 에러 메시지 저장
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchRestaurantData();
    }, []);

    const renderSpinner = (message) => (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" role="status" />
                <div className="mt-3">{message}</div>
            </div>
        </Container>
    );

    if (loading) return renderSpinner("로딩 중...");  // Spinner 컴포넌트 표시
    if (error) return <p>에러: {error}</p>;

    return (
        <div>
            <MyResMap restaurantData={restaurantData} />
        </div>
    );
}

export default MyRestaurantInfo;
