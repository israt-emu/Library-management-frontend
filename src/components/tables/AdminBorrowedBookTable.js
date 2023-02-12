import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import TablePagination from "../ui/TablePagination";
import {BsCheckCircleFill} from "react-icons/bs";
import {TbAlertCircle} from "react-icons/tb";
import {TbBookDownload} from "react-icons/tb";
import {useGetFilteredBorrowedBooksQuery} from "../../features/boorowedBook/borrowedBookApi";

const AdminBorrowedBookTable = ({data}) => {
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  //filtering data by search and stATE
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState("");
  const {data: newData} = useGetFilteredBorrowedBooksQuery({status, search, id: ""}, {skip: skip}) || {};
  useEffect(() => {
    if (status === "" && search === "") {
      setFilteredData(data);
    } else {
      setSkip(false);
      if (newData?.borrowedBooks) {
        setFilteredData(newData?.borrowedBooks);
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
  //   const returnBookModal = (d) => {
  //     setReturnBook(true);
  //     setReturnData(d);
  //   };
  return (
    <div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3">Borrowed Books:</h1>
          <div className="flex items-center">
            <p className="mr-2 font-medium">Filtered By:</p>
            <select className="px-2 py-1 rounded mr-2" onChange={(e) => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
            </select>
            <input type="search" name="" id="" className="px-2 py-1 rounded mr-2" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
          </div>
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
                  <th className="p-3 text-center">Borrowed Date</th>
                  <th className="p-3 text-center">Due Date</th>
                  <th className="p-3 text-center">Return Date</th>
                  <th className="p-3 text-center">Return Status</th>
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
                        <Moment format="D MMM YYYY" withTitle>
                          {d?.borrowedDate}
                        </Moment>
                      </p>
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
                          {d?.returnDate}
                        </Moment>
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {" "}
                      {d?.status === "borrowed" && new Date(d?.dueDate) < new Date() ? (
                        <button type="button" className={`  bg-red-200 text-red-500 p-1 rounded-full  text-lg `} title="Return time due!">
                          <TbAlertCircle />
                        </button>
                      ) : null}
                      {(d?.status === "borrowed" && new Date(d?.dueDate) > new Date()) || new Date(d?.dueDate) === new Date() ? (
                        <button type="button" className={`  bg-green-200 text-green-500 p-1 rounded-full  text-lg `} title={`Due on  ${new Date(d?.dueDate).toLocaleDateString()}`}>
                          <TbBookDownload />
                        </button>
                      ) : null}
                      {d?.status === "returned" && (
                        <button type="button" className={` ${d?.dueDate < d?.returnDate ? "bg-red-200 text-red-500" : "bg-green-200 text-second"} p-1 rounded-full  text-lg`} disabled={true} title={`${d?.dueDate < d?.returnDate ? "Late returned" : "Returned in time"}`}>
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
