import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import './style.scss';

type MessageType = {
  name: string,
  message: string
  messageId: string
};

const Chat = (): JSX.Element => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const { socket, id, name } = useSelector((s: IStore) => ({
    socket: s.socket,
    id: s.game.id,
    name: s.user.name,
  }));

  useEffect(() => {
    const socketUpdate = async () => {
      await socket.on('message', (data: MessageType) => {
        setMessages((prev: Array<MessageType>) => [...prev, data]);
      });
    };
    socketUpdate();
  }, [socket]);

  const sendMessage = () => {
    socket.emit('sendMessage', { id, name, message });
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" onClick={sendMessage}>Send</button>
      <hr />
      <div className="messages">
        {messages.map((msg: MessageType) => {
          let classes;
          if (name === msg.name) {
            classes = 'messages__msg-left';
          } else {
            classes = 'messages__msg-right';
          }

          return (
            <div key={msg.messageId} className={classes}>
              <span>
                Author:
                {msg.name}
              </span>
              <span>
                Message:
                {msg.message}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Chat;
