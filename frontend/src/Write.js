import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import state from './assets/state.png';
import budget from './assets/budget.png';
import periods from './assets/period.png';
import tags from './assets/tag.png';
import note from './assets/note.png';

function Write() {
  const [city, setCity] = useState('');
  const [money, setMoney] = useState('');
  const [period, setPeriod] = useState('');
  const [tag, setTag] = useState('');
  const [journal, setJournal] = useState('');

  const handleCityChange = (e) => setCity(e.target.value);
  const handleMoneyChange = (e) => setMoney(e.target.value);
  const handlePeriodChange = (e) => setPeriod(e.target.value);
  const handleTagChange = (e) => setTag(e.target.value);
  const handleJournalChange = (e) => setJournal(e.target.value);

  const saveData = () => {
    const data = { City: city, Money: money, Tag: tag, Date: period, Journal: journal };
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/travel/api/`, data)
      .then(response => {
        alert('저장되었습니다.');
        setCity('');
        setMoney('');
        setPeriod('');
        setTag('');
        setJournal('');
      })
      .catch(error => {
        alert('저장에 실패하였습니다.');
      });
  };

  return (
    <div className="write-container">
      <div className="input-row">
        <div className="input-group">
          <div className="input-label">
            <img src={state} alt='state' className="icon-small" />
            도시
          </div>
          <input type="text" className="input-field" placeholder="도시" value={city} onChange={handleCityChange} />
        </div>
        <div className="input-group">
          <div className="input-label">
            <img src={budget} alt='budget' className="icon-small" />
            경비
          </div>
          <input type="text" className="input-field" placeholder="예산" value={money} onChange={handleMoneyChange} />
        </div>
      </div>
      <div className="input-row">
        <div className="input-group">
          <div className="input-label">
            <img src={periods} alt='periods' className="icon-small" />
            여행기간
          </div>
          <input type="text" className="input-field" placeholder="여행 기간" value={period} onChange={handlePeriodChange} />
        </div>
        <div className="input-group">
          <div className="input-label">
            <img src={tags} alt='tags' className="icon-small" />
            해시태그
          </div>
          <input type="text" className="input-field" placeholder="해시태그" value={tag} onChange={handleTagChange} />
        </div>
      </div>
      <div className="input-group">
        <div className="input-label">
          <img src={note} alt='note' className="icon-large" />
          일지
        </div>
        <input type="text" className="input-field input-post" placeholder="일지 내용" value={journal} onChange={handleJournalChange} />
      </div>
      <button className="button" onClick={saveData}>저장</button>
    </div>
  );
}

export default Write;
