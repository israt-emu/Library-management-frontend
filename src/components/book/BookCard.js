import React from "react";
import Moment from "react-moment";
import bookImg from "../../assets/images/book.jpg";
import {Link} from "react-router-dom";

const BookCard = ({book}) => {
  const {name, bookId, category, createdAt, image} = book || {};

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-border h-full">
      <Link to={`/dashboard/books/${bookId}`}>
        <div>
          <img src={image ? image : bookImg} className="w-full h-48 rounded-md" alt="book mark" />
          <div className="px-6 pt-2">
            <h2 className="font-bold text-xl mb-2 capitalize">{name}</h2>
          </div>
          <div className="px-6 capitalize">
            {" "}
            <p>{category}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          {" "}
          <button className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2 text-white">
            <Moment format="D MMM YYYY" withTitle>
              {createdAt}
            </Moment>
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
