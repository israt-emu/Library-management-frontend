import React from "react";

const BookRequest = () => {
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="flex justify-between my-2">
          <h2 className="mb-4 text-2xl font-semibold leading-tight">
            Requested Books
          </h2>
          <div className="flex items-center justify-center space-x-3">
            <h4>Request a Book</h4>
            <button className="text-xxl bg-main w-8 h-8 flex items-center justify-center text-white rounded-full p-3">
              +
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookRequest;
