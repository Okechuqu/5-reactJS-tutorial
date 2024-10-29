import React from "react";
import { FaPlus } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="flex item-center justify-between gap-4 p-4 px-12">
      <a href="/">
        <h1 className="font-medium">
          Achiever<span className="text-red-800 bold">Umunwa</span>{" "}
        </h1>
      </a>
      <a
        href="/"
        className="flex items-center gap-2 specialBtn px-3 py-2 text-sm rouded-lg text-red-600"
      >
        <p>New</p>
        <FaPlus />
      </a>
    </header>
  );
};

export default Header;
