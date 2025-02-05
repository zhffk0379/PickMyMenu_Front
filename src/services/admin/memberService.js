import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getMembers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/members`);
        console.log('백엔드 응답 데이터:', response.data); // 응답 확인
        return response.data;
    } catch (error) {
        console.error('회원 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};
