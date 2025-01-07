import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RandomParent() {
    const [group1Data, setGroup1Data] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/random/parent`)
            .then((response) => {
                setGroup1Data(response.data);  // API에서 받은 목록을 group1Data에 저장
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
            });
    }, []);

    const handleSelection = (selection) => {
        axios.get(`${apiUrl}/random/child?parentId=${selection.id}`)
            .then((response) => {
                navigate('/children', {
                    state: {
                        parentCategory: selection.category,
                        childCategories: response.data,
                        previousSelections: selection.category
                    }
                });
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류가 발생했습니다: ", error);
            });
    };

    return (
        <div>
            <h2>첫 번째 선택지를 고르세요!</h2>
            <div>
                {group1Data.map((item) => (
                    <button key={item.id} onClick={() => handleSelection(item)}>
                        {item.category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RandomParent;
