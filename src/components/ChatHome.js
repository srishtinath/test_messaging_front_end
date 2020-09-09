import React, { useState, useEffect } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewChatRoomForm from './NewChatRoomForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import ChatRoom from './ChatRoom';

const ChatHome = (props) => {
    const [chatRooms, setChatRooms] = useState([])
    const [enterRoom, setEnter] = useState(false)
    const [currentRoomId, setCurrentRoom] = useState(0)
    
    useEffect(() => {
        fetch(`${API_ROOT}/chat_rooms`)
        .then(response => response.json())
        .then(chatRoomsObject => {
            setChatRooms(chatRoomsObject)
        })
    }, [])

    const setChatRoom = (e) => {
        setCurrentRoom(e.target.value)
        setEnter(true)
    }

    const handleClick = (id) => {
        setCurrentRoom(id)
    };

    const handleReceivedConversation = (e) => {
        console.log(e.target)
    }
    const handleReceivedMessage = (e) => {
        console.log(e.target)
    }

    return ( 
    <div>
       <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ChatRoomsChannel' }}
          onReceived={handleReceivedConversation}
        />
        {chatRooms.length ? (
          <Cable
            chatrooms={chatRooms}
            handleReceivedMessage={handleReceivedMessage}
          />
        ) : null}
        <h3>All Chat Rooms:</h3>
            <div id="chat-rooms-list">
                <ul>
                    {chatRooms ? 
                        chatRooms.map(room => 
                        <li key={room.id}>{room.name} <button onClick={setChatRoom} value={room.id}>Join</button></li>
                        )
                    :
                    <div>No chat rooms! Create a new one.</div>
                    }
                </ul>
            </div>
            <NewChatRoomForm />
            {currentRoomId ? (
            <MessagesArea currentRoomId={currentRoomId} />
            ) : null}
      </div>
    </div>)
}
 
export default ChatHome;