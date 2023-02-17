import React from "react";
import {useGetTopRequestedBooksQuery} from "../../features/book/bookAPI";

const TopRequestedBooksTable = () => {
  const {data} = useGetTopRequestedBooksQuery();
  return (
    <div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mb-3 text-primary">Top Five Requested Books:</h1>
        </div>
        <div className="text-gray-800" style={{height: "250px"}}>
          <div className="overflow-x-auto">
            <table className="w-full p-6 text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="bg-main text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3 text-center">Category</th>
                  <th className="p-3 text-center">Writer</th>
                  <th className="p-3 text-center">Publications</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Total Requested</th>
                </tr>
              </thead>
              <tbody className="border-b bg-gray-50 border-gray-300">
                {data?.books?.map((d, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">
                      <p>{d?.name}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p className="text-gray-600">{d?.category}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p className="text-gray-600">{d?.writer}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p className="text-gray-600">{d?.publications}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>{d?.status}</p>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <p>{d?.requestCount}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRequestedBooksTable;
