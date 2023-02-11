import React from "react";
import { useGetRequestedBooksQuery } from "../../features/book/bookAPI";
import RequestedBookTable from "../tables/RequestedBookTable";

const BookRequest = () => {
  const { data: requestedBookData } = useGetRequestedBooksQuery();
  console.log(requestedBookData);
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="overflow-x-auto">
          {/* <table className="min-w-full text-xs">
            <thead className="bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Auther</th>
                <th className="p-3">Issued</th>
                <th className="p-3">Requested</th>
                <th className="p-3 ">Action</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>Node Js</p>
                </td>
                <td className="p-3">
                  <p>Rayan Dhal </p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="text-gray-600">Friday</p>
                </td>
                <td className="p-3">
                  <p>22</p>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-purple-600 text-gray-50">
                    <span>Request</span>
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-blue-600 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>Demo title</p>
                </td>
                <td className="p-3">
                  <p>Tesla Inc.</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="text-gray-600">Friday</p>
                </td>
                <td className="p-3">
                  <p>20</p>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-purple-600 text-gray-50">
                    <span>Request</span>
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-blue-600 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>97412378923</p>
                </td>
                <td className="p-3">
                  <p>Edwin Hubble</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="text-gray-600">Friday</p>
                </td>
                <td className="p-3">
                  <p>10</p>
                </td>
                <td className="p-3">
                  <button className="px-3 py-1 font-semibold rounded-md bg-purple-600 text-gray-50">
                    <span>Request</span>
                  </button>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-gray-50">
                    <span>Accepted</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>97412378923</p>
                </td>
                <td className="p-3">
                  <p>Einstein</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="text-gray-600">Friday</p>
                </td>
                <td className="p-3">
                  <p>5</p>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-purple-600 text-gray-50">
                    <span>Request</span>
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-blue-600 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table> */}
          <RequestedBookTable data={requestedBookData?.books} />
        </div>
      </div>
    </div>
  );
};

export default BookRequest;
