import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getChoices = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/choices`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('회원 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};

export const updateChoice = async (choice) => {
    try {
        const response = await axios.put(`${apiUrl}/v1/choice/${choice.id}`, choice,
            {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('회원 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};

export const createChoice = async (choice) => {
    try {
        const response = await axios.post(`${apiUrl}/v1/choice`, choice,
            {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('회원 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};

export const deleteChoice = async (choice) => {
    try {
        const response = await axios.delete(`${apiUrl}/v1/choice/${choice.id}`,
            {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('회원 목록을 가져오는 중 오류 발생:', error);
        return [];
    }
};
