import React, {useEffect, useState} from "react";
import {TiDelete} from "react-icons/ti";
import {useDeleteRequestedBookMutation} from "../../features/book/bookAPI";
import Error from "../ui/Error";

const DeleteRequestedBookModal = ({removeBook, setRemoveBook, data}) => {
  const [deleteRequestedBook, {data: deletedData, isSuccess, isError}] = useDeleteRequestedBookMutation();
  const [error, setError] = useState("");
  const handleDelete = () => {
    deleteRequestedBook(data?._id);
  };
  useEffect(() => {
    if (deletedData?.status === "success" && isSuccess) {
      setRemoveBook(false);
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [isSuccess, isError, deletedData, setRemoveBook]);
  return (
    removeBook && (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
          <div className="relative w-full my-6 mx-auto max-w-3xl px-4 bg-modalBg rounded-lg shadow-lg py-6">
            {/*content*/}
            <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/*body*/}
              <div className="relative px-4 text-primary flex items-center">
                <button className="text-lg text-red-600 bg-red-200 rounded-md p-2 mr-3">
                  <TiDelete />
                </button>
                <h2 className="text-lg font-medium">Are you sure you want to delete this book?</h2>
              </div>
              <div className="flex justify-end items-center mt-4">
                <button className="text-primary background-transparent font-bold sm:px-2 md:px-6 md:text-sm text-xs py-2  outline-none focus:outline-none mr-2 mb-1" type="button" onClick={() => setRemoveBook(false)}>
                  No
                </button>
                <button type="submit" className="bg-red-200 text-red-500  font-bold uppercase md:text-sm text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={handleDelete}>
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

export default DeleteRequestedBookModal;
