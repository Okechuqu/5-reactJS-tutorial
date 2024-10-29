import React, { useEffect, useRef, useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";
import { FaCopy, FaDownload } from "react-icons/fa6";

const Information = (props) => {
  const { output, finished } = props;
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          console.log("LOADING");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("DONE");
          break;
      }
    };
    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text)
      : translation || "No translation";

  const handleCopy = () => {
    navigator.clipboard.writeText(textElement);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `AchieverVoice_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const generateTranslation = () => {
    if (translating || toLanguage === "Select Language") {
      return;
    }

    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  };

  return (
    <main
      className="flex-1 p-4 
        flex flex-col justify-center pb-20 
        text-center gap-3 sm:gap-4 max-w-prose w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your<span className="text-red-400 bold"> Transcription</span>
      </h1>

      <div className="grid grid-cols-2  mx-auto bg-white shadow shadow rounded-full overflow-hidden items-center ">
        <button
          onClick={() => setTab("transcription")}
          className={
            "duration-200 px-4 py-1 " +
            (tab === "transcription"
              ? "bg-red-300 text-white"
              : "text-red-400 hover:text-red-600")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "duration-200 px-4 py-1 " +
            (tab === "translation"
              ? "bg-red-300 text-white"
              : "text-red-400 hover:text-red-600")
          }
        >
          Translation
        </button>
      </div>

      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            toLanguage={toLanguage}
            textElement={textElement}
            translating={translating}
            setToLanguage={setToLanguage}
            setTranslating={setTranslating}
            setTranslation={setTranslation}
            generateTranslation={generateTranslation}
          />
        )}
        <div className="flex items-center gap-4 mx-auto">
          <button
            onClick={handleCopy}
            title="Copy"
            className="bg-white hover:text-red-500 duration-200 text-red-300 px-2 aspect-square grid place-items-center rounded"
          >
            <FaCopy />
          </button>
          <button
            onClick={handleDownload}
            title="Download"
            className="bg-white hover:text-red-500 duration-200 text-red-300 px-2 aspect-square grid place-items-center rounded"
          >
            <FaDownload />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Information;
