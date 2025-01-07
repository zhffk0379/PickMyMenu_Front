import React, {useEffect, useState} from 'react';

/**
 * HomePage 컴포넌트
 * - 애플리케이션의 메인 페이지 역할을 합니다.
 * - 사용자가 처음 방문했을 때 보여지는 화면입니다.
 */
const HomePage = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        // Spring Boot 서버에서 데이터를 가져옵니다.
        fetch('https://localhost:8088/api/hello')
            .then((response) => response.text())
            .then((data) => setMessage(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    console.log(process.env)

    return (
        <div className="App">
            <h1>SpringBoot API TEST</h1>
            <h1>왜 안나오냐{process.env.REACT_APP_NAVER_MAP_CLIENT_ID}</h1>
            <p>{message}</p>  {/* 서버에서 받은 메시지를 화면에 출력 */}
            <button onClick={() => window.location.href = '/group1'}>음식 추천받으러 가자</button>
        </div>
    );
};

export default HomePage;