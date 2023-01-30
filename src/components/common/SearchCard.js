import React from "react";
import bookmarkImg from "../../assets/images/bookmark2.jpg";
import {BsFillBookmarkCheckFill} from "react-icons/bs";
import {MdOutlineArchive} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {FaWindowRestore} from "react-icons/fa";

const SearchCard = ({cardContent, search}) => {
  const {url, title, group, htmlContent, state, thumbnail} = cardContent || {};
  const bookmark = htmlContent ? false : true;

  //searched text hightlighting
  const hightlightText = (text) => {
    const matched = text?.toLowerCase().includes(search?.toLowerCase());
    if (matched) {
      const regex = new RegExp(`(${search})`, "gi");
      const textArray = text?.split(regex);
      return textArray.map((str, i) => {
        if (regex?.test(str)) {
          return (
            <span className="bg-sky-800 text-white" key={i}>
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
  ///state
  let currentState;
  if (state === "normal") {
    currentState = "Normal";
  } else if (state === "trash") {
    currentState = "Trashed";
  } else if (state === "archive") {
    currentState = "Archived";
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-border h-full">
      <a href={url} target="_blank" rel="noreferrer">
        <div className="relative">
          <img className="w-full" src={thumbnail ? `data:image/jpeg;base64,${thumbnail}` : bookmarkImg} alt="book mark" />
          {bookmark ? (
            <div className="absolute w-10 h-10 rounded-full top-2 right-2 bg-main flex justify-center items-center" title="Bookmark Card">
              {" "}
              <BsFillBookmarkCheckFill className="text-primary" />
            </div>
          ) : null}
          {!bookmark ? (
            <div className="absolute w-10 h-10 rounded-full top-2 right-2 bg-main flex justify-center items-center" title="Store Card">
              <FaWindowRestore className="text-primary" />
            </div>
          ) : null}
          <div className="px-6 pt-2">
            <h2 className="font-bold text-xl mb-2">{hightlightText(title)}</h2>
          </div>
          <div className="px-6 ">
            {" "}
            <h3 className="font-medium text-lg">{hightlightText(group)}</h3>
          </div>
          <div className="px-6 ">
            {" "}
            <p className="">{hightlightText(url)}</p>
          </div>
        </div>
      </a>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2">
          <span className="flex items-center justify-between">
            {state === "normal" && <BsFillBookmarkCheckFill className="mr-1" />}
            {state === "archive" && <MdOutlineArchive className="mr-1 text-lg" />}
            {state === "trash" && <FaRegTrashAlt className="mr-1" />}
            {currentState}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
