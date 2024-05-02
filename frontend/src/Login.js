import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import travelLogLogo from './assets/TravelLog_with_k8s.png'; // 이미지 경로 확인

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/travel/login/`, {
        name: username,
        password: password
      });
      localStorage.setItem('username', response.data.user.name);
      alert('로그인 성공!');
      // 리다이렉트하거나 상태 업데이트
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLoginError('사용자를 찾을 수 없습니다.');
      } else if (error.response && error.response.status === 400) {
        setLoginError('비밀번호가 틀렸습니다.');
      } else {
        setLoginError('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <label htmlFor="username" className="input-label">ID</label>
            <input
              type="text"
              id="username"
              placeholder="ID 입력.."
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="login-input-field" // 새로운 클래스 적용
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className="input-label">PW</label>
            <input
              type="password"
              id="password"
              placeholder="PW 입력.."
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-input-field" // 새로운 클래스 적용
              required
            />
          </div>
          {loginError && <p className="login-error">{loginError}</p>}
          <button type="submit" className="login-button">로그인</button>
        </form>
        <img src={travelLogLogo} alt="TravelLog Logo" className="login-logo"/>
      </div>
    </div>
  );
}

export default Login;
