import React from "react";
import image from "../../assets/images/login@4x.png";

const RightSideContent = () => {
  return (
    <div className=" h-screen overflow-y-scroll no-scrollbar flex justify-center items-center flex-col mt-5 md:mt-0 ">
      <img className="object-cover" src={image} alt="" />
    </div>
  );
};

export default RightSideContent;
