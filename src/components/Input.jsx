import React, { useState, useRef } from "react";
import activeMicIcon from "../images/mic-icon.svg";
import defaultMicIcon from "../images/default_mic.svg";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { getTextFromAudio } from "../api/chatService";

const Input = ({ onSend }) => {
  const [text, setText] = useState("");
  const [recordedAudio, setRecordedAudio] = useState("");
  const [showStopRecordingIcon, setShowStopRecordingIcon] = useState(false);
  const [showStartRecordingIcon, setShowStartRecordingIcon] = useState(true);
  const recorderRef = useRef();

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
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      recorderRef.current = new RecordRTC(mediaStream, {
        type: "audio",
        recorderType: StereoAudioRecorder,
        bufferSize: 256,
        desiredSampRate: 10000,
        bitsPerSecond: 128000,
        numberOfAudioChannels: 1,
        disableLogs: true,
      });
      recorderRef.current.startRecording();
    } catch (error) {
      console.log((error, "Error"));
    }
  };

  const onStartRecordAudio = () => {
    setShowStopRecordingIcon(true);
    setShowStartRecordingIcon(false);
    recordAudio();
  };

  const onStopRecording = () => {
    setShowStopRecordingIcon(false);
    setShowStartRecordingIcon(true);
    recorderRef.current.stopRecording(() => {
      const audioURL = URL.createObjectURL(recorderRef.current.getBlob());
      setRecordedAudio(audioURL);
      getAudioText(recorderRef.current.getBlob());
    });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const getAudioText = async (blob) => {
    const base64 = await blobToBase64(blob);
    const splittedValue = base64.split(",")[1];
    try {
      const data = await getTextFromAudio(splittedValue);
      if (data && data.output && data.output.length) {
        setText(data.output[0].source);
      }
    } catch (error) {
      console.log("Error", error);
    }
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
        {/* <iframe
          src={recordedAudio}
          allow="autoplay"
          title="audio"
        ></iframe> */}
      </form>

      {showStartRecordingIcon && (
        <button className="speak cursor-pointer" onClick={onStartRecordAudio}>
          <img src={defaultMicIcon} alt="Mic Icon" height="30" />
        </button>
      )}
      {showStopRecordingIcon && (
        <div className="recorder-container ml-auto align-middle">
          <div className="outer"></div>
          <div className="outer-2"></div>
          <button className="speak cursor-pointer" onClick={onStopRecording}>
            <img src={activeMicIcon} alt="Mic Icon" height="30" />
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
