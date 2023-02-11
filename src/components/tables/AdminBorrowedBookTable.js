import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import TablePagination from "../ui/TablePagination";
import {BsCheckCircleFill} from "react-icons/bs";
import {TbAlertCircle} from "react-icons/tb";

const AdminBorrowedBookTable = ({data}) => {
  const limit = 5;
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
  //   const returnBookModal = (d) => {
  //     setReturnBook(true);
  //     setReturnData(d);
  //   };
  return (
    <div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3">Borrowed Books:</h1>
        </div>
        <div className="text-gray-800" style={{height: "250px"}}>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="bg-main text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3 text-center">Category</th>
                  <th className="p-3 text-center">Borrower</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Due Date</th>
                  <th className="p-3 text-center">Estimate Return Date</th>
                  <th className="p-3 text-center">Return Date</th>
                  <th className="p-3 text-center">....</th>
                </tr>
              </thead>
              <tbody className="border-b bg-gray-50 border-gray-300">
                {booksData?.map((d, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">
                      <p>{d?.name}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p className="text-gray-600">{d?.category}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p className="text-gray-600">{d?.borrowerName}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>{d?.status}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>
                        {" "}
                        <Moment format="D MMM YYYY" withTitle>
                          {d?.dueDate}
                        </Moment>
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>
                        <Moment format="D MMM YYYY" withTitle>
                          {d?.estimateReturnDate}
                        </Moment>
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>
                        <Moment format="D MMM YYYY" withTitle>
                          {d?.returnDate}
                        </Moment>
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {" "}
                      {d?.status === "borrowed" && (
                        <button type="button" className={`${d?.dueDate < d?.estimateReturnDate ? "bg-red-200 text-red-500" : "bg-green-200 text-second"} p-1 rounded-full  text-lg `} title="Return Book">
                          <TbAlertCircle />
                        </button>
                      )}
                      {d?.status === "returned" && (
                        <button type="button" className={` text-second p-1 rounded-full  text-lg disabled:cursor-not-allowed`} disabled={true} title="Return Book">
                          <BsCheckCircleFill />
                        </button>
                      )}
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
          <TablePagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
        </div>
      ) : null}
    </div>
  );
};

export default AdminBorrowedBookTable;
