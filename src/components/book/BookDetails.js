import React from "react";
import ReactImageGallery from "react-image-gallery";
import {useParams} from "react-router-dom";
import {useGetBookDetailsQuery} from "../../features/book/bookAPI";
import "react-image-gallery/styles/css/image-gallery.css";
import Moment from "react-moment";
// import {useSelector} from "react-redux";
import {useState} from "react";
// import {useId} from "react";
// import {useEffect} from "react";
import Error from "../ui/Error";
import Success from "../ui/Success";
import BorrowedBookModal from "../modals/BorrowedBookModal";

const BookDetails = () => {
  const {id} = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [borrowed, setBorrowed] = useState(false);
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  const {data: bookDetails} = useGetBookDetailsQuery({id: id});
  const {name, writer, publications, pdfLink, totalViews, status, edition, bookId, category, description, totalStock, remainingStock, bookLocation, createdAt, totalBorrowed, addedBy} = bookDetails?.book || {};

  console.log(id, bookDetails);

  // useEffect(() => {
  //   if (data?.status !== "success" && !isSuccess && isError) {
  //     setError("Sorry! we are having a trouble..");
  //     setSuccess("");
  //   } else if (data?.status === "success" && isSuccess) {
  //     setSuccess("You Borrowed this book successfully..");
  //     setError("");
  //   }
  // }, [data, isSuccess, isError]);
  return (
    <div className=" mx-auto space-y-12 grid grid-cols-2">
      <article className="space-y-8 text-gray-900">
        <div className="space-y-6 px-3">
          <ReactImageGallery showNav={false} showPlayButton={false} items={images} />
        </div>
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
      </article>
      <div className="pl-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{name}</h1>
          {status === "In Stock" && (
            <button className="bg-second px-3 py-1 text-sm font-medium rounded text-fill" onClick={() => setBorrowed(true)}>
              Borrow Book
            </button>
          )}
        </div>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-600">
          <div className="flex items-center md:space-x-2">
            <img src="https://source.unsplash.com/75x75/?portrait" alt="" className="w-4 h-4 border rounded-full bg-gray-500 border-gray-300" />
            <p className="text-sm my-2">{writer} </p>
          </div>
          <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
            <Moment format="D MMM YYYY" withTitle>
              {createdAt}
            </Moment>
            • {totalViews} views
          </p>
        </div>
        <div className="flex flex-wrap py-6  space-x-2 border-t border-dashed border-gray-600 justify-between">
          <p className="px-3 py-1 rounded-sm hover:underline bg-main text-gray-50">Category: {category}</p>
          <a rel="noopener noreferrer" href="#" className="px-3 py-1 rounded-sm hover:underline bg-main text-gray-50">
            {status}
          </a>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Book Location</h4>
          <button className="px-3 py-1 rounded-sm hover:underline"> {bookLocation}</button>
          <div className="mt-2">{error !== "" && <Error message={error} />}</div>
          <div className="mt-2">{success !== "" && <Success message={success} />}</div>
        </div>
      </div>
      {borrowed && <BorrowedBookModal borrowed={borrowed} setBorrowed={setBorrowed} data={bookDetails?.book} setError={setError} setSuccess={setSuccess} />}
    </div>
  );
};

export default BookDetails;
