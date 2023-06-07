import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetRequestedBookDetailsQuery, useUpdateRequestedBookMutation} from "../../features/book/bookAPI";
import Error from "../ui/Error";

const EditRequestedBook = () => {
  const {editRequestId} = useParams();
  const {data: singleBook} = useGetRequestedBookDetailsQuery({id: editRequestId});
  const {name, writer, publications, status, category, description, image, _id} = singleBook?.book || {};
  const [bookData, setBookData] = useState({});
  const [updateRequestedBook, {data, isSuccess, isError}] = useUpdateRequestedBookMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleOnchange = (e) => {
    bookData[e.target.name] = e.target.value;
    setBookData({...bookData});
  };
  //edit requested book
  const handleSubmit = () => {
    console.log(bookData);
    updateRequestedBook({id: _id, data: bookData});
  };
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
          <h1 className="text-4xl font-bold my-8 px-6">Edit Requested book</h1>
        </div>
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mb-8">
          <div className="py-6 md:py-0 md:px-6">
            <div className="">
              <label className="block mb-1">
                <span className="my-2">Book Title</span>
                <input onChange={handleOnchange} name="name" type="text" placeholder="Book Title" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={name} />
              </label>

              <label className="block mb-1">
                <span className="my-2">Category</span>
                <input onChange={handleOnchange} name="category" type="text" placeholder="Category" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={category} />
              </label>
              <label className="block mb-1">
                <span className="my-2">Description</span>
                <textarea onChange={handleOnchange} name="description" type="text" placeholder="Description" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={description} />
              </label>
            </div>
          </div>
          <div className="py-6 md:py-0 md:px-6">
            <label className="block mb-1">
              <span className="my-2">Writer</span>
              <input onChange={handleOnchange} name="writer" type="text" placeholder="Writer" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={writer} />
            </label>
            <label className="block mb-1">
              <span className="my-2">Publications</span>
              <input onChange={handleOnchange} name="publications" type="text" placeholder="Publication" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={publications} />
            </label>

            <label className="block mb-1">
              <span className="my-2">Image Link</span>
              <input onChange={handleOnchange} name="image" type="text" placeholder="Book Image Link" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={image} />
            </label>
            <label className="block mb-1">
              <span className="my-2">Status</span>
              <input onChange={handleOnchange} name="status" type="text" placeholder="Book Status" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={status} />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleSubmit} type="button" className=" px-8 py-2 text-lg rounded bg-main text-white">
            Submit
          </button>
        </div>
        {error !== "" && <Error message={error} />}
      </section>
    </div>
  );
};

export default EditRequestedBook;
