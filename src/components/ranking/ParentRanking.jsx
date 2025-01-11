import React, { useState, useEffect } from "react";
import axios from "axios";

const ParentRanking = () => {
    // 상태 변수 초기화
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/survey/rank`); // API 호출
                setData(response.data); // 데이터 저장
                setLoading(false); // 로딩 상태 변경
            } catch (err) {
                setError("데이터를 불러오는 데 오류가 발생했습니다.");
                setLoading(false);
            }
        };

        fetchData();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // 로딩 중일 때 보여줄 UI
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 에러가 발생했을 때 보여줄 UI
    if (error) {
        return <div>{error}</div>;
    }

    // 데이터를 렌더링
    return (
        <div className="container mt-5">
            <h2 className="mb-4">랭킹</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>선택횟수</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item[0]}</td> {/* 카테고리 이름 */}
                        <td>{item[1]}</td> {/* 카운트 */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParentRanking;
