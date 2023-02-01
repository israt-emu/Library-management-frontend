import React, {useEffect, useRef, useState} from "react";
import libraryImg from "../../assets/images/image.jpg";
import bookIcon from "../../assets/images/icons8-open-book-100.png";
import {FaWindowRestore} from "react-icons/fa";
import {BiPaint} from "react-icons/bi";
import {useSelector} from "react-redux";
import Error from "../ui/Error";

import {useNavigate} from "react-router-dom";
import {useGetBooksQuery} from "../../features/book/bookAPI";
import CardSkeletonLoader from "../ui/CardSkeletonLoader";
import BookCard from "./BookCard";

const Book = () => {
  const {data: booksData, isError, error, isLoading} = useGetBooksQuery();
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
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
        <CardSkeletonLoader />
      </div>
    );
  }
  if (!isError && !isLoading && booksData?.books?.length > 0) {
    content = (
      <div>
        <h2 className="text-main mt-6 font-medium text-2xl">Books In the Library:</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4 mt-8 pb-8 mx-auto">
          {booksData?.books?.map((b) => (
            <BookCard book={b} />
          ))}
        </div>
      </div>
    );
  }
  if (!isError && !isLoading && booksData?.books?.length === 0) {
    content = <div className="grid grid-cols-1 justify-center items-center gap-4 mt-8 pb-8 w-11/12 mx-auto">No Books Found!</div>;
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
      {/* //cards  */}
      <div className="banner pt-16 py-20 text-center">
        <h3 className=" text-fill font-semibold w-2/4 mx-auto text-3xl pt-6 pb-6">Seminar Library of Department of Applied Mathematics</h3>
        <img src={bookIcon} alt="" className="w-11 h-11 mx-auto" />
      </div>

      {content}

      {/* <BookMarkModal showModal={showModal} setShowModal={setShowModal} /> */}
    </section>
  );
};

export default Book;
