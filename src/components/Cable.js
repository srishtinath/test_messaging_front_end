import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ chatrooms, handleReceivedMessage }) => {
  return (
    <Fragment>
      {chatrooms.map(conversation => {
        return (
          <ActionCable
            key={conversation.id}  
            channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;