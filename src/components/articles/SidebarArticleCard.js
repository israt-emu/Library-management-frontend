import React from "react";
import { Link } from "react-router-dom";
import articleImg from "../../assets/images/article.jpg";

const SidebarArticleCard = ({article}) => {
  const {title, category, image, _id, views} = article || {};
  return (
    <div>
      <Link to={`/dashboard/articles/${_id}`}>
      <div className="flex px-1 py-4">
        <img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 bg-gray-500" src={image ? image : articleImg} />
        <div className="flex flex-col flex-grow ">
          <p className="font-serif capitalize">{title}</p>

          <p className="text-xs text-placeholder capitalize">{category}</p>

          <p className=" text-second text-xs font-medium">{views} views</p>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default SidebarArticleCard;
