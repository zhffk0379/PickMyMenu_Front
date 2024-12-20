import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Spring Boot 서버에서 데이터를 가져옵니다.
    fetch('http://localhost:8080/api/hello')
        .then((response) => response.text())
        .then((data) => setMessage(data))
        .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
      <div className="App">
        <h1>SpringBoot API TEST</h1>
        <p>{message}</p>  {/* 서버에서 받은 메시지를 화면에 출력 */}
      </div>
  );
}


/*

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
