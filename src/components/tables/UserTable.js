import React, { useState } from "react";
import { useEffect } from "react";
import TablePagination from "../ui/TablePagination";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdCircleNotifications } from "react-icons/md";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import MakeAdminModal from "../ui/MakeAdminModal";
import StatusUpdateModal from "../ui/StatusUpdateModal";
import { useGetFilteredUsersQuery } from "../../features/auth/authApi";
import { Link } from "react-router-dom";

const UserTable = ({ data }) => {
  const [notificationModal, setNotificationModal] = useState(false);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [makeAdmin, setMakeAdmin] = useState(false);
  const [makeAdminData, setMakeAdminData] = useState({});
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  //filtering data by status,role,search
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(true);
  const { data: newData } =
    useGetFilteredUsersQuery({ role, status, search }, { skip: skip }) || {};
  useEffect(() => {
    if (status === "" && role === "" && search === "") {
      setFilteredData(data);
    } else {
      setSkip(false);
      if (newData?.users) {
        setFilteredData(newData?.users);
      }
    }
  }, [data, status, role, search, newData]);
  ///
  useEffect(() => {
    if (filteredData?.length > 0) {
      setTotalPage(Math.ceil(filteredData?.length / limit));
    }
  }, [filteredData, limit]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const dataPerPage = filteredData?.filter((v, i) => {
      const start = limit * (currentPage - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
    setUsersData(dataPerPage);
  }, [currentPage, filteredData, limit]);
  //onclicking delete button
  const deleteModal = (d) => {
    setConfirmDelete(true);
    setDeleteData(d);
  };
  //onclicking status button
  const updateStatusModal = (d) => {
    setStatusUpdate(true);
    setStatusUpdateData(d);
  };
  //onclicking admin button
  const makeAdminModal = (d) => {
    setMakeAdmin(true);
    setMakeAdminData(d);
  };
  return (
    <div className="w-auto mt-8">
      {/* users table  */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-medium text-primary">Users:</h1>
          <div className="flex items-center">
            <p className="mr-2 font-medium text-primary">Filtered By:</p>
            <select
              className="px-2 py-1 rounded mr-2 text-black"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="stuff">Stuff</option>
            </select>
            <select
              className="px-2 py-1 rounded mr-2 text-black"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="block">Block</option>
            </select>
            <input
              type="search"
              name=""
              id=""
              className="px-2 py-1 rounded"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="text-gray-800 " style={{ height: "250px" }}>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="bg-main text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>

                  <th className="p-3">Designation</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Make Admin</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="border-b bg-gray-50 border-gray-300">
                {usersData?.map((d, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 text-blue-500">
                      <Link to={`/dashboard/user/${d?.email}`}>
                        <p>{d?.name}</p>
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-gray-600">{d?.role}</p>
                    </td>

                    <td className="px-3 py-2">
                      <p>{d?.designation}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{d?.contactNumber}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{d?.email}</p>
                    </td>

                    <td className="px-3 py-2 text-center">
                      {d?.status === "active" ? (
                        <button
                          type="button"
                          className="p-1 rounded-full hover:bg-green-100 text-lg text-second disabled:text-gray-400 disabled:cursor-not-allowed "
                          onClick={() => updateStatusModal(d)}
                          disabled={
                            d?.role === "teacher" || d?.role === "stuff"
                          }
                        >
                          <AiFillEye />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="p-1 rounded-full text-lg text-gray-600 hover:bg-gray-300"
                          disabled={
                            d?.role === "teacher" || d?.role === "stuff"
                          }
                          onClick={() => updateStatusModal(d)}
                        >
                          <AiFillEyeInvisible />
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {d?.admin ? (
                        <button
                          type="button"
                          className="p-1 rounded-full hover:bg-green-100 text-lg text-second disabled:text-gray-400 disabled:cursor-not-allowed"
                          disabled={d?.role === "student"}
                        >
                          <MdOutlineAdminPanelSettings
                            onClick={() => makeAdminModal(d)}
                          />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="p-1 rounded-full text-lg disabled:text-gray-400 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-300"
                          disabled={d?.role === "student"}
                          onClick={() => makeAdminModal(d)}
                        >
                          <MdOutlineAdminPanelSettings />
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {" "}
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-300 text-lg text-black"
                        title="Delete"
                        onClick={() => deleteModal(d)}
                      >
                        <MdDelete />
                      </button>
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {data?.length > 0 ? (
        <div className=" my-6">
          <TablePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : null}
      {confirmDelete && (
        <ConfirmDeleteModal
          setConfirmDelete={setConfirmDelete}
          confirmDelete={confirmDelete}
          data={deleteData}
        />
      )}
      {makeAdmin && (
        <MakeAdminModal
          makeAdmin={makeAdmin}
          setMakeAdmin={setMakeAdmin}
          data={makeAdminData}
        />
      )}
      {statusUpdate && (
        <StatusUpdateModal
          statusUpdate={statusUpdate}
          setStatusUpdate={setStatusUpdate}
          data={statusUpdateData}
        />
      )}
    </div>
  );
};

export default UserTable;
