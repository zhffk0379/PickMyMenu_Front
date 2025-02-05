import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {getChoices} from '../../../services/admin/choicesService';
import Table from '../../../components/admin/Table';

const Choices = () => {
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        const fetchChoices = async () => {
            const data = await getChoices();
            const filteredData = data.map(choice => ({
                id: choice.id,
                question0: choice.question0,
                question1: choice.question1,
                useCount: choice.useCount,

            }));
            setChoices(filteredData);
        };
        fetchChoices();
    }, []);

    return (
        <div>
            <AdminLayout>
                <h2>설문 관리</h2>
                <Table data={choices} columns={['ID', '설문1', '설문2', '사용된 횟수']} />
            </AdminLayout>
        </div>
    );
};

export default Choices;
