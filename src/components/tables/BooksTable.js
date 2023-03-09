import React, {useEffect, useState} from "react";
import TablePagination from "../ui/TablePagination";
import {MdDelete, MdEdit} from "react-icons/md";
import {Link} from "react-router-dom";
import {useGetFilteredBooksQuery} from "../../features/book/bookAPI";
import DeleteBookModal from "../modals/DeleteBookModal";

const BooksTable = ({data}) => {
  // why nothing is here
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  //filtering data by search and stATE
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(true);
  const [removeBook, setRemoveBook] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const [status, setStatus] = useState("");
  const {data: newData} = useGetFilteredBooksQuery({status, search}, {skip: skip}) || {};
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
  const removeBookModal = (d) => {
    setRemoveBook(true);
    setDeleteData(d);
  };
  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3 text-primary">Books:</h1>
          <div className="flex items-center">
            <p className="mr-2 font-medium text-primary">Filtered By:</p>
            <select className="px-2 py-1 rounded mr-2 text-black" onChange={(e) => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Stock Out">Stock Out</option>
            </select>
            <input type="search" name="" id="" className="px-2 py-1 rounded mr-2" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <Link to={"/dashboard/addbook"}>
              <button className="bg-second px-3 py-1 text-sm font-medium rounded text-sidebar_text">Add Book</button>
            </Link>
          </div>
        </div>
        <div className="text-gray-800" style={{height: "250px"}}>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="bg-main text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3 text-center">Category</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Total Views</th>
                  <th className="p-3 text-center">Edit</th>
                  <th className="p-3 text-center">Delete</th>
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
                      <p>{d?.status}</p>
                    </td>
                    <td className="px-3 py-2  text-center">
                      <p>{d?.views}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {" "}
                      <button type="button" className="p-1 rounded-full hover:bg-gray-300 text-lg text-black" title="Delete">
                        <Link to={`/dashboard/editBook/${d?._id}`}>
                          <MdEdit />
                        </Link>
                      </button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {" "}
                      <button type="button" className="p-1 rounded-full hover:bg-gray-300 text-lg text-black" title="Delete" onClick={() => removeBookModal(d)}>
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
          <TablePagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
        </div>
      ) : null}
      {removeBook && <DeleteBookModal removeBook={removeBook} setRemoveBook={setRemoveBook} data={deleteData} />}
    </div>
  );
};

export default BooksTable;
