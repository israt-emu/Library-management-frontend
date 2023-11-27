import React, { useEffect, useState } from "react";
import TablePagination from "../ui/TablePagination";
import { MdBookmarkAdded, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetFilteredRequestedBooksQuery } from "../../features/book/bookAPI";
import RequestCountModal from "../modals/RequestCountModal";
import DeleteRequestedBookModal from "../modals/DeleteRequestedBookModal";
import { useSelector } from "react-redux";

const RequestedBookTable = ({ data }) => {
  const { user } = useSelector((state) => state?.auth);
  const limit = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [requestCount, setRequestCount] = useState(false);
  const [reqData, setReqData] = useState({});
  const [removeReqBook, setRemoveReqBook] = useState(false);
  const [delData, setDelData] = useState({});
  //onClicking request button
  const handleRequest = (d) => {
    setRequestCount(true);
    setReqData(d);
  };
  //onClicking delete button
  const handleRemoveModal = (d) => {
    setRemoveReqBook(true);
    setDelData(d);
  };

  //filtering data by search and status
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState("");
  const { data: newData } =
    useGetFilteredRequestedBooksQuery({ status, search }, { skip: skip }) || {};
  useEffect(() => {
    if (status === "" && search === "") {
      setFilteredData(data);
    } else {
      setSkip(false);
      if (newData?.books) {
        setFilteredData(newData?.books);
      }
    }
  }, [data, status, search, newData]);
  // content for pagination
  useEffect(() => {
    if (filteredData?.length > 0) {
      setTotalPage(Math.ceil(filteredData?.length / limit));
    }
  }, [filteredData, limit]);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const dataPerPage = filteredData?.filter((v, i) => {
      const start = limit * (currentPage - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
    setBooksData(dataPerPage);
  }, [currentPage, filteredData, limit]);
  console.log(data);
  console.log(user);
  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3 text-primary">
            Requested Books:
          </h1>
          <div className="flex items-center">
            <p className="mr-2 font-medium text-primary">Filtered By:</p>
            <select
              className="px-2 py-1 rounded mr-2 text-black"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="available">Available</option>
            </select>
            <input
              type="search"
              name=""
              id=""
              className="px-2 py-1 rounded mr-2"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to={"/dashboard/addrequestedbook"}>
              <button className="bg-second px-3 py-1 text-sm font-medium rounded text-sidebar_text">
                Request a Book
              </button>
            </Link>
          </div>
        </div>
        <div className="text-gray-800" style={{ height: "200px" }}>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="bg-main text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Writer</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Request Count</th>
                  <th className="p-3 text-center">Request</th>
                  {user?.admin && <th className="p-3 text-center">Edit</th>}
                  {user?.admin && <th className="p-3 text-center">Delete</th>}
                </tr>
              </thead>
              <tbody className="border-b bg-gray-50 border-gray-300">
                {booksData?.map((d, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">
                      <p>{d?.name}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-gray-600">{d?.writer}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-gray-600">{d?.category}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{d?.status}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>{d?.requestCount}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        className="p-1 text-white bg-green-500 rounded-full text-lg"
                        onClick={() => handleRequest(d)}
                      >
                        <MdBookmarkAdded />
                      </button>
                    </td>

                    {user?.admin && (
                      <td className="px-3 py-2 text-center">
                        <button
                          disable={true}
                          type="button"
                          className="p-1 rounded-full hover:bg-gray-300 text-lg text-black"
                          title="Edit"
                        >
                          <Link to={`/dashboard/editRequestedBook/${d?._id}`}>
                            <MdEdit />
                          </Link>
                        </button>
                      </td>
                    )}

                    {user?.admin && (
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          className="p-1 rounded-full hover:bg-gray-300 text-lg text-black"
                          title="Delete"
                          onClick={() => handleRemoveModal(d)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {requestCount && (
          <RequestCountModal
            setRequestCount={setRequestCount}
            requestCount={requestCount}
            data={reqData}
          />
        )}
        {removeReqBook && (
          <DeleteRequestedBookModal
            setRemoveBook={setRemoveReqBook}
            removeBook={removeReqBook}
            data={delData}
          />
        )}
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
    </div>
  );
};

export default RequestedBookTable;
