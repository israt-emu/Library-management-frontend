import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetNoticesQuery } from "../../features/notice/noticeApi";
import CardSkeletonLoader from "../ui/CardSkeletonLoader";
import Error from "../ui/Error";
import NoticeItem from "./NoticeItem";

const Notice = () => {
  const { data: noticeData, isError, error, isLoading } = useGetNoticesQuery();

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
  if (!isError && !isLoading && noticeData?.notice?.length > 0) {
    content = (
      <div>
        <div className="  py-4 lg:px-4 flex flex-col space-y-3">
          {noticeData?.notice?.map((b) => (
            <NoticeItem data={b}/>
          ))}
        </div>
      </div>
    );
  }
  if (!isError && !isLoading && noticeData?.notice?.length === 0) {
    content = (
      <div className="grid grid-cols-1 justify-center items-center gap-4 mt-8 pb-8 w-11/12 mx-auto">
        No notices Found!
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="font-bold my-4"> Notice</h1>
        <Link to={"/dashboard/addnotice"}>
          <button className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2 text-white">
            Add Notice
          </button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default Notice;
