import React from "react";
import {useEffect} from "react";
import {useGetAllUsersQuery} from "../../features/auth/authApi";
import {useGetBooksQuery} from "../../features/book/bookAPI";
import BooksTable from "../tables/BooksTable";
import UserTable from "../tables/UserTable";
import AdminCard from "./AdminCard";
import {FaUserGraduate} from "react-icons/fa";
import {FaChalkboardTeacher} from "react-icons/fa";
import {BsBookHalf} from "react-icons/bs";
import {BsFillPeopleFill} from "react-icons/bs";
import AdminBorrowedBookTable from "../tables/AdminBorrowedBookTable";
import {useGetBorrwedBooksQuery} from "../../features/boorowedBook/borrowedBookApi";

const AdminDashboard = () => {
  const {data} = useGetAllUsersQuery();
  const {data: bookData} = useGetBooksQuery();
  const {data: borrowedBooks} = useGetBorrwedBooksQuery();
  console.log(data);
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium">Welcome Admin!</h1>
      {/* //stats  */}
      <section className="my-6 dark:bg-gray-800 dark:text-gray-100">
        <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-green-200 border border-green-500`}>
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-green-500 text-xl text-white">
              <FaUserGraduate />
            </div>
            <div className="flex flex-col justify-center align-middle text-black">
              <p className="text-3xl font-semibold leading-none">{data?.users?.filter((u) => u?.role === "student")?.length}</p>
              <p className="capitalize font-medium text-lg">Students</p>
            </div>
          </div>
          <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-pink-200 border border-pink-500`}>
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-pink-500 text-xl text-white">
              <FaChalkboardTeacher />
            </div>
            <div className="flex flex-col justify-center align-middle text-black">
              <p className="text-3xl font-semibold leading-none">{data?.users?.filter((u) => u?.role === "teacher")?.length}</p>
              <p className="capitalize font-medium text-lg">Teachers</p>
            </div>
          </div>
          <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-indigo-200 border border-indigo-500`}>
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-500 text-xl text-white">
              <BsFillPeopleFill />
            </div>
            <div className="flex flex-col justify-center align-middle text-black">
              <p className="text-3xl font-semibold leading-none">{data?.users?.filter((u) => u?.role === "stuff")?.length}</p>
              <p className="capitalize font-medium text-lg">Stuffs</p>
            </div>
          </div>
          <div className={`flex p-4 space-x-4 rounded-tl-3xl rounded-br-3xl md:space-x-6 bg-yellow-200 border border-yellow-500`}>
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-yellow-500 text-xl text-white">
              <BsBookHalf />
            </div>
            <div className="flex flex-col justify-center align-middle text-black">
              <p className="text-3xl font-semibold leading-none">{bookData?.books?.length}</p>
              <p className="capitalize font-medium text-lg">Books</p>
            </div>
          </div>
        </div>
      </section>
      {/* //admins  */}
      <section className="py-6 bg-white backdrop-opacity-10 shadow-md rounded my-4">
        <div className="flex flex-col items-center justify-center">
          <p className="p-2 text-sm font-medium tracking-wider uppercase text-black">Management team</p>
          <h1 className="font-bold leading-none sm:text-2xl md:text-3xl text-black">Admin's</h1>
          <hr className="mx-auto w-12 h-[3px] mt-2 bg-gray-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center mt-8 p-4  mx-auto">
            {data?.users
              ?.filter((u) => u?.admin === true)
              ?.map((s, i) => (
                <AdminCard key={i} admin={s} />
              ))}
          </div>
        </div>
      </section>
      {/* ///tables  */}
      <UserTable data={data?.users} />
      <BooksTable data={bookData?.books} />
      <AdminBorrowedBookTable data={borrowedBooks?.borrowedBooks} />
    </div>
  );
};

export default AdminDashboard;
