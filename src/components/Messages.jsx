import React, { useEffect, useRef, useState } from "react";
import botIcon from "../images/bot-icon.svg";
import userIcon from "../images/user-icon.svg";
import { getTextToSpeech, getBotResponse } from "../api/chatService";
import playIcon from "../images/play.svg";
import pauseIcon from "../images/pause.svg";

export default function Messages({ messages, latestMessage }) {
  const el = useRef(null);
  const audioEl = useRef();
  const [recordedAudio, setRecordedAudio] = useState("");
  const [playAudio, setPlayAudio] = useState(false);
  const [pauseAudio, setPauseAudio] = useState(false);

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
          setPlayAudio(true);
          setPauseAudio(false);
        }
      };
      // onPlayTextAudio();
    }
  }, [audio, latestMessage]);

  useEffect(() => {
    audio?.addEventListener("ended", onEnded);
    return () => {
      audio?.removeEventListener("ended", onEnded);
    };
  });

  const onEnded = () => {
    setPlayAudio(false);
    setPauseAudio(false);
  };

  const onPauseAudio = async () => {
    try {
      if (audio) {
        audio.pause();
        setPauseAudio(true);
        setPlayAudio(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onReplayAudio = async () => {
    try {
      if (audio) {
        audio.play();
        setPauseAudio(false);
        setPlayAudio(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatArea">
      <span className="bot-icon">
        <img src={botIcon} alt="Chat Bot Icon" />
        <div className="d-flex text-center">
          {pauseAudio && (
            <button onClick={onReplayAudio} className="play-icon">
              <img src={playIcon} alt="Mic Icon" height="20" />
            </button>
          )}
          {playAudio && (
            <button onClick={onPauseAudio} className="play-icon">
              <img src={pauseIcon} alt="Mic Icon" height="20" />
            </button>
          )}
        </div>
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
