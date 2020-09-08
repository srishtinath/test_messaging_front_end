import React, { useState, useEffect } from 'react';

const apiUrl = 'http://localhost:3000'

const ChatHome = (props) => {
    const [chatRooms, setChatRooms] = useState([])
    
    useEffect(() => {
        fetch(`${apiUrl}/chat_rooms`)
        .then(response => response.json())
        .then(chatRoomsObject => {
            setChatRooms(chatRoomsObject);
    })
    }, [])
    

    const setCurrentRoom = (e) => {
        console.log(e.target)
        // props.setCurrentRoom(e.target)
    }

    return ( <div>
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
                        chatRooms.forEach(room => 
                        <li>{room.name} <button onClick={setCurrentRoom}>Join</button></li>
                        )
                    :null}
                </ul>
            </div>
        </div>
    </div> );
}
 
export default ChatHome;