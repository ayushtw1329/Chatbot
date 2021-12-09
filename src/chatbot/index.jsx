import React, { useState, useEffect } from "react";

import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import Messages from "../components/Messages";
import Input from "../components/Input";

import Header from "../components/Header";
import { getBotResponse } from "../api/chatService";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await getBotResponse("hi")}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const onSendMessage = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await getBotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <>
      <Header />
      <main className="wrapper">
        <Messages messages={messages} />
        <div className="sep"></div>
        <div className="chatFooter">
          <Input onSend={onSendMessage} />
        </div>
      </main>
    </>
  );
};

export default Chatbot;
