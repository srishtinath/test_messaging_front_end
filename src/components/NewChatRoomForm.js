import React, { useState } from 'react';
import { API_ROOT, HEADERS } from '../constants';


const NewChatRoomForm = () => {
    const [title, setTitle] = useState("")

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_ROOT}/chat_rooms`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(title)
        });
        setTitle('')
    }

    return ( 
    <div className="newConversationForm">
    <form onSubmit={handleSubmit}>
      <label>New Chat Room:</label>
      <br />
      <input
        type="text"
        value={title}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  </div> );
}
 
export default NewChatRoomForm;