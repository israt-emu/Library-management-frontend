// import React, {useEffect} from "react";
// import Moment from "react-moment";
// import {useDispatch} from "react-redux";
// import {useDeleteStoreMutation} from "../../features/store/storeApi";
// import {setStoreInRedux} from "../../features/store/storeSlice";
// import {MdOutlineDelete} from "react-icons/md";
// // import favIcon from "../../assets/images/icons8-ok-240.png";

// const StoreFlatCard = ({store, setError, setStoreModal}) => {
//   const {url, title, createdAt, _id: id, favicon} = store || {};
//   const [deleteStore, {data: deleteData, isLoading, isSuccess, error: deleteError}] = useDeleteStoreMutation();
//   const handleDeleteStore = () => {
//     deleteStore({id: id});
//   };
//   //setting error when error occured
//   useEffect(() => {
//     if (isSuccess && deleteData?.status === "success") {
//       setError("");
//     } else if (deleteError && !isSuccess) {
//       setError("Sorry! There was an error occured on deleting the store..");
//     }
//   }, [isSuccess, deleteData, deleteError, setError]);
//   //
//   const dispatch = useDispatch();
//   const openStoreModal = () => {
//     dispatch(setStoreInRedux(store));
//     setStoreModal(true);
//   };
//   return (
//     <div>
//       <div className=" rounded overflow-hidden  border border-border hover:shadow-lg my-2 hover:border-gray-400 transition-all">
//         <a href={url} target="_blank" rel="noreferrer">
//           <div>
//             <div className="px-6 pt-2" onClick={openStoreModal}>
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
//             <button className="hover:bg-link_hover transition-all p-1 rounded-full" title="Delete permanently!" onClick={handleDeleteStore} disabled={isLoading}>
//               <MdOutlineDelete className="w-6 h-6" />
//             </button>
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

// export default StoreFlatCard;
