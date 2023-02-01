import React from "react";
import { Link } from "react-router-dom";

const SinleArticles = () => {
  return (
    <div className="max-w-lg p-4 shadow-md bg-gray-50 text-gray-800">
      <div className="flex justify-between pb-4 border-bottom">
        <div className="flex items-center">
          <a
            rel="noopener noreferrer"
            href="#"
            className="mb-0 capitalize text-gray-800"
          >
            Mathematics
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <Link to={"/dashboard/articles/234"}>
          <div className="space-y-2">
            <img
              src="https://www.shutterstock.com/image-vector/back-school-background-round-hole-600w-2033803736.jpg"
              alt=""
              className="block object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="flex items-center text-xs">
              <span>6 min ago</span>
            </div>
          </div>
          <div className="space-y-2">
            <a rel="noopener noreferrer" href="#" className="block">
              <h3 className="text-xl font-semibold text-blue-600">
                Exploring the mathematical universe – connections,
                contradictions, and kale
              </h3>
            </a>
            <p className="leading-snug text-gray-600">
              Mathematicians are like anatomists learning how a body works, or
              navigators charting new waters.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SinleArticles;
