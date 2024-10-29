import React from "react";
import { FaArrowRight } from "react-icons/fa";

const SideBar = (props) => {
  const { toggleModal, data } = props;
  return (
    <div className="sidebar">
      <div onClick={toggleModal} className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2 className="font-bold ">{data?.title}</h2>
        <div className="explainContainer">
          <p className="apodDate">{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={toggleModal}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
