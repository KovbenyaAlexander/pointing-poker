import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';

const Chat = () => {
  const [message, setMessage] = useState('');
  const { socket, gameID, userName } = useSelector((s: IStore) => ({
    socket: s.socket,
    gameID: s.game.id,
    userName: s.user.name,
  }));

  useEffect(() => {
    socket.on('message', (data: any) => {
      console.log(data);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit('sendMessage', { gameID, userName, message });
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => sendMessage()}
      />
      <button type="button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
