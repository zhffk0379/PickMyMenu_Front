import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Group1Page() {
    const [group1Data, setGroup1Data] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/group1/random`)
            .then((response) => {
                setGroup1Data(response.data.selected);
            });
    }, []);

    const handleSelection = (selection) => {
        navigate('/group2', { state: { previousSelections: selection.name } });
    };

    return (
        <div>
            <h2>첫 번째 선택지를 고르세요!</h2>
            <div>
                {group1Data.map((item) => (
                    <button key={item.id} onClick={() => handleSelection(item)}>
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Group1Page;
