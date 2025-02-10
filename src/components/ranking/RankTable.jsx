import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { getRankRestaurant } from "../../services/rank/rankService";
import RestaurantModal from './RestaurantModal';  // 모달 컴포넌트 import

const RankTable = ({ title, type, data, callback }) => {
    const [rankData, setRankData] = useState([]);
    const [restaurantRankData, setRestaurantRankData] = useState(null); // 수정: 초기값 null로 설정
    const [isModalOpen, setIsModalOpen] = useState(false); // 수정: 모달 열림 상태 추가

    useEffect(() => {
        setRankData(data);
    }, [data]);

    const getRestaurantInfo = (menuName) => {
        getRankRestaurant({ type: type, menuName: menuName }).then((data) => {
            setRestaurantRankData(data.data);
            setIsModalOpen(true); // 수정: 모달 열기
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);  // 수정: 모달 닫기
        setRestaurantRankData(null); // 수정: 모달 닫을 때 데이터 초기화
    };

    return (
        <>
            <Col xs={12} md={6} lg={12} className="mb-4">
                <Card className="rank-table-card">
                    <Card.Header
                        className="rank-table-title d-flex justify-content-between align-items-center"
                    >
                        <h5 className="mb-0">{title}</h5>
                        <Button onClick={() => callback("DAY")}>일</Button>
                        <Button onClick={() => callback("WEEK")}>주</Button>
                        <Button onClick={() => callback("MONTH")}>월</Button>
                        <Button onClick={() => callback("YEAR")}>년</Button>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table striped bordered hover className="rank-table mb-0">
                            <thead className="table-dark">
                            <tr>
                                <th>순위</th>
                                <th>메뉴명</th>
                                <th>선택 수</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rankData.length > 0 ? (
                                rankData.map((item, index) => (
                                    <tr key={index} onClick={() => getRestaurantInfo(item.menu)}>
                                        <td>{index + 1}</td>
                                        <td>{item.menu}</td>
                                        <td>{item.menuCount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted">
                                        No data available
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>

            {/* 수정: RestaurantModal 컴포넌트를 추가하여 모달을 표시 */}
            <RestaurantModal
                isOpen={isModalOpen}
                onClose={closeModal}
                restaurantData={restaurantRankData}
            />
        </>
    );
};

export default RankTable;
