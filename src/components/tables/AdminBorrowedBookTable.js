import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import TablePagination from "../ui/TablePagination";
import {BsCheckCircleFill} from "react-icons/bs";
import {TbBookDownload} from "react-icons/tb";
import {useGetFilteredBorrowedBooksQuery} from "../../features/boorowedBook/borrowedBookApi";
import ReturnBookModal from "../modals/ReturnBookModal";
import {MdCircleNotifications} from "react-icons/md";
import AddNotificationModal from "../modals/AddNotificationModal";


const AdminBorrowedBookTable = ({data}) => {
  const [addNotificationModal, setAddNotificationModal] = useState(false);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  //filtering data by search and stATE
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [returnBook, setReturnBook] = useState(false);
  const [returnData, setReturnData] = useState({});
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
  const returnBookModal = (d) => {
    setReturnBook(true);
    setReturnData(d);
  };
  // console.log(data);
  return (
    <div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3 text-primary">Borrowed Books:</h1>
          <div className="flex items-center">
            <p className="mr-2 font-medium text-primary">Filtered By:</p>
            <select className="px-2 py-1 rounded mr-2 text-black" onChange={(e) => setStatus(e.target.value)}>
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
                  <th className="p-3 text-center">Notify</th>
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
                      <p className={`${d?.status === "borrowed" && d?.dueDate > new Date().toISOString() ? "bg-red-100 text-red-500" : "bg-green-100 text-second"} p-1 rounded-full  text-sm `}>
                        {" "}
                        <Moment format="D MMM YYYY" withTitle>
                          {d?.dueDate}
                        </Moment>
                      </p>
                    </td>

                    <td className="px-3 py-2 text-center">
                      <p>
                        {d?.returnDate ? (
                          <Moment format="D MMM YYYY" withTitle>
                            {d?.returnDate}
                          </Moment>
                        ) : (
                          "Not returned"
                        )}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {/* {" "}
                      {d?.status === "borrowed" ? (
                        <button
                          type="button"
                          className={` bg-red-200 text-red-500 p-1 rounded-full  text-lg `}
                          title="Return time due!"
                        >
                          <TbAlertCircle />
                        </button>
                      ) : null} */}
                      {d?.status === "borrowed" ? (
                        <button onClick={() => returnBookModal(d)} type="button" className={`${d?.dueDate < new Date().toISOString() ? "bg-red-200 text-red-500" : "bg-green-200 text-second"} p-1 rounded-full  text-lg `} title={`Due on  ${new Date(d?.dueDate).toLocaleDateString()}`}>
                          <TbBookDownload />
                        </button>
                      ) : null}
                      {d?.status === "returned" && (
                        <button type="button" className={` ${d?.dueDate < d?.returnDate ? "bg-red-200 text-red-500" : "bg-green-200 text-green-600"} p-1 rounded-full  text-lg`} disabled={true} title={`${d?.dueDate < d?.returnDate ? "Late returned" : "Returned in time"}`}>
                          <BsCheckCircleFill />
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-300 text-lg text-black"
                        title="Notification"
                        onClick={() => {
                          setUserId(d?.borrowerId);
                          setAddNotificationModal(true);
                        }}
                      >
                        <MdCircleNotifications />
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
          <TablePagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
        </div>
      ) : null}

      {returnBook && <ReturnBookModal setReturnBook={setReturnBook} returnBook={returnBook} data={returnData} />}
      <AddNotificationModal user={userId} notificationModal={addNotificationModal} setNotificationModal={setAddNotificationModal} />
    </div>
  );
};

export default AdminBorrowedBookTable;
