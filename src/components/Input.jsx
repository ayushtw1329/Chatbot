import React, { useState } from "react";
import micIcon from "../images/mic-icon.svg";

const Input = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (text && text.length) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form className="input-form" onSubmit={handleSend}>
      <textarea
        className="user-input"
        type="text"
        onChange={handleInputChange}
        value={text}
        placeholder="Type Message"
      />
      <button className="speak">
        <img src={micIcon} alt="Mic Icon" />
      </button>
    </form>
  );
};

export default Input;
