import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([{ name: 'name', message: 'message' }]);
  const { socket, id, name } = useSelector((s: IStore) => ({
    socket: s.socket,
    id: s.game.id,
    name: s.user.name,
  }));


  useEffect(() => {
    socket.on('message', (data: any) => {
      setMessages((prev: any)=>{
        return [...prev, data]
      });
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
      <span>Room id: {id}</span>
      <hr />
      {messages.map((msg: any) =>
        // TODO: remove random
        (
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
