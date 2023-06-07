import React, {useState} from "react";
import {MdDelete, MdEdit} from "react-icons/md";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useDeleteNoticeMutation} from "../../features/notice/noticeApi";

const NoticeItem = ({data}) => {
  const {user} = useSelector((state) => state?.auth);
  const {admin} = user || {};
  const [deleteNotice, {isError, isLoading, isSuccess}] = useDeleteNoticeMutation();
  const [collapse, setCollapse] = useState(false);
  const {title, description, createdAt, _id} = data || {};
  const dateCreated = new Date(createdAt).toDateString();
  const todayDate = new Date().toDateString();

  return (
    <div>
      <div className="p-2 bg-main items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex " role="alert">
        {admin && (
          <div className="flex items-center">
            <Link to={`/dashboard/editNotice/${_id}`}>
              <MdEdit className="w-4 h-4" />
            </Link>
            <button onClick={() => deleteNotice(_id)} className="hover:bg-red-400 mx rounded p-1 mr-3 transition-all duration-150 " disabled={isLoading}>
              <MdDelete className="w-5 h-5" />
            </button>
          </div>
        )}
        {dateCreated === todayDate && (
          <span onClick={() => setCollapse(!collapse)} className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            New
          </span>
        )}
        <span onClick={() => setCollapse(!collapse)} className="font-semibold mr-2 text-left flex-auto">
          {title}
        </span>
        <svg onClick={() => setCollapse(!collapse)} className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </div>

      {/* notice body  */}
      <div className={`p-4 w-3/4 transition-all duration-200 ${!collapse ? "hidden h-0" : "h-auto block"}`}>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default NoticeItem;
