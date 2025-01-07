import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";

function RandomChild() {
    const location = useLocation();  // 이전 페이지에서 전달된 데이터
    const { parentCategory, childCategories, previousSelections } = location.state || {};
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [foodRecommendations, setFoodRecommendations] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSelection = (selection) => {
        const fullPrompt = `${previousSelections},${selection.category}`;  // 이전 선택과 현재 선택을 포함

        setLoading(true);

        axios.get(`${apiUrl}/gemini/question`, { params: { prompt: fullPrompt } })
            .then((response) => {
                const foodNames = parseFoodRecommendations(response.data);
                setFoodRecommendations(foodNames);
            })
            .catch((error) => {
                console.error('API 호출 오류', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const parseFoodRecommendations = (text) => {
        // 숫자와 점, 공백 제거 후 음식명만 추출하고 괄호 안의 내용도 제거
        const regex = /\d+\.\s*([^\(\n]+)/g;
        let matches;
        const foodNames = [];

        while ((matches = regex.exec(text)) !== null) {
            // 첫 번째 그룹이 음식명
            let foodName = matches[1].trim();
            foodNames.push(foodName);
        }

        return foodNames;
    };



    /*
    const parseFoodRecommendations = (text) => {
        const regex = /\*\*(.*?)\*\*!/g;
        let matches;
        const foodNames = [];

        while ((matches = regex.exec(text)) !== null) {
            let foodName = matches[1].trim();
            foodName = foodName.replace(/\(.*?\)/g, '').trim();
            foodName = foodName.replace(/:/g, '').trim();
            foodNames.push(foodName);
        }

        return foodNames;
    };

    */

    const handleKeywordClick = (selectedKeyword) => {
        // 선택한 keyword를 MapPage로 전달
        navigate('/map', { state: { keyword: selectedKeyword } });
    };

    return (
        <div>
            <h2>두 번째 선택지를 고르세요!</h2>
            <div>
                {childCategories.map((item) => (
                        <button key={item.id} onClick={() => handleSelection(item)}>
                            {item.category}
                        </button>
                    ))}
            </div>

            {loading && <p>메뉴 추천중...</p>}

            <div>
                {foodRecommendations.length > 0 && (
                    <div>
                        <h3>추천된 음식</h3>
                        {foodRecommendations.map((food, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeywordClick(food)}  // 클릭 시 MapPage로 이동
                            >
                                {food}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RandomChild;
