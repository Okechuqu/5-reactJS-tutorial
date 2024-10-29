import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <div
      className="min-h-sreen flex 
          flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto pt-40"
    >
      <div className="flex flex-col gap-4">
        <p>IT'S TIME TO GET</p>
        <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Achiever<span className="text-blue-400">Umunwa</span>
        </h1>
      </div>
      <p className="text-sm md:text-base font-light">
        Lorem, ipsum dolor sit amet consectetur{" "}
        <span className="text-blue-400 font-medium">adipisicing elit.</span>{" "}
        Accusantium, dolore amet. Aliquam consectetur quo aliquid iusto{" "}
        <span className="text-blue-400 font-medium">recusandae</span> ipsa
        magni? Pariatur sint nihil vero rem qui.
      </p>
      <Button func={() => {
        window.location.href = '#generate'
      }} text={"Accept & Begin"} />
    </div>
  );
};

export default Hero;
