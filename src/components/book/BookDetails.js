import React from "react";
import ReactImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { useGetBookDetailsQuery } from "../../features/book/bookAPI";
import "react-image-gallery/styles/css/image-gallery.css";
import Moment from "react-moment";
import { useState } from "react";
import Error from "../ui/Error";
import Success from "../ui/Success";
import BorrowedBookModal from "../modals/BorrowedBookModal";

const BookDetails = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [borrowed, setBorrowed] = useState(false);
  const { data: bookDetails } = useGetBookDetailsQuery({ id: id });
  const {
    name,
    writer,
    publications,
    pdfLink,
    views,
    status,
    edition,
    bookId,
    category,
    description,
    totalStock,
    remainingStock,
    bookLocation,
    createdAt,
    totalBorrowed,
    addedBy,
    image,
  } = bookDetails?.book || {};

  const images = [
    {
      original: image,
      thumbnail: image,
    },
    {
      original:
        "https://media.wiley.com/product_data/coverImage300/6X/11190152/111901526X.jpg",
      thumbnail:
        "https://media.wiley.com/product_data/coverImage300/6X/11190152/111901526X.jpg",
    },
    {
      original:
        "https://media.wiley.com/product_data/coverImage300/6X/11190152/111901526X.jpg",
      thumbnail:
        "https://media.wiley.com/product_data/coverImage300/6X/11190152/111901526X.jpg",
    },
  ];


 
  return (
    <div className=" mx-auto space-y-12 grid grid-cols-5">
      <article className="space-y-8 text-gray-900 col-span-2">
        <div className="space-y-6 px-3 ">
          <ReactImageGallery
            showNav={false}
            showPlayButton={false}
            items={images}
          />
        </div>
      </article>
      <div className="pl-4  col-span-3">
        <div className="mb-2">{error !== "" && <Error message={error} />}</div>
        <div className="mb-2">
          {success !== "" && <Success message={success} />}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
            {name}
          </h1>
          {status === "In Stock" && (
            <button
              className="bg-second px-3 py-1 text-sm font-medium rounded text-sidebar_text"
              onClick={() => setBorrowed(true)}
            >
              Borrow Book
            </button>
          )}
        </div>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-placeholder">
          <div className="flex items-center md:space-x-2">
            <img
              src="https://source.unsplash.com/75x75/?portrait"
              alt=""
              className="w-4 h-4 border rounded-full bg-gray-500 border-gray-300"
            />
            <p className="text-sm my-2">{writer} </p>
          </div>
          <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
            <Moment format="D MMM YYYY" withTitle>
              {createdAt}
            </Moment>
            • {views} views
          </p>
        </div>
        <div className="flex flex-wrap py-6  space-x-2 border-t border-dashed border-placeholder justify-between">
          <p className="px-3 py-1 rounded-sm hover:underline bg-main text-gray-50">
            Category: {category}
          </p>
          <button className="px-3 py-1 rounded-sm hover:underline bg-main text-gray-50">
            {status}
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Book Location</h4>
          <button className="px-3 py-1 rounded-sm hover:underline">
            {" "}
            {bookLocation}
          </button>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Book Description</h4>
            <p>
              {" "}
              <span>Title:</span> {name}
            </p>

            <p>
              {" "}
              <span>Book Id:</span> {bookId}
            </p>
            <p>
              {" "}
              <span>Category:</span> {category}
            </p>
            <p>
              {" "}
              <span>Writer:</span> {writer}
            </p>
            <p>
              {" "}
              <span>Publications:</span> {publications}
            </p>
            <p>
              {" "}
              <span>Edition:</span> {edition}
            </p>
            <p>
              {" "}
              <span>Total Copy:</span> {totalStock}
            </p>
            <p>
              {" "}
              <span>Total Borrowed:</span> {totalBorrowed} times
            </p>
            <p>
              {" "}
              <span>Available Copy:</span> {remainingStock}
            </p>
            <p>
              {" "}
              <span>Details:</span> {description}
            </p>
            <p>
              {" "}
              <span>pdf Link:</span> {pdfLink}
            </p>
            <p>
              {" "}
              <span>Added By:</span> {addedBy}
            </p>
          </div>
        </div>
      </div>
      {borrowed && (
        <BorrowedBookModal
          borrowed={borrowed}
          setBorrowed={setBorrowed}
          data={bookDetails?.book}
          setError={setError}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
};

export default BookDetails;
