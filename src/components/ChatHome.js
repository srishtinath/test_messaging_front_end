import React, { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';

const apiUrl = 'http://localhost:3000'

const ChatHome = (props) => {
    const [chatRooms, setChatRooms] = useState([])
    const [enterRoom, setEnter] = useState(false)
    const [currentRoomId, setCurrentRoom] = useState(0)
    
    useEffect(() => {
        fetch(`${apiUrl}/chat_rooms`)
        .then(response => response.json())
        .then(chatRoomsObject => {
            console.log(chatRoomsObject)
            setChatRooms(chatRoomsObject)
        })
    }, [])

    const setChatRoom = (e) => {
        console.log(e.target.value)
        setCurrentRoom(e.target.value)
        setEnter(true)
    }

    return ( 
    <div>
        {enterRoom ? 
        <ChatRoom currentRoom={currentRoomId} setEnter={setEnter}/>
        :
        <div id="chat-rooms-div">
            <form id="new-chat-room-form">
                <h3>Create a New Chat Room:</h3>
                <label>Chat Room Name: </label>
                <input type="text" />
                <button type="submit">Create New Chat Room</button>
            </form>
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
        </div>
        }
    </div> );
}
 
export default ChatHome;