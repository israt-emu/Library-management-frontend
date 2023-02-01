import React from "react";

const QuickAnalytics = () => {
  return (
    <div className="my-8">
      <div className="grid grid-cols-4 gap-x-3">
        <div className="flex  p-3 items-center justify-center bg-white">
          <div className="bg-main w-10 h-10 rounded-full  text-white flex justify-center items-center">
            x
          </div>
          <div>
            <h4>Borrowed</h4>
            <h2>123</h2>
          </div>
        </div>
        <div className="flex  p-3 items-center justify-center  bg-white">
          <div className="bg-main w-10 h-10 rounded-full text-white flex justify-center items-center">
            x
          </div>
          <div>
            <h4>Over Due</h4>
            <h2>123</h2>
          </div>
        </div>
        <div className="flex  p-3 items-center justify-center  bg-white">
          <div className="bg-main w-10 h-10 rounded-full text-white flex justify-center items-center">
            x
          </div>
          <div>
            <h4>Students</h4>
            <h2>123</h2>
          </div>
        </div>
        <div className="flex  p-3 items-center justify-center  bg-white">
          <div className="bg-main w-10 h-10 rounded-full text-white flex justify-center items-center">
            x
          </div>
          <div>
            <h4>visitors</h4>
            <h2>123</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAnalytics;
