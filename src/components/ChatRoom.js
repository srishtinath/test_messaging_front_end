import React from 'react';

const webSocketUrl = 'ws://localhost:3000/cable'

function createChatRoomWebsocketConnection(chatRoomId) {
    
    // Creates the new websocket connection
    const socket = new WebSocket(webSocketUrl);

        // When the connection is 1st created, this code runs subscribing the clien to a specific chatroom stream in the ChatRoomChannel
        socket.onopen = function(event) {
            console.log('WebSocket is connected.');

            const msg = {
                command: 'subscribe',
                identifier: JSON.stringify({
                    id: chatRoomId,
                    channel: 'ChatRoomChannel'
                }),
            };
    
            socket.send(JSON.stringify(msg));
        };
        
        // When the connection is closed, this code is run
        socket.onclose = function(event) {
        console.log('WebSocket is closed.');
        };

        // When a message is received through the websocket, this code is run
        socket.onmessage = function(event) {            
            const response = event.data;
            const msg = JSON.parse(response);
            
            // Ignores pings
            if (msg.type === "ping") {
                return;
            } 

            console.log("FROM RAILS: ", msg);
            
            // Renders any newly created messages onto the page
            if (msg.message) {
                renderMessage(msg.message)
            }
            
          };
        
        // When an error occurs through the websocket connection, this code is run printing the error message
        socket.onerror = function(error) {
            console.log('WebSocket Error: ' + error);
        };
}

function renderMessage(messageObject) {
    const messagesListDiv = document.getElementById('messages-list');

    const messageDiv = document.createElement('div')

    messageDiv.innerHTML = ``
    messageDiv.textContent = messageObject.content;
    messageDiv.dataset.messageId = messageObject.id;

    messagesListDiv.prepend(messageDiv);
}



const ChatRoom = (props) => {

    const gobackmenu = () => {
        props.setEnter(false)
    }
    
    createChatRoomWebsocketConnection()
    return ( 
        <div>
            <div id="chat-room-div">
            <form id="new-message-form">
                <label>New Message: </label>
                <input type="text" />
                <button type="submit">Send Message</button>
            </form>
            <div id="messages-list">

            </div>
        </div>
        <button onClick={gobackmenu}>Go Back</button>
        </div>
     );
}
 
export default ChatRoom;