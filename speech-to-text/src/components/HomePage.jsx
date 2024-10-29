import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa6";

const HomePage = (props) => {
  const { setAudioStream, setFile } = props;
  const [recordStatus, setRecordStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";

  const startRecording = async () => {
    let tempStream;

    console.log("start recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (e) {
      console.log(e.message);
      return;
    }

    setRecordStatus("recording");

    //create new media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setRecordStatus("inactive");
    console.log("stop Recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  };

  useEffect(() => {
    if (recordStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((current => current + 1));
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <main
      className="flex-1 bg-violet-400 p-4 
        flex flex-col justify-center pb-10 
        text-center gap-3 sm:gap-4 md:gap-5"
    >
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Achiever<span className="text-red-800 bold">Umunwa</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-red-800"> &rarr;</span> Transcribe{" "}
        <span className="text-red-800"> &rarr;</span> Translate
      </h3>
      <button
        onClick={recordStatus === "recording" ? stopRecording : startRecording}
        className="flex specialBtn px-4 py-2 rouded-lg 
        text-red-600 flex items-center text-base justify-between gap-4 
        mx-auto w-72 max-w-full my-4"
      >
        <p className="text-red-400">
          {recordStatus === "inactive" ? "Record" : `Stop Recording`}
        </p>
        <div className="flex items-center gap2">
          {duration !== 0 && (<p className="text-sm">{duration}s</p>)}
          <FaMicrophone
            className="duration-200"
            // {...(recordStatus === "recording" ? "text-rose-300" : "")}
          />
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-gray-500 cursor-pointer hover:text-gray-800 duration-200">
          Upload
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            type="file"
            className="hidden"
            accept=".mp3,.wav"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-500">Free now, Free Forever</p>
    </main>
  );
};

export default HomePage;
