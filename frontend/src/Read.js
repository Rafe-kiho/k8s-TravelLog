import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import airplaneimg from './assets/airplane.png';
import budget from './assets/budget.png';
import period from './assets/period.png';
import tag from './assets/tag.png';
function Read() {
  const [data, setData] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API에서 데이터를 불러오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/travel/api/`);
        setData(response.data); // 예시 응답 데이터 구조를 가정합니다.
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchData();
  }, []);

  // 모달을 여는 함수
  const openModal = (journal) => {
    setSelectedJournal(journal);
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="read-container">
      {data.map((item, index) => (
        <div key={index} className="card" onClick={() => openModal(item.Journal)}>
          <img src={airplaneimg} class="card-image" alt='airplane' ></img>
          <div class="card-title">{item.City}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={budget} alt='budget' className="card-descriptionimg" />
            <div style={{ width: "20px" }}></div>
            <div style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginRight: '20px' }}>
              {new Intl.NumberFormat('ko-KR').format(item.Money)} 원
            </div>
          </div>
          <div style={{ marginTop: "20px" }}></div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={period} alt='period' style={{ width: '40px' }} />
            <div style={{ width: "22px" }}></div>
            <div style={{ fontSize: '15px', textAlign: 'center', fontWeight: 'bold', marginRight: '20px' }}>{item.Date}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={tag} alt='tag' className="card-descriptionimg" />
            <div style={{ width: "10px" }}></div>
            <div style={{ fontSize: '17px', textAlign: 'center', fontWeight: 'bold' }}>{item.Tag}</div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{selectedJournal}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Read;