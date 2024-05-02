import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import airplaneimg from './assets/airplane.png';
import budget from './assets/budget.png';
import period from './assets/period.png';
import tag from './assets/tag.png';

function Read() {
  const [data, setData] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeMessage, setLikeMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/travel/`);
        setData(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  const openModal = (journal) => {
    setSelectedJournal(journal);
    setIsModalOpen(true);
    setLikeMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = async (travelId) => {
    const username = localStorage.getItem('username'); // 사용자 이름 로컬 스토리지에서 가져오기
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/travel/${travelId}/like/`, {
        name: username
      });
      setLikeMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setLikeMessage(error.response.data.message);
      } else {
        setLikeMessage('좋아요를 처리할 수 없습니다.');
      }
    }
  };

  return (
    <div className="read-container">
      {data.map((item, index) => (
        <div key={index} className="card" onClick={() => openModal(item)}>
          <img src={airplaneimg} className="card-image" alt='airplane' />
          <div className="card-title">{item.City}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={budget} alt='budget' className="card-descriptionimg" />
            <div style={{ width: "20px" }}></div>
            <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginRight: '20px' }}>
              {new Intl.NumberFormat('ko-KR').format(item.Money)} 원
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={period} alt='period' style={{ width: '40px' }} />
            <div style={{ width: "22px" }}></div>
            <div style={{ fontSize: '15px', textAlign: 'center', fontWeight: 'bold', marginRight: '20px' }}>{item.Date}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={tag} alt='tag' className="card-descriptionimg" />
            <div style={{ width: "10px" }}></div
            <div style={{ fontSize: '17px', textAlign: 'center', fontWeight: 'bold' }}>{item.Tag}</div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{selectedJournal.Journal}</p>
            <p>Posted by: {selectedJournal.name}</p>
            <p>Likes: {selectedJournal.likes_count}</p>
            <button onClick={() => handleLike(selectedJournal.TravelID)}>Like</button>
            {likeMessage && <p>{likeMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Read;
