import React, {useState} from "react";
import {useEffect} from "react";
import TablePagination from "../ui/TablePagination";
import {AiFillEye} from "react-icons/ai";
import {AiFillEyeInvisible} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {MdOutlineAdminPanelSettings} from "react-icons/md";

const UserTable = ({data, role}) => {
  const limit = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (data?.length > 0) {
      setTotalPage(Math.ceil(data?.length / limit));
    }
  }, [data, limit]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const dataPerPage = data?.filter((v, i) => {
      const start = limit * (currentPage - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
    setUsersData(dataPerPage);
  }, [currentPage, data, limit]);
  return (
    <div className="w-auto">
      {/* Students table  */}
      {role === "student" && (
        <div>
          <h1 className="text-2xl font-medium mb-3">Students:</h1>
          <div className="text-gray-800 " style={{height: "200px"}}>
            <div className="overflow-x-auto">
              <table className="w-full p-6 text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-main text-white">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Session</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="border-b bg-gray-50 border-gray-300">
                  {usersData?.map((d, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2">
                        <p>{d?.name}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p className="text-gray-600">{d?.role}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p>{d?.session}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p>{d?.contactNumber}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p>{d?.email}</p>
                      </td>

                      <td className="px-3 py-2 text-center">
                        {d?.status === "active" ? (
                          <button type="button" className="p-1 rounded-full hover:bg-green-100 text-lg text-second">
                            <AiFillEye />
                          </button>
                        ) : (
                          <button type="button" className="p-1 rounded-full text-lg text-gray-600 hover:bg-gray-300">
                            <AiFillEyeInvisible />
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {" "}
                        <button type="button" className="p-1 rounded-full hover:bg-gray-300 text-lg text-black" title="Delete">
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
      )}
      {/* teachers table  */}
      {role === "teacher" && (
        <div>
          <h1 className="text-2xl font-medium mb-3">Teachers:</h1>
          <div className="text-gray-800" style={{height: "200px"}}>
            <div className="overflow-x-auto">
              <table className="w-full p-6 text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-main text-white">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3 text-center">Make Admin</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="border-b bg-gray-50 border-gray-300">
                  {usersData?.map((d, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2">
                        <p>{d?.name}</p>
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
                        {d?.admin ? (
                          <button type="button" className="p-1 rounded-full hover:bg-green-100 text-lg text-second">
                            <MdOutlineAdminPanelSettings />
                          </button>
                        ) : (
                          <button type="button" className="p-1 rounded-full text-lg text-gray-600 hover:bg-gray-300">
                            <MdOutlineAdminPanelSettings />
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {" "}
                        <button type="button" className="p-1 rounded-full hover:bg-gray-300 text-lg text-black" title="Delete">
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
      )}
      {/* //stuff table  */}
      {role === "stuff" && (
        <div>
          <h1 className="text-2xl font-medium mb-3">Stuffs:</h1>
          <div className="text-gray-800 " style={{height: "200px"}}>
            <div className="overflow-x-auto">
              <table className="w-full p-6 text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-main text-white">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3 text-center">Make Admin</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="border-b bg-gray-50 border-gray-300">
                  {usersData?.map((d, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2">
                        <p>{d?.name}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p className="text-gray-600">{d?.role}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p>{d?.contactNumber}</p>
                      </td>
                      <td className="px-3 py-2">
                        <p>{d?.email}</p>
                      </td>

                      <td className="px-3 py-2 text-center">
                        <button type="button" className="p-1 rounded-full hover:bg-green-100 text-lg text-second">
                          <MdOutlineAdminPanelSettings />
                        </button>
                      </td>
                      <td className="px-3 py-2 text-center">
                        {" "}
                        <button type="button" className="p-1 rounded-full hover:bg-gray-300 text-lg text-black" title="Delete">
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
      )}

      {data?.length > 0 ? (
        <div className=" my-6">
          <TablePagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
        </div>
      ) : null}
    </div>
  );
};

export default UserTable;
