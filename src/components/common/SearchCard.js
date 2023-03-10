import React from "react";
import bookImg from "../../assets/images/book.jpg";
import {Link} from "react-router-dom";

const SearchCard = ({cardContent, search}) => {
  const {name, category, description, image, writer, publications, _id: bookId} = cardContent || {};

  //searched text hightlighting
  const hightlightText = (text) => {
    const matched = text?.toLowerCase().includes(search?.toLowerCase());
    if (matched) {
      const regex = new RegExp(`(${search})`, "gi");
      const textArray = text?.split(regex);
      return textArray.map((str, i) => {
        if (regex?.test(str)) {
          return (
            <span className="bg-sky-600 text-white" key={i}>
              {str}
            </span>
          );
        }
        return str;
      });
    } else {
      return text;
    }
  };
  //{hightlightText(title)}

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-border h-full">
      <Link to={`/dashboard/books/${bookId}`}>
        <div>
          <img src={image ? image : bookImg} className="w-full" alt="book mark" />
          <div className="px-6 pt-2">
            <h2 className="font-bold text-base mb-2 capitalize">{hightlightText(name)}</h2>
          </div>
          <div className="px-6 ">
            {" "}
            <p className="text-base capitalize">{hightlightText(category)}</p>
            <p className="text-sm capitalize">{hightlightText(description)}</p>
            <p className="capitalize">
              <span className="font-semibold">Writer:</span>
              {hightlightText(writer)}
            </p>
            <p className="capitalize">
              <span className="font-semibold">Publications:</span>
              {hightlightText(publications)}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pt-4 pb-2"></div>
    </div>
  );
};

export default SearchCard;
