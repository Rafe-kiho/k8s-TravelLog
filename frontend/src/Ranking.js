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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/travel/ranked_travel_list/`, {
          params: {
            city: searchTerm,
            tag: searchTerm
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('포스팅 데이터를 불러오는 데 실패했습니다', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/travel/top_users/`);
        setUsers(response.data);
      } catch (error) {
        console.error('유저 데이터를 불러오는 데 실패했습니다', error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, [searchTerm]); // searchTerm이 변경될 때마다 fetchPosts를 호출하여 데이터를 업데이트합니다.

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="ranking-container">
      <div className="ranking-content">
        <div className="ranking-list ranking-posts">
          <h2>★ Best Review ★</h2>
          <input
            type="text"
            className="input-field"
            placeholder="도시 또는 태그 검색..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <ol>
            {posts.map((post, index) => (
              <li key={index}>
                <span>{index + 1}.</span> {post.City} ({post.like_count} likes)
              </li>
            ))}
          </ol>
        </div>
        <div className="ranking-list ranking-users">
          <h2>★ Best Traveler ★</h2>
          <ol>
            {users.map((user, index) => (
              <li key={index}>
                <span>{index + 1}.</span> {user.name} - {user.total_likes} likes
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
