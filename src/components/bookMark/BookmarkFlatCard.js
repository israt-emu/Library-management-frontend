// import React from "react";
// import Moment from "react-moment";
// import {MdOutlineDelete} from "react-icons/md";
// import {useDeleteBookmarkMutation} from "../../features/bookmark/bookmarkAPI";
// import {useDispatch} from "react-redux";
// import {editedData} from "../../features/bookmark/bookmarkSlice";
// import {MdOutlineArchive} from "react-icons/md";
// // import favIcon from "../../assets/images/icons8-ok-240.png";
// import {MdEdit} from "react-icons/md";
// import {MdUnarchive} from "react-icons/md";
// import {MdRestoreFromTrash} from "react-icons/md";
// import {MdDeleteForever} from "react-icons/md";
// import {useUpdateBookmarkByStateMutation} from "../../features/bookmark/bookmarkAPI";

// const BookmarkFlatCard = ({bookmark, setShowModal, showModal, currentState}) => {
//   const dispatch = useDispatch();
//   const {title, url, createdAt, _id: id, favicon} = bookmark || {};
//   //updating state of bookmark
//   const [updateBookmarkByState] = useUpdateBookmarkByStateMutation();
//   const handleStateChange = (state) => {
//     updateBookmarkByState({
//       id,
//       data: {
//         state,
//       },
//       state: currentState,
//     });
//   };
//   const [deleteBookmark, {data, isLoading, isError, error}] = useDeleteBookmarkMutation();
//   const handleDelete = (id) => {
//     deleteBookmark(id);
//   };
//   const handleEditBookmark = (data) => {
//     console.log(data);
//     dispatch(editedData(data));
//     setShowModal(true);
//   };
//   return (
//     <div>
//       <div className=" rounded overflow-hidden  border border-border hover:shadow-lg my-2 hover:border-gray-400 transition-all">
//         <a href={url} target="_blank" rel="noreferrer">
//           <div>
//             <div className="px-6 pt-2">
//               <img className="w-8" src={favicon ? `data:image/ico;base64,${favicon}` : favIcon} alt="favicon" />
//             </div>
//             <div className="px-6 pt-2">
//               <h2 className="font-bold text-xl mb-2">{title}</h2>
//             </div>
//             <div className="px-6 ">
//               {" "}
//               <p className="hover:underline">{url}</p>
//             </div>
//           </div>
//         </a>
//         <div className="flex items-center justify-between px-4 pt-4 pb-2">
//           <div>
//             {currentState === "normal" ? (
//               <button disabled={isLoading} onClick={() => handleEditBookmark(bookmark)} className="hover:bg-link_hover transition-all p-1 rounded-full " title="Edit">
//                 <MdEdit className="w-6 h-6" />
//               </button>
//             ) : null}
//             {currentState === "normal" ? (
//               <button disabled={isLoading} onClick={() => handleStateChange("archive")} className="hover:bg-link_hover transition-all p-1     rounded-full mr-1" title="Archive">
//                 <MdOutlineArchive className="w-6 h-6" />
//               </button>
//             ) : null}
//             {currentState === "archive" ? (
//               <button disabled={isLoading} onClick={() => handleStateChange("normal")} className="hover:bg-link_hover transition-all p-1 rounded-full mr-1" title="UnArchive">
//                 <MdUnarchive className="w-6 h-6" />
//               </button>
//             ) : null}
//             {currentState === "trash" ? (
//               <button disabled={isLoading} onClick={() => handleStateChange("normal")} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Restore">
//                 <MdRestoreFromTrash className="w-6 h-6" />
//               </button>
//             ) : null}

//             {currentState === "normal" || currentState === "archive" ? (
//               <button disabled={isLoading} onClick={() => handleStateChange("trash")} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Trash">
//                 <MdOutlineDelete className="w-6 h-6" />
//               </button>
//             ) : null}
//             {currentState === "trash" ? (
//               <button disabled={isLoading} onClick={() => handleDelete(id)} className="hover:bg-link_hover transition-all p-1 rounded-full" title="Delete Parmanently!">
//                 <MdDeleteForever className="w-6 h-6" />
//               </button>
//             ) : null}
//           </div>
//           <div>
//             {" "}
//             <span className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2">
//               {" "}
//               <Moment format="D MMM YYYY" withTitle>
//                 {createdAt}
//               </Moment>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookmarkFlatCard;
