import React from "react";
import { LANGUAGES } from "../utils/presets";
import { FaSpinner } from "react-icons/fa6";

const Translation = (props) => {
  const {
    textElement,
    finished,
    toLanguage,
    translating,
    setToLanguage,
    generateTranslation,
  } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      
      {textElement && !translating && <p>{textElement}</p>}

      {!translating && (
        <div className="flex flex-col gap-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">
            To Language
          </p>
          <div className="flex items-stretch g-2">
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-red-300 duration-200 p-2 rounded"
            >
              <option value={"Select language"}>Select Language</option>
              {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <option key={key} value={value}>
                    {key}
                  </option>
                );
              })}
            </select>
            <button
              onClick={generateTranslation}
              className="specialBtn px-3 py-2 rounded-lg text-red-400 hover:text-red-600 duration-200"
            >
              Translate
            </button>
          </div>
        </div>
      )}

      {!finished || translating &&
        (
          <div className="grid place-items-center">
            <FaSpinner className="animate-spin" />
          </div>
        )}
    </div>
  );
};

export default Translation;
