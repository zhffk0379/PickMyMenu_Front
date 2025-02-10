import React, {useEffect, useState} from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {getMembers, updateMember} from '../../../services/admin/memberService';
import {Button, Table, Form} from 'react-bootstrap';
import edit from "../../../components/member/Edit";

const Members = () => {
    const [members, setMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null); // 수정할 회원 정보 상태

    useEffect(() => {

        fetchMembers();
    }, []);

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

    // 수정 버튼 클릭 시 수정할 회원 정보 활성화
    const handleEditClick = (member) => {
        setEditingMember({...member});
    };

    // 입력값 변경 시 상태 업데이트
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditingMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 수정된 회원 정보 저장
    const handleSave = async () => {
        const updatedMember = await updateMember(editingMember);
        setMembers(members.map(member =>
            member.id === updatedMember.id ? updatedMember : member
        ));
        setEditingMember(null); // 수정 완료 후 수정 상태 종료
        fetchMembers();
    };

    // 수정 취소
    const handleCancel = () => {
        setEditingMember(null);
    };

    return (
        <div>
            <AdminLayout>
                <h2>회원 관리</h2>
                {members.length > 0 ? (
                    <Table striped bordered hover responsive
                           className="table-fixed"
                           style={{
                               maxWidth: "90%",
                               marginLeft: "5%",
                               marginRight: "5%",
                               justifyContent: 'center'
                           }}>
                        <thead>
                        <tr>
                            <th style={{width: '80px'}}>ID</th>
                            <th style={{width: '150px'}}>이름</th>
                            <th style={{width: '200px'}}>이메일</th>
                            <th style={{width: '120px'}}>생년월일</th>
                            <th style={{width: '150px'}}>전화번호</th>
                            <th style={{width: '100px'}}>성별</th>
                            <th style={{width: '150px'}}>가입일</th>
                            <th style={{width: '100px'}}>리뷰</th>
                            <th style={{width: '150px'}}>활동내역</th>
                            <th style={{width: '120px'}}>수정</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                {editingMember?.id === member.id ? (
                                    // 수정 폼
                                    <>
                                        <td>{editingMember.id}</td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={editingMember.name}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>{member.email}</td>
                                        <td>
                                            <Form.Control
                                                type="date"
                                                name="birthdate"
                                                value={editingMember.birthdate}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="tel"
                                                name="phoneNumber"
                                                value={editingMember.phoneNumber}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Form.Select
                                                name="gender"
                                                value={editingMember.gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="male">남성</option>
                                                <option value="female">여성
                                                </option>
                                            </Form.Select>
                                        </td>
                                        <td>{editingMember.createdDate}</td>
                                        <td>{editingMember.review}</td>
                                        <td>{editingMember.restaurant}</td>
                                        <td>
                                            <Button variant="success"
                                                    onClick={handleSave}>저장</Button>
                                            <Button variant="danger"
                                                    onClick={handleCancel}>취소</Button>
                                        </td>
                                    </>
                                ) : (
                                    // 일반적으로 보여지는 회원 정보
                                    <>
                                        <td>{member.id}</td>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.birthdate}</td>
                                        <td>{member.phoneNumber}</td>
                                        <td>{member.gender}</td>
                                        <td>{member.createdDate}</td>
                                        <td>{member.review}</td>
                                        <td>{member.restaurant}</td>
                                        <td>
                                            <Button variant="primary"
                                                    onClick={() => handleEditClick(
                                                        member)}>수정</Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>회원 데이터가 없습니다.</p>
                )}
            </AdminLayout>
        </div>
    );
};

export default Members;
