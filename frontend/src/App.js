import React, { useState } from 'react';
import './App.css';
import Write from './Write';
import Read from './Read';
import Ranking from './Ranking'; // Ranking 컴포넌트를 import 해야 합니다.
import airplaneimg from './assets/airplane.png';

function App() {
  const [activeButton, setActiveButton] = useState('write');

  return (
    <div className="mainbackground">
      <label className='header-label'>Travelog</label>
      <img src={airplaneimg} alt="airplane" className="airplane-image" />
      <div className="mainpage-wrapper">
        <header className="header">
          <div
            className={`headerbutton ${activeButton === 'write' ? 'activeButton' : ''}`}
            onClick={() => setActiveButton('write')}
          >
            Write
          </div>
          <div
            className={`headerbutton ${activeButton === 'read' ? 'activeButton' : ''}`}
            onClick={() => setActiveButton('read')}
          >
            Read
          </div>
          {/* Ranking 버튼 추가 */}
          <div
            className={`headerbutton ${activeButton === 'ranking' ? 'activeButton' : ''}`}
            onClick={() => setActiveButton('ranking')}
          >
            Ranking
          </div>
        </header>
        <main className="mainarticle">
          {activeButton === 'write' && <Write />}
          {activeButton === 'read' && <Read />}
          {activeButton === 'ranking' && <Ranking />} {/* Ranking 컴포넌트 렌더링 */}
        </main>
      </div>
    </div>
  );
}

export default App;
