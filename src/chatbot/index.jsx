import React, { useState, useEffect } from "react";
import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import Messages from "../components/Messages";
import Input from "../components/Input";

import Header from "../components/Header";
import { getBotResponse } from "../api/chatService";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState();
  const [cartCount, setCartCount] = useState(0);

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
    setLatestMessage(text);
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await getBotResponse(text)}
        onAddtoCart={() => setCartCount((cartCount) => cartCount + 1)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <>
      <Header count={cartCount} />
      <main className="wrapper">
        <Messages messages={messages} latestMessage={latestMessage} />
        <div className="sep"></div>
        <div className="chatFooter">
          <Input onSend={onSendMessage} />
        </div>
      </main>
    </>
  );
};

export default Chatbot;
