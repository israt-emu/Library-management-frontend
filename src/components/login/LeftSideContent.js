import React from "react";
import image from "../../assets/images/loginImage.png";

const LeftSideContent = () => {
  return (
    <div className="bg-green-400 h-full overflow-y-scroll no-scrollbar md:col-span-7 flex justify-center items-center flex-col mt-5 md:mt-0 ">
      <img className="object-cover w-full" src={image} alt="" />
      <h1>Welcome</h1>
    </div>
  );
};

export default LeftSideContent;
