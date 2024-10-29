import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const Footer = (props) => {
  const { showModal, toggleModal, data } = props;
  return (
    <footer>
        <div className="bgGradient"></div>
      <div>
        <h1>APOD PROJECT</h1>
        <h2>{data?.title}</h2>
      </div>
      <button onClick={toggleModal}>
        <FaInfoCircle />
      </button>
    </footer>
  );
};

export default Footer;
