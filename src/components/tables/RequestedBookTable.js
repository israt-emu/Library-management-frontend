import React, { useEffect, useState } from "react";
import TablePagination from "../ui/TablePagination";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const RequestedBookTable = ({ data }) => {
  const limit = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (data?.length > 0) {
      setTotalPage(Math.ceil(data?.length / limit));
    }
  }, [data, limit]);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const dataPerPage = data?.filter((v, i) => {
      const start = limit * (currentPage - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
    setBooksData(dataPerPage);
  }, [currentPage, data, limit]);
  console.log(data);
  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3">Requested Books:</h1>
          <Link to={"/dashboard/addrequestedbook"}>
            <button className="bg-second px-3 py-1 text-sm font-medium rounded text-fill">
              Request a Book
            </button>
          </Link>
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
                  <th className="p-3">Request Count</th>
                  <th className="p-3 text-center">Action</th>
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
                    <td className="px-3 py-2">
                      <p>{d?.requestCount}</p>
                    </td>

                    <td className="px-3 py-2 text-center">
                      {" "}
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-300 text-lg text-black"
                        title="Delete"
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
    </div>
  );
};

export default RequestedBookTable;
