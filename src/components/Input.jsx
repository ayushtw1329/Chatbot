import React, { useState, useRef } from "react";
import micIcon from "../images/mic-icon.svg";

const Input = ({ onSend }) => {
  const [text, setText] = useState("");
  const [recordedAudio, setRecordedAudio] = useState("");
  const [gumStream, setGumStream] = useState();
  const [showStopRecordingIcon, setShowStopRecordingIcon] = useState(false);
  const [showStartRecordingIcon, setShowStartRecordingIcon] = useState(true);
  const audioEl = useRef();
  const audio = audioEl.current;
  const mediaRecorder = useRef();
  let chunks = [];

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

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setGumStream(stream);
      /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
      mediaRecorder.current = new MediaRecorder(stream);

      //start the recording process
      mediaRecorder.current.start();

      //automatically click stop button after 20 seconds
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.push(e?.data);
      };

      mediaRecorder.current.onstop = () => {
        onRecordingStop();
      };
    } catch (e) {
      console.log("EError", e);
    }
  };

  const onStartRecordAudio = () => {
    setShowStopRecordingIcon(true);
    setShowStartRecordingIcon(false);
    recordAudio();
  };

  const onRecordingStop = async () => {
    const blob = new Blob(chunks, { type: "audio/wav" });
    chunks = [];
    const audioURL = URL.createObjectURL(blob);
    setRecordedAudio(audioURL);
    audio.onloadedmetadata = async () => {
      if (audio.duration === Infinity) {
        audio.currentTime = 1e101;
        audio.ontimeupdate = () => {
          audio.ontimeupdate = () => {};
          audio.currentTime = 0.1;
          audio.currentTime = 0;
        };
      }
    };
  };

  const onStopRecording = () => {
    setShowStopRecordingIcon(false);
    setShowStartRecordingIcon(true);
    mediaRecorder?.current?.stop();
    gumStream?.getAudioTracks()[0].stop();
  };

  return (
    <>
      <form className="input-form" onSubmit={handleSend}>
        <input
          className="user-input"
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder="Type Message"
        />
        {/* <audio
        ref={audioEl}
        data-testid="boloAudioElement"
        controls
        className="d-flex shadow-grey rounded-24"
        tabIndex={-1}
        src={recordedAudio}
      ></audio> */}
      </form>
      {showStartRecordingIcon && (
        <button className="speak cursor-pointer" onClick={onStartRecordAudio}>
          <img src={micIcon} alt="Mic Icon" />
        </button>
      )}
      {showStopRecordingIcon && (
        <button className="speak cursor-pointer" onClick={onStopRecording}>
          <img src={micIcon} alt="Mic Icon" />
        </button>
      )}
    </>
  );
};

export default Input;
