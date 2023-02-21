import React, {useEffect, useRef, useState} from "react";
import libraryImg from "../../assets/images/image.jpg";
import bookIcon from "../../assets/images/icons8-open-book-100.png";
import {useSelector} from "react-redux";
import Error from "../ui/Error";
import {useNavigate} from "react-router-dom";
import {useGetBooksQuery} from "../../features/book/bookAPI";
import CardSkeletonLoader from "../ui/CardSkeletonLoader";
import BookCard from "./BookCard";

const Book = () => {
  const {data: booksData, isError, error, isLoading} = useGetBooksQuery();
  // const {_id: id} = useSelector((state) => state?.auth?.user);
  // const navigate = useNavigate();

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
        <h2 className="text-primary mt-6 font-medium text-2xl">Books In the Library:</h2>
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

  console.log(booksData?.books);
  return (
    <section className="overflow-y-scroll no-scrollbar h-full">
      {/* //cards  */}
      <div className="banner pt-16 py-20 text-center">
        <h3 className=" text-sidebar_text font-semibold w-2/4 mx-auto text-3xl pt-6 pb-6">Seminar Library of Department of Applied Mathematics</h3>
        <img src={bookIcon} alt="" className="w-11 h-11 mx-auto" />
      </div>

      {content}

      {/* <BookMarkModal showModal={showModal} setShowModal={setShowModal} /> */}
    </section>
  );
};

export default Book;
