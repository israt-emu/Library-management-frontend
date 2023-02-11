import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsBookHalf } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { useGetAllUsersQuery } from "../../features/auth/authApi";
import { useGetBooksQuery, useGetRequestedBooksQuery } from "../../features/book/bookAPI";
import { useGetBorrwedBooksQuery } from "../../features/boorowedBook/borrowedBookApi";

const QuickAnalytics = () => {
  const { data } = useGetAllUsersQuery();
  const { data: bookData } = useGetBooksQuery();
  const { data: borrowedBookData } = useGetBorrwedBooksQuery();
  const { data: requestedBooks } = useGetRequestedBooksQuery();
  console.log(requestedBooks);
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <div
          className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-green-200 border border-green-500`}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-green-500 text-xl text-white">
            <FaUserGraduate />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              {borrowedBookData?.borrowedBooks?.length}
            </p>
            <p className="capitalize font-medium text-lg">Borrowed</p>
          </div>
        </div>
        <div
          className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-pink-200 border border-pink-500`}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-pink-500 text-xl text-white">
            <FaChalkboardTeacher />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              {data?.users?.filter((u) => u?.role === "teacher")?.length}
            </p>
            <p className="capitalize font-medium text-lg">Over Due</p>
          </div>
        </div>
        <div
          className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-indigo-200 border border-indigo-500`}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-500 text-xl text-white">
            <BsFillPeopleFill />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
            {requestedBooks?.books?.length}
            </p>
            <p className="capitalize font-medium text-lg">Requested</p>
          </div>
        </div>
        <div
          className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-yellow-200 border border-yellow-500`}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-yellow-500 text-xl text-white">
            <BsBookHalf />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
            {data?.users?.filter((u) => u?.role === "student")?.length}
            </p>
            <p className="capitalize font-medium text-lg">Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAnalytics;
