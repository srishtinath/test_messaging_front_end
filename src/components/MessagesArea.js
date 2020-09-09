import React, { useEffect, useState } from 'react';
import NewMessageForm from './NewMessageForm';
import { API_ROOT } from '../constants';


const MessagesArea = (props) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch(`${API_ROOT}/chat_rooms/${props.currentRoomId}`)
        .then(r => r.json())
        .then(messages => setMessages(messages))
    })

  return (
    <div className="messagesArea">
      {/* <h2>{props.title}</h2> */}
      {/* <ul>{orderedMessages(messages)}</ul> */}
        <div>{messages.content}</div>
      <NewMessageForm chat_room_id={props.currentRoomId} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>;
  });
};