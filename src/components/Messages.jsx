import React, { useEffect, useRef, useState } from "react";
import botIcon from "../images/bot-icon.svg";
import userIcon from "../images/user-icon.svg";
import { getTextToSpeech, getBotResponse } from "../api/chatService";

export default function Messages({ messages, latestMessage }) {
  const el = useRef(null);
  const audioEl = useRef();
  const [recordedAudio, setRecordedAudio] = useState("");
  const audio = audioEl.current;
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });

  useEffect(() => {
    if (latestMessage) {
      const onPlayTextAudio = async () => {
        const botResponse = await getBotResponse(latestMessage);
        if (botResponse && botResponse.label === "TEXT") {
          const res = await getTextToSpeech(botResponse.value);
          var array = new Uint8Array(res);
          const blob = new Blob([array]);
          const audioURL = URL.createObjectURL(blob);
          setRecordedAudio(audioURL);
          audio?.play();
        }
      };
      onPlayTextAudio();
    }
  }, [audio, latestMessage]);

  const onStopAudio = async () => {
    try {
      if (audio) audio.pause();
    } catch (error) {
      console.log(error);
    }
  };

  const onReplayAudio = async () => {
    try {
      if (audio) audio.play();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatArea">
      <span className="bot-icon">
        <img src={botIcon} alt="Chat Bot Icon" />
        <button onClick={onStopAudio}>stop</button>
        <button onClick={onReplayAudio}>play</button>
      </span>
      <audio
        ref={audioEl}
        controls
        className="d-none shadow-grey rounded-24"
        tabIndex={-1}
        src={recordedAudio}
      ></audio>
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
