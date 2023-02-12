import React from "react";
import { Link } from "react-router-dom";

const SinleArticles = ({ data }) => {
  console.log(data);
  const { title, category, description, image, createdAt ,_id} = data || {};

  return (
    <div className="max-w-lg p-4 shadow-md bg-gray-50 text-gray-800">
      <div className="flex justify-between pb-4 border-bottom">
        <div className="flex items-center">
          <a
            rel="noopener noreferrer"
            href="#"
            className="mb-0 capitalize text-gray-800"
          >
            {category}
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <Link to={`/dashboard/articles/${_id}`}>
          <div className="space-y-2">
            <img
              src={image}
              alt=""
              className="block object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="flex items-center text-xs">
              <span>{createdAt}</span>
            </div>
          </div>
          <div className="space-y-2">
            <a rel="noopener noreferrer" href="#" className="block">
              <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
            </a>
            <p className="leading-snug text-gray-600">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SinleArticles;
