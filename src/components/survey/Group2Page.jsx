import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Group2Page() {
    const [group2Data, setGroup2Data] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8088/group2/random', {
            params: { previousSelections: location.state.previousSelections }
        })
            .then((response) => {
                setGroup2Data(response.data.selected);
            });
    }, [location.state.previousSelections]);

    const handleSelection = (selection) => {
        navigate('/group3', { state: { previousSelections: `${location.state.previousSelections},${selection.name}` } });
    };

    return (
        <div>
            <h2>두 번째 선택지를 고르세요!</h2>
            <div>
                {group2Data.map((item) => (
                    <button key={item.id} onClick={() => handleSelection(item)}>
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Group2Page;
