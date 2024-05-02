import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Ranking() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/travel/api/`);
        setPosts(response.data.sort((a, b) => b.recommendations - a.recommendations));
      } catch (error) {
        console.error('포스팅 데이터를 불러오는 데 실패했습니다', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/travel/`);
        setUsers(response.data.sort((a, b) => b.recommendations - a.recommendations));
      } catch (error) {
        console.error('유저 데이터를 불러오는 데 실패했습니다', error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ranking-container">
      <div className="ranking-content">
        <div className="ranking-list ranking-posts">
        <h2>★ Best Review ★</h2>
        <input
          type="text"
          className="input-field"
          placeholder="도시 검색..."
          value={searchTerm}
          onChange={handleSearch}
        />
          <ol>
            {filteredPosts.slice(0, 5).map((post, index) => (
              <li key={index}>
                <span>{index + 1}.</span> {post.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="ranking-list ranking-users">
          <h2>★ Best Traveler ★</h2>
          <ol>
            {users.slice(0, 5).map((user, index) => (
              <li key={index}>
                <span>{index + 1}.</span> {user.name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Ranking;