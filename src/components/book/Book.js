import React, { useEffect, useRef, useState } from "react";
import { ImImage } from "react-icons/im";
import { FaWindowRestore } from "react-icons/fa";
import { BiPaint } from "react-icons/bi";
import {
  useAddBookmarkMutation,
  useGetGroupsQuery,
} from "../../features/bookmark/bookmarkAPI";
import { useSelector } from "react-redux";
import Error from "../ui/Error";

import { useAddStoreMutation } from "../../features/store/storeApi";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../../features/book/bookAPI";
import CardSkeletonLoader from "../ui/CardSkeletonLoader";
import BookCard from "./BookCard";

const Book = () => {
  const { data: booksData, isError, error, isLoading } = useGetBooksQuery();
  // const [showModal, setShowModal] = useState(false);
  // const [focusTnput, setFocusTnput] = useState(false);
  // const [group, setGroup] = useState("");
  // const [title, setTitle] = useState("");
  // const [url, setUrl] = useState("");
  // const [error, setError] = useState("");
  // const [bookmarksByState, setBookmarksByState] = useState([]);
  // const {bookmarkView, bookmarkData} = useSelector((state) => state?.bookmark);
  // const {_id: id} = useSelector((state) => state?.auth?.user);
  // const navigate = useNavigate();
  // const {data: groupData} = useGetGroupsQuery({state: "normal", userId: id});
  // //filtering by state
  // useEffect(() => {
  //   if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarkData?.bookmarks?.length > 0) {
  //     const filter = bookmarkData?.bookmarks?.filter((b) => b?.state === "normal");
  //     setBookmarksByState(filter);
  //   }
  // }, [bookmarkData?.bookmarks, bookmarkData?.isLoading, bookmarkData?.isError]);

  // const [addBookmark, {data: newData, isSuccess, error: addError}] = useAddBookmarkMutation();
  // const [addStore, {data: storeData, isSuccess: addStoreSuccess, error: addStoreError}] = useAddStoreMutation();
  // //close triple input on clicking outside
  // const ref = useRef();
  // const inputRef = useRef(null);
  // //
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!ref?.current?.contains(event.target) && !inputRef?.current?.contains(event.target)) {
  //       setFocusTnput(false);
  //       setError("");
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  // }, [ref, inputRef]);

  // // add bookmark
  // const handleAddBookmark = () => {
  //   var urlValidation = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  //   if (urlValidation && title !== "") {
  //     const data = {
  //       title,
  //       group,
  //       url,
  //       userId: id,
  //     };

  //     addBookmark(data);
  //   } else {
  //     if (!urlValidation) {
  //       setError("Please enter a valid url!");
  //     } else if (title === "") {
  //       setError("Please enter a title!");
  //     }
  //   }
  // };
  // //add store
  // const handleAddStore = () => {
  //   var urlValidation = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  //   if (urlValidation && title !== "") {
  //     const data = {
  //       title,
  //       group,
  //       url,
  //       userId: id,
  //     };

  //     addStore(data);
  //   } else {
  //     if (!urlValidation) {
  //       setError("Please enter a valid url!");
  //     } else if (title === "") {
  //       setError("Please enter a title!");
  //     }
  //   }
  // };
  // // if bookmark and store added successfully, clear input field and close form
  // useEffect(() => {
  //   if ((isSuccess && newData?.status === "success") || (addStoreSuccess && storeData?.status === "success")) {
  //     setFocusTnput(false);
  //     setTitle("");
  //     setGroup("");
  //     setUrl("");
  //     setError("");
  //     if (addStoreSuccess && storeData?.status === "success") {
  //       navigate("/dashboard/store");
  //     }
  //   } else if ((addError && !isSuccess) || (addStoreError && !addStoreSuccess)) {
  //     // setFocusTnput(false);
  //     setTitle("");
  //     setGroup("");
  //     setUrl("");
  //     setError("Sorry! There was an error occured..");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSuccess, addError, newData, addStoreSuccess, storeData, addStoreError]);

  // //close button click
  // const handleClose = () => {
  //   setFocusTnput(false);
  //   setError("");
  // };
  // decide what to render
  let content = null;

  if (isError) {
    content = (
      <div className="mt-10">
        <Error message={error} />
      </div>
    );
  }
  if (!isError && isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
        <CardSkeletonLoader />
      </div>
    );
  }
  if (!isError && !isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 mt-8 pb-8">
        {booksData?.books?.map((b) => (
          <BookCard book={b}/>
        ))}
      </div>
    );
  }
  // if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarksByState?.length > 0 && bookmarkView === "list") {
  //   content = groupData?.groups?.map((group, i) => (
  //     ////filtering by group
  //     <div className="" key={i}>
  //       <h1 className="border-b-2 pb-2 w-1/6">{group.toUpperCase()}</h1>
  //       {/* // */}
  //       <div className="grid grid-cols-1 justify-center items-center gap-3 mt-8 pb-8">{bookmarksByState?.map((b) => (b?.group === group ? <BookmarkFlatCard key={b?._id} bookmark={b} currentState="normal" setShowModal={setShowModal} showModal={showModal} /> : null))}</div>
  //     </div>
  //   ));
  // }

  // if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarksByState?.length === 0) {
  //   content = (
  //     <div className="grid grid-cols-3 justify-center items-center gap-4 mt-12 ">
  //       <h1>No bookmark Found</h1>
  //     </div>
  //   );
  // }
  console.log(booksData?.books);
  return (
    <section className="overflow-y-scroll no-scrollbar h-full">
      {/* //input box for bookmark  */}
      {/* <div className="flex justify-center items-center mb-8">
        {/*  */}
      {/* {!focusTnput && (
          <div className="px-5 bg-fill flex items-center border border-border custom-shadow rounded-md md:w-3/5 " onClick={() => setFocusTnput((prev) => !prev)} ref={inputRef}>
            <input type="text" placeholder="Bookmark a group..." className="bookmarkInput" />
            <button className="mr-4">
              <BiPaint className="w-5 h-5 text-link" />
            </button>
            <button className="">
              <ImImage className="w-5 h-5 text-link" />
            </button>
          </div>
        )} */}
      {/*  */}
      {/* {focusTnput && (
          <div className="md:w-3/5">
            <div className="pt-2 px-5 bg-fill flex flex-col border border-border custom-shadow rounded-md" ref={ref}>
              <div>
                <input type="url" onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="bookmarkInput" autoFocus />
                <input type="text" placeholder="Title" className="bookmarkInput" onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Group" className="bookmarkInput" onChange={(e) => setGroup(e.target.value)} />

                <div className="bookmarkInput flex justify-between items-center">
                  <div className="flex justify-start">
                    <button className="bookmark-icon">
                      <ImImage className="w-4 h-4 text-link" />
                    </button>
                    <button className="bookmark-icon" title="Add to Store" onClick={handleAddStore}>
                      <FaWindowRestore className="w-4 h-4 text-link" />
                    </button>
                    {/* <button className="bookmark-icon">
                      <MdOutlineArchive className="w-5 h-5 text-link" />
                    </button> */}
      {/* </div>
                  <div> */}
      {/* <button type="button" className="px-4 py-2 rounded-md bg-grey mr-2 font-medium" onClick={handleAddBookmark}>
                      Add
                    </button>
                    <button className="px-4 py-2 rounded-md hover:bg-grey font-medium" onClick={() => handleClose()}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2 bg-fill rounded-md">{error ? <Error message={error} /> : null}</div>
          </div>
        )} 
      </div> */}
      {/* //cards  */}
      // {content}
      
      {/* <BookMarkModal showModal={showModal} setShowModal={setShowModal} /> */}
    </section>
  );
};

export default Book;
