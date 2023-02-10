import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NoticeItem from "./NoticeItem";

const Notice = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="font-bold my-4"> Notice</h1>
        <Link to={"/dashboard/addnotice"}>
          <button
            className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2 text-white"
            //   onClick={() => handleBorrowBook()}
          >
            Add Notice
          </button>
        </Link>
      </div>

      <div>
        <div className="  py-4 lg:px-4 flex flex-col space-y-3">
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
        </div>
      </div>
    </div>
  );
};

export default Notice;
