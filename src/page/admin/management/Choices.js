import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
    createChoice, deleteChoice,
    getChoices,
    updateChoice
} from '../../../services/admin/choicesService';
import {Button, Table, Form, Alert, Modal} from 'react-bootstrap';

const Choices = () => {
    const [choices, setChoices] = useState([]);
    const [editingChoice, setEditingChoice] = useState(null); // 수정할 항목 상태
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newChoice, setNewChoice] = useState({ question0: '', question1: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [choiceToDelete, setChoiceToDelete] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchChoices();
    }, []);

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

    // 수정 버튼 클릭 시 수정할 항목 활성화
    const handleEditClick = (choice) => {
        setEditingChoice({ ...choice });
    };

    const handleDeleteClick = async (choice) => {
        setChoiceToDelete(choice);
        setShowDeleteModal(true);
    }
    // Modal에서 삭제 확인 시 호출
    const handleDeleteConfirm = async () => {
        await deleteChoice(choiceToDelete);
        await fetchChoices();
        setShowDeleteModal(false);
        setChoiceToDelete(null);
    };
    // Modal 취소 시 호출
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setChoiceToDelete(null);
    };

    // 입력값 변경 시 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingChoice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 수정된 항목 저장
    const handleSave = async () => {
        const updatedChoice = await updateChoice(editingChoice); // 서버에 업데이트 요청
        setChoices(choices.map(choice =>
            choice.id === updatedChoice.id ? updatedChoice : choice
        ));
        setEditingChoice(null); // 수정 완료 후 수정 상태 종료
        fetchChoices();
    };

    // 수정 취소
    const handleCancel = () => {
        setEditingChoice(null);
    };

    // 설문 추가 관련 함수들
    const handleCreateClick = () => {
        setShowCreateForm(true);
        setNewChoice({ question0: '', question1: '' });
    };

    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setNewChoice(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateSave = async () => {
        if (!newChoice.question0.trim() || !newChoice.question1.trim()) {
            setError('두 개의 설문 항목을 모두 입력해주세요');
            return;
        }

        try {
            await createChoice(newChoice);
            setShowCreateForm(false);
            setError('');
            fetchChoices(); // 새로고침
        } catch (err) {
            setError('설문 생성 중 오류 발생');
        }
    };

    const handleCreateCancel = () => {
        setShowCreateForm(false);
        setNewChoice({ question0: '', question1: '' });
        setError('');
    };

    return (
        <div>
            <AdminLayout>

                <h2>설문 관리</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <div style={{ margin: '20px 5%' }}>
                    <Button variant="success" onClick={handleCreateClick}>
                        새 설문 추가
                    </Button>
                </div>

                {/* 설문 추가 폼 */}
                {showCreateForm && (
                    <div style={{
                        margin: '20px 5%',
                        padding: '20px',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                    }}>
                        <h4>새 설문 작성</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>설문 항목 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="question0"
                                    value={newChoice.question0}
                                    onChange={handleCreateInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>설문 항목 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="question1"
                                    value={newChoice.question1}
                                    onChange={handleCreateInputChange}
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleCreateSave}>
                                저장
                            </Button>
                            <Button variant="secondary" onClick={handleCreateCancel} className="ms-2">
                                취소
                            </Button>
                        </Form>
                    </div>
                )}

                {choices.length > 0 ? (
                    <Table striped bordered hover responsive style={{
                        maxWidth: "90%",
                        marginLeft: "5%",
                        marginRight: "5%",
                        justifyContent: 'center'
                    }}>
                        <thead>
                        <tr>
                            <th style={{width: '60px'}}>ID</th>
                            <th>설문1</th>
                            <th>설문2</th>
                            <th style={{width: '80px'}}>사용수</th>
                            <th style={{width: '128px'}}>수정</th>
                        </tr>
                        </thead>
                        <tbody>
                        {choices.map((choice) => (
                            <tr key={choice.id}>
                                {editingChoice?.id === choice.id ? (
                                    // 수정 폼
                                    <>
                                        <td>{editingChoice.id}</td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                name="question0"
                                                value={editingChoice.question0}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                name="question1"
                                                value={editingChoice.question1}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>{choice.useCount}</td>
                                        <td>
                                            <Button variant="success" onClick={handleSave}>저장</Button>
                                            <Button variant="danger" onClick={handleCancel}>취소</Button>
                                        </td>
                                    </>
                                ) : (
                                    // 일반적으로 보여지는 설문 정보
                                    <>
                                        <td>{choice.id}</td>
                                        <td>{choice.question0}</td>
                                        <td>{choice.question1}</td>
                                        <td>{choice.useCount}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => handleEditClick(choice)}>수정</Button>
                                            <Button variant="danger" onClick={() => handleDeleteClick(choice)}>삭제</Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>설문 데이터가 없습니다.</p>
                )}

                {/* 삭제 확인 Modal */}
                <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>설문 삭제 확인</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        정말 이 설문을 삭제하시겠습니까?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteCancel}>
                            취소
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            삭제
                        </Button>
                    </Modal.Footer>
                </Modal>
            </AdminLayout>
        </div>
    );
};

export default Choices;
