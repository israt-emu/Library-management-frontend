import React from "react";
import {useEffect} from "react";
import {useGetAllUsersQuery} from "../../features/auth/authApi";
import UserTable from "../tables/UserTable";

const AdminDashboard = () => {
  const {data, isSuccess, isError} = useGetAllUsersQuery();
  return (
    <div>
      <UserTable data={data?.users?.filter((u) => u?.role === "student")} role="student" />
      <UserTable data={data?.users?.filter((u) => u?.role === "teacher")} role="teacher" />
      <UserTable data={data?.users?.filter((u) => u?.role === "stuff")} role="stuff" />
    </div>
  );
};

export default AdminDashboard;
