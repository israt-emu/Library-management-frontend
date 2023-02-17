import React, {useEffect, useState} from "react";
import {MdBookmarkAdded} from "react-icons/md";
import {useUpdateRequestCountMutation} from "../../features/book/bookAPI";
import Error from "../ui/Error";

const RequestCountModal = ({requestCount, setRequestCount, data}) => {
  const {_id: id} = data || {};
  const [updateRequestCount, {data: reqData, isSuccess, isError}] = useUpdateRequestCountMutation();
  const [error, setError] = useState("");
  const handleRequestBook = () => {
    updateRequestCount({id});
  };
  useEffect(() => {
    if (reqData?.status === "success" && isSuccess) {
      setRequestCount(false);
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [isSuccess, isError, reqData, setRequestCount]);
  return (
    requestCount && (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
          <div className="relative w-full my-6 mx-auto max-w-3xl px-4 bg-modalBg rounded-lg shadow-lg py-6">
            {/*content*/}
            <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/*body*/}
              <div className="relative px-4 text-primary flex items-center">
                <button className="text-lg text-green-600 bg-green-200 rounded-md p-2 mr-3">
                  <MdBookmarkAdded />
                </button>
                <h2 className="text-lg font-medium">Are you sure you want to request this book?</h2>
              </div>
              <div className="flex justify-end items-center mt-4">
                <button className="text-primary background-transparent font-bold sm:px-2 md:px-6 md:text-sm text-xs py-2  outline-none focus:outline-none mr-2 mb-1" type="button" onClick={() => setRequestCount(false)}>
                  No
                </button>
                <button type="submit" className="bg-green-200 text-green-500  font-bold uppercase md:text-sm text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={handleRequestBook}>
                  Yes
                </button>
              </div>
            </div>
            <div className="px-2 pb-2">{error !== "" && <Error message={error} />}</div>
          </div>
        </div>
        <div className="bg-opacity-40 fixed inset-0 z-40 bg-black transition-all"></div>
      </>
    )
  );
};

export default RequestCountModal;
