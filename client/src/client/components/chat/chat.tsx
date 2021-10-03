import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IChatMessage, IStore } from '../../types';
import './style.scss';

export default function Chat(): JSX.Element {
  const socket = useSelector((state: IStore) => state.socket);
  const messages = useSelector((state: IStore) => state.chat.messages);
  const authorMessage = useSelector((state: IStore) => state.user.name);

  const [message, setMessage] = useState('');

  const sendMessage = () => {
    setMessage('');
    if (message !== '') {
      socket?.sendMessage(message, authorMessage);
    }
  };

  return (
    <div className="chat">
      <div className="chat__messages">

        {messages.map((msg: IChatMessage) => {
          let classes;
          if (authorMessage === msg.authorMessage) {
            classes = 'chat__messages-left';
          } else {
            classes = 'chat__messages-right';
          }
          return (
            <div key={msg.messageId} className={`${classes} message`}>

              <div className="message__container">
                <span className="message__author">
                  {msg.authorMessage}
                </span>
                <p className="message__text">
                  {msg.message}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      <div className="chat__controoler">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={100}
        />
        <button type="button" onClick={sendMessage}>Send</button>
      </div>

    </div>

  );
}
