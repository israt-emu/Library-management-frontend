import React, {useState} from "react";
import {MdDelete} from "react-icons/md";
import Moment from "react-moment";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import articleImg from "../../assets/images/article.jpg";
import DeleteArticleModal from "../modals/DeleteArticleModal";

const SinleArticles = ({data}) => {
  console.log(data);
  const {admin} = useSelector((state) => state?.auth?.user);
  const {title, category, description, image, createdAt, _id, views} = data || {};
  const [deleteArti, setDeleteArti] = useState(false);

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
        {admin && (
          <div className="flex justify-end">
            <MdDelete className="w-6 h-6 text-red-400" title="Delete Article!" onClick={() => setDeleteArti(true)} />
          </div>
        )}
      </div>
      {deleteArti && <DeleteArticleModal deleteArti={deleteArti} setDeleteArti={setDeleteArti} id={_id} />}
    </div>
  );
};

export default SinleArticles;
