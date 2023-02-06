import React from "react";
import {useEffect} from "react";
import {useGetAllUsersQuery} from "../../features/auth/authApi";
import {useGetBooksQuery} from "../../features/book/bookAPI";
import BooksTable from "../tables/BooksTable";
import UserTable from "../tables/UserTable";

const AdminDashboard = () => {
  const {data, isSuccess, isError} = useGetAllUsersQuery();
  const {data: bookData} = useGetBooksQuery();
  return (
    <div>
      <UserTable data={data?.users?.filter((u) => u?.role === "student")} role="student" />
      <UserTable data={data?.users?.filter((u) => u?.role === "teacher")} role="teacher" />
      <UserTable data={data?.users?.filter((u) => u?.role === "stuff")} role="stuff" />
      <BooksTable data={bookData?.books} />
    </div>
  );
};

export default AdminDashboard;
