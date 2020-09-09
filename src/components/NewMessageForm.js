import React, { useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';

const NewMessageForm = (props) => {

    const [text, setText] = useState('')
    const [chatroomid, setChatRoomId] = useState(0)

    useEffect(() => {
        setChatRoomId(props.chatroomId)
    }, [])

    const handleChange = (e) => {
        text(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch(`${API_ROOT}/messages`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({text, chatroomid})
        });
        setText('')
    }

    return ( 
        <div className="newMessageForm">
        <form onSubmit={handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={text}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </div>
     );
}
 
export default NewMessageForm;