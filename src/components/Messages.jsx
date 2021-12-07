import React, { useEffect, useRef } from "react";
import botIcon from "../images/bot-icon.svg";
import userIcon from "../images/user-icon.svg";

export default function Messages({ messages }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className="chatArea">
      <span className="bot-icon">
        <img src={botIcon} alt="Chat Bot Icon" />
      </span>
      <div className="chatMessages">
        {messages}
        <div id={"el"} ref={el} />
      </div>
      <span className="user-icon">
        <img src={userIcon} alt="User Icon" />
      </span>
    </div>
  );
}
