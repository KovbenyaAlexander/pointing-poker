import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const { socket, id, name } = useSelector((s: IStore) => ({
    socket: s.socket,
    id: s.game.id,
    name: s.user.name,
  }));

  useEffect(() => {
    socket.on('message', (data: any) => {
      console.log(data);
      setMessages((prev: any) => [...prev, data]);
    });
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
      {messages.map((msg: any) => (
        <div key={Math.random()}>
          <span>
            Author:
            {msg.name}
          </span>
          <span>
            Message:
            {msg.message}
          </span>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Chat;
