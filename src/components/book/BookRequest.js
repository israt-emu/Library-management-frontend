import React from "react";
import {useGetRequestedBooksQuery} from "../../features/book/bookAPI";
import RequestedBookTable from "../tables/RequestedBookTable";

const BookRequest = () => {
  const {data: requestedBookData} = useGetRequestedBooksQuery();
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="overflow-x-auto">
          <RequestedBookTable data={requestedBookData?.books} />
        </div>
      </div>
    </div>
  );
};

export default BookRequest;
