import React from "react";
import { FaPenNib } from "react-icons/fa6";

const FileDisplay = (props) => {
  const { audioReset, file, audioStream, handleFormSubmission } = props;
  return (
    <main
      className="flex-1 p-4 
        flex flex-col justify-center pb-20 
        text-center gap-3 sm:gap-4  w-72 sm-w-96 max-w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your<span className="text-red-800 bold"> File</span>
      </h1>
      <div className="flex flex-col text-left  my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file?.name : "Custom audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={audioReset}
          className="text-slate-500 hover:text-red-400 duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn px-4 p-2 rounded-lg text-red-400 flex items-center gap-2 font-medium"
        >
          <p>Transcribe</p>
          <FaPenNib />
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
