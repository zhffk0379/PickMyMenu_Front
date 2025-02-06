import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getMembers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/members`, {
            withCredentials: true
        });
        console.log('백엔드 응답 데이터:', response.data); // 응답 확인
        return response.data;
    } catch (error) {
        console.error('회원 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};

// 회원 정보 수정하기
export const updateMember = async (member) => {
    const response = await axios.put(`${apiUrl}/member/${member.id}`, member, {
        withCredentials: true
    });
    return response.data;
};