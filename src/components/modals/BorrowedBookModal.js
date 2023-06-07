import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAddBorrowedBookMutation} from "../../features/boorowedBook/borrowedBookApi";
import {TbBookDownload} from "react-icons/tb";

const BorrowedBookModal = ({borrowed, setBorrowed, setSuccess, setError, data}) => {
  const [addBorrowedBook, {data: addData, isSuccess, isError}] = useAddBorrowedBookMutation();
  const {_id: userId, name: userName} = useSelector((state) => state?.auth?.user);
  const {name, bookId, category} = data || {};
  //borrowing books
  const handleBorrowBook = () => {
    addBorrowedBook({
      name,
      bookId,
      category,
      borrowerId: userId,
      borrowerName: userName,
      borrowedDate: new Date(),
      dueDate: new Date().setDate(new Date().getDate() + 5),
    });
  };
  useEffect(() => {
    if (addData?.status === "success" && isSuccess) {
      setBorrowed(false);
      setError("");
      setSuccess("You Borrowed this book successfully..");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
      setBorrowed(false);
      setSuccess("");
    }
  }, [isSuccess, isError, addData, setBorrowed, setError, setSuccess]);
  return (
    borrowed && (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
          <div className="relative w-full my-6 mx-auto max-w-3xl px-4 bg-modalBg rounded-lg shadow-lg py-6">
            {/*content*/}
            <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/*body*/}
              <div className="relative px-4 text-primary flex items-center">
                <button className="text-lg text-green-600 bg-green-200 rounded-md p-2 mr-3">
                  <TbBookDownload />
                </button>
                <h2 className="text-lg font-medium">Are you sure you want to borrow this book?</h2>
              </div>

              <div className="flex justify-end items-center mt-4">
                <button className="text-red-500 background-transparent font-bold sm:px-2 md:px-6 md:text-sm text-xs py-2  outline-none focus:outline-none mr-2 mb-1" type="button" onClick={() => setBorrowed(false)}>
                  No
                </button>
                <button type="submit" className="bg-green-200 text-second  font-bold uppercase md:text-sm text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={handleBorrowBook}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-opacity-40 fixed inset-0 z-40 bg-black transition-all"></div>
      </>
    )
  );
};

export default BorrowedBookModal;
