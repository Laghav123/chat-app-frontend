import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatRoom from './ChatRoom/ChatRoom';
import LandingPage from './Landing Page/LandingPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/LandingPage" element={<LandingPage/>} />
        <Route path="/ChatRoom" element={<ChatRoom/>} />
        <Route path="*" element={<NoMatch/>} />
      </Routes>
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
