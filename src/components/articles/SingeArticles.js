import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import articleImg from "../../assets/images/article.jpg";

const SinleArticles = ({data}) => {
  console.log(data);
  const {title, category, description, image, createdAt, _id, views} = data || {};

  return (
    <div className="max-w-lg p-4 shadow-md bg-gray-50 text-gray-800">
      <div className="flex justify-between pb-4 border-bottom">
        <div className="flex items-center">
          <p className="mb-0 capitalize text-gray-800">{category}</p>
        </div>
      </div>
      <div className="space-y-4">
        <Link to={`/dashboard/articles/${_id}`}>
          <div className="space-y-2">
            <img src={image ? image : articleImg} alt="" className="block object-cover object-center w-full rounded-md h-72 bg-gray-500" />
            <div className="flex items-center text-xs">
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0 font-semibold">
                <Moment format="D MMM YYYY" withTitle>
                  {createdAt}
                </Moment>
                • {views} views
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="block">
              <h3 className="text-xl font-semibold text-blue-600 capitalize">{title}</h3>
            </p>
            <p className="leading-snug text-gray-600 capitalize">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SinleArticles;
