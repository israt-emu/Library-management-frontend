import React from "react";
import Moment from "react-moment";
import bookmarkImg from "../../assets/images/bookmark2.jpg";
import {MdOutlineDelete} from "react-icons/md";
import {MdOutlineArchive} from "react-icons/md";
import {MdRestoreFromTrash} from "react-icons/md";
import {MdDeleteForever} from "react-icons/md";
import {MdUnarchive} from "react-icons/md";
import {useUpdateBookmarkByStateMutation} from "../../features/bookmark/bookmarkAPI";
import {MdEdit} from "react-icons/md";
import {useDeleteBookmarkMutation} from "../../features/bookmark/bookmarkAPI";
import {useDispatch, useSelector} from "react-redux";
import {editedData} from "../../features/bookmark/bookmarkSlice";
import { Link } from "react-router-dom";

const BookCard = ({book}) => {
  const dispatch = useDispatch();
  const {name,bookId,category,description,createdAt } = book || {};
//   const {_id: userId} = useSelector((state) => state?.auth?.user);
  //updating bookmark state
  const [updateBookmarkByState, {isLoading}] = useUpdateBookmarkByStateMutation();

//   //delete
//   const [deleteBookmark, {isLoading: delLoading, isError, error}] = useDeleteBookmarkMutation();
//   const handleDelete = (id) => {
//     deleteBookmark({id, userId});
//   };
//   const handleEditBookmark = (data) => {
//     console.log(data);
//     dispatch(editedData(data));
//     setShowModal(true);
//   };
  return (
    <div>
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-border ">
      <Link to={`/dashboard/books/${bookId}`}>
        <div>
          <img className="w-full"  alt="book mark" />
          <div className="px-6 pt-2">
            <h2 className="font-bold text-xl mb-2">{name}</h2>
          </div>
          <div className="px-6 ">
            {" "}
            <p>{category}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        {/* <div>
          {currentState === "normal" ? (
            <button disabled={isLoading} onClick={() => handleEditBookmark(bookmark)} className="hover:bg-link_hover transition-all p-1 rounded-full " title="Edit">
              <MdEdit className="w-6 h-6" />
            </button>
          ) : null}
          {currentState === "normal" ? (
            <button disabled={isLoading} onClick={() => handleStateChange("archive")} className="hover:bg-link_hover transition-all p-1     rounded-full mr-1" title="Archive">
              <MdOutlineArchive className="w-6 h-6" />
            </button>
          ) : null}
          {currentState === "trash" ? (
            <button disabled={isLoading} onClick={() => handleStateChange("normal")} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Restore">
              <MdRestoreFromTrash className="w-6 h-6" />
            </button>
          ) : null}
          {currentState === "trash" ? (
            <button disabled={delLoading} onClick={() => handleDelete(id)} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Delete Parmanently!">
              <MdDeleteForever className="w-6 h-6" />
            </button>
          ) : null}
          {currentState === "archive" ? (
            <button disabled={isLoading} onClick={() => handleStateChange("normal")} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Unarchive">
              <MdUnarchive className="w-6 h-6" />
            </button>
          ) : null}
          {currentState === "normal" || currentState === "archive" ? (
            <button disabled={isLoading} onClick={() => handleStateChange("trash")} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Trash">
              <MdOutlineDelete className="w-6 h-6" />
            </button>
          ) : null}
        </div> */}
        <div>
          {" "}
          <span className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2 text-white">
            {" "}
            <Moment format="D MMM YYYY" withTitle>
              {createdAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};
export default BookCard;
