import React, { useState, useEffect, useRef } from 'react';
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
  const [messages, setMessages] = useState<Array<MessageType>>([
    { message: 'msg1', name: 'nameee', messageId: 'ewrfs1' },
    {
      message: ' Room id:e5e711ce-fd82-4846-9fd2-a1d79963aeccCopy id of game to clipboard',
      name: 'nameee',
      messageId: 'ewrfs2',
    },
    { message: 'ffs  sdfsd sdf fhfgdh dfgh f', name: 'nameee', messageId: 'ewrfs3' },

  ]);
  const { socket, id, name } = useSelector((s: IStore) => ({
    socket: s.socket,
    id: s.game.id,
    name: s.user.name,
  }));

  // const messagesEndRef = useRef<null | HTMLDivElement>(null)

  // const scrollToBottom = () => {
  //   messagesEndRef.current!.scrollIntoView({ behavior: "smooth" })
  // }

  useEffect(() => {
    const socketUpdate = async () => {
      await socket.on('message', (data: MessageType) => {
        setMessages((prev: Array<MessageType>) => [...prev, data]);
      });
    };
    socketUpdate();
    // scrollToBottom()
  }, [socket]);

  const sendMessage = () => {
    socket.emit('sendMessage', { id, name, message });
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={100}
      />
      <button type="button" onClick={sendMessage}>Send</button>
      <hr />
      <div className="chat">
        {messages.map((msg: MessageType) => {
          let classes;
          if (name === msg.name) {
            classes = 'chat__msg-left';
          } else {
            classes = 'chat__msg-right';
          }

          return (
            <div key={msg.messageId} className={`${classes} message`}>

              <div className="message__container">
                <span className="message__author">
                  {msg.name}
                </span>

                <p className="message__text">
                  {msg.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div ref={messagesEndRef} /> */}

    </div>
  );
};

export default Chat;
