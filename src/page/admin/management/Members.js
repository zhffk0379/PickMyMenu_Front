import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {getMembers} from '../../../services/admin/memberService';
import Table from '../../../components/admin/Table';

const Members = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const data = await getMembers();
            const filteredData = data.map(member => ({
                id: member.id,
                name: member.name,
                email: member.email,
                birthdate: member.birthdate,
                phoneNumber: member.phoneNumber,
                gender: member.gender,
                createdDate: member.createdDate,
                review: `리뷰 ${member.review}개`,
                restaurant: `식당 ${member.restaurant}곳`,
            }));
            setMembers(filteredData);
        };
        fetchMembers();
    }, []);

    return (
        <div>
            <AdminLayout>
                <h2>회원 관리</h2>
                <Table data={members} columns={['ID', '이름', '이메일', '생년월일', '전화번호', '성별', '가입일','활동내역']} />
            </AdminLayout>
        </div>
    );
};

export default Members;
