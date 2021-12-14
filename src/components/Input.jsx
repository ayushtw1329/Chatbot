import React, { useState, useRef } from "react";
import activeMicIcon from "../images/mic-icon.svg";
import defaultMicIcon from "../images/default_mic.svg";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { StreamingClient, SocketStatus } from '@project-sunbird/open-speech-streaming-client';
import { getTextFromAudio } from "../api/chatService";

const Input = ({ onSend }) => {
  const [text, setText] = useState("");
  const [showStopRecordingIcon, setShowStopRecordingIcon] = useState(false);
  const [showStartRecordingIcon, setShowStartRecordingIcon] = useState(true);
  const recorderRef = useRef();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (text && text.length) {
      onSend(text);
      setText("");
    }
  };

  const recordAudio = async () => {
    try {
      recorderRef.current = new StreamingClient();
      recorderRef.current.connect('https://meity-dev-asr.ulcacontrib.org', 'en', function (action, id) {
        if (action === SocketStatus.CONNECTED) {

          recorderRef.current.startStreaming(function (transcript) {
            // transcript will give you the text which can be used further
            console.log('transcript:', transcript);
            setText(transcript);
          }, (e) => {
            console.log("I got error", e);
          })
        } else if (action === SocketStatus.TERMINATED) {
          // recorderRef.current.punctuateText('Text to punctuate', '<inferencing-server-url>', (status, text) => {
          //   console.log("Punctuted Text:", text);
          // }, (status, error) => {
          //   console.log("Failed to punctuate", status, error);
          // });
        } else {
          //unexpected failures action on connect.
          console.log("Action", action, id);
        }
      })
      // const mediaStream = await navigator.mediaDevices.getUserMedia({
      //   video: false,
      //   audio: true,
      // });
      // recorderRef.current = new RecordRTC(mediaStream, {
      //   type: "audio",
      //   recorderType: StereoAudioRecorder,
      //   bufferSize: 256,
      //   desiredSampRate: 10000,
      //   bitsPerSecond: 128000,
      //   numberOfAudioChannels: 1,
      //   disableLogs: true,
      // });
      // recorderRef.current.startRecording();
    } catch (error) {
      console.log((error, "Error"));
    }
  };

  const onStartRecording = () => {
    setShowStopRecordingIcon(true);
    setShowStartRecordingIcon(false);
    recordAudio();
  };

  const onStopRecording = () => {
    setShowStopRecordingIcon(false);
    setShowStartRecordingIcon(true);
    // recorderRef.current.stopRecording(() => {
    //   getAudioText(recorderRef.current.getBlob());
    // });
    recorderRef.current.stopStreaming((blob) => {

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
      </form>
      {showStartRecordingIcon && (
        <button className="speak cursor-pointer" onClick={onStartRecording}>
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
