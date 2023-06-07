import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { useAddRequestedBookMutation} from "../../features/book/bookAPI";
import Error from "../ui/Error";

const AddRequestedBook = () => {
  const {user} = useSelector((state) => state.auth);
  const [addRequestedBook, {data, isSuccess, isError}] = useAddRequestedBookMutation();
  const [bookData, setBookData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleOnchange = (e) => {
    bookData[e.target.name] = e.target.value;
    setBookData({...bookData});
  };
  // request book
  const handleSubmit = () => {
    bookData.requestedBy = user?._id;
    addRequestedBook(bookData);
  };
 //
  useEffect(() => {
    if (data?.status === "success" && isSuccess) {
      navigate("/dashboard/bookRequest");
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [data, isSuccess, isError, error, navigate]);
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-900 mb-8">
        <div className="px-5">
          <h1 className="text-4xl font-bold my-8 px-6">Request a book</h1>
        </div>
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mb-8">
          <div className="py-6 md:py-0 md:px-6">
            <div className="">
              <label className="block mb-1">
                <span className="my-2">Book Title</span>
                <input type="text" onChange={handleOnchange} name="name" placeholder="Book Title" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>

              <label className="block mb-1">
                <span className="my-2">Category</span>
                <input type="text" onChange={handleOnchange} name="category" placeholder="Category" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>
              <label className="block mb-1">
                <span className="my-2">Description</span>
                <textarea type="text" onChange={handleOnchange} name="description" placeholder="Description" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
              </label>
            </div>
          </div>
          <div className="py-6 md:py-0 md:px-6">
            <label className="block mb-1">
              <span className="my-2">Writer</span>
              <input type="text" onChange={handleOnchange} name="writer" placeholder="Writer" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>
            <label className="block mb-1">
              <span className="my-2">Publications</span>
              <input type="text" onChange={handleOnchange} name="publications" placeholder="Publication" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>

            <label className="block mb-1">
              <span className="my-2">Image Link</span>
              <input type="text" onChange={handleOnchange} name="image" placeholder="Book Image Link" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={handleSubmit} className=" px-8 py-2 text-lg rounded bg-main text-white">
            Submit
          </button>
        </div>
        {error !== "" && <Error message={error} />}
      </section>
    </div>
  );
};

export default AddRequestedBook;
