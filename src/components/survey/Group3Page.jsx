import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Group3Page() {
    const [group3Data, setGroup3Data] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foodRecommendations, setFoodRecommendations] = useState([]);
    const [keyword, setKeyword] = useState("");  // keyword 상태 추가
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8088/group3/random', {
            params: { previousSelections: location.state.previousSelections }
        })
            .then((response) => {
                setGroup3Data(response.data.selected);
            });
    }, [location.state.previousSelections]);

    const handleSelection = (selection) => {
        const fullPrompt = `${location.state.previousSelections},${selection.name}`;

        setLoading(true);

        axios.get('http://localhost:8088/gemini/question', { params: { prompt: fullPrompt } })
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
        const regex = /\*\*(.*?)\*\*/g;
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

    const handleKeywordClick = (selectedKeyword) => {
        // 선택한 keyword를 MapPage로 전달
        navigate('/map', { state: { keyword: selectedKeyword } });
    };

    return (
        <div>
            <h2>마지막 선택지를 고르세요!</h2>
            <div>
                {group3Data.map((item) => (
                    <button key={item.id} onClick={() => handleSelection(item)}>
                        {item.name}
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

export default Group3Page;
