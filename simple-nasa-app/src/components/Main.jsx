import React from "react";

const Main = (props) => {
  const { data } = props;
  return (
    <div className="imgContainer">
      <img
        src={data?.hdurl}
        alt={data?.title || "Astronomy Picture of the Day"}
        className="w-full bgImage"
      />
    </div>
  );
};

export default Main;
