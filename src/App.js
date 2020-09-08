import React, {useState} from 'react';

import ChatHome from './components/ChatHome'
import ChatRoom from './components/ChatRoom'
import Home from './components/Home'

import './App.css';

function App() {

  const [currentRoom, setCurrentRoom] = useState({})

  return (
    <>
    <Home />
    <div>
      <ChatHome currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
      <ChatRoom currentRoom={currentRoom}/>

    </div>
    </>
  );
}

export default App;
