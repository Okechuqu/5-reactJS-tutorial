import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { FaGear } from "react-icons/fa6";

const App = () => {
  // State to control the modal visibility
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchAPIData = async () => {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        return;
      }
      localStorage.clear();

      try {
        const response = await fetch(url);
        const apiData = await response.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAPIData(); // Fetch the Astronomy Picture of the Day data when the component mounts
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <FaGear />
        </div>
      )}
      {showModal && <SideBar data={data} toggleModal={toggleModal} />}
      {data && <Footer data={data} toggleModal={toggleModal} />}
    </>
  );
};

export default App;
