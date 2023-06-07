import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUpdateBookMutation, useGetSingleBookByIdQuery} from "../../features/book/bookAPI";
import Error from "../ui/Error";

const EditBook = () => {
  const {editBookId} = useParams();
  const {data: singleBook} = useGetSingleBookByIdQuery({id: editBookId});
  const {name, writer, publications, pdfLink, status, edition, bookId, category, description, totalStock, bookLocation, image, _id} = singleBook?.book || {};
  const [bookData, setBookData] = useState({});
  const [updateBook, {data, isSuccess, isError}] = useUpdateBookMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  //
  const handleOnchange = (e) => {
    bookData[e.target.name] = e.target.value;
    setBookData({...bookData});
  };
  //updating book
  const handleSubmit = () => {
    console.log(bookData);
    updateBook({id: _id, data: {bookData, id: bookId}});
  };
  useEffect(() => {
    if (data?.status === "success" && isSuccess) {
      navigate("/dashboard/admin");
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [data, isSuccess, isError, error, navigate]);
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-900 mb-8">
        <div className="px-5">
          <h1 className="text-4xl font-bold my-8 px-6">Edit book</h1>
        </div>
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mb-8">
          <div className="py-6 md:py-0 md:px-6">
            <div className="">
              <label className="block mb-1">
                <span className="my-2">Book Title</span>
                <input onChange={handleOnchange} name="name" type="text" placeholder="Book Title" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={name} />
              </label>
              <label className="block mb-1">
                <span className="my-2">Book Id</span>
                <input onChange={handleOnchange} type="number" name="bookId" placeholder="Give an unique Id" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={bookId} />
              </label>
              <label className="block mb-1">
                <span className="my-2">Category</span>
                <input onChange={handleOnchange} name="category" type="text" placeholder="Category" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={category} />
              </label>
              <label className="block mb-1">
                <span className="my-2">Description</span>
                <textarea onChange={handleOnchange} name="description" type="text" placeholder="Description" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={description} />
              </label>

              <label className="block mb-1">
                <span className="my-2">Total Stock</span>
                <input onChange={handleOnchange} name="totalStock" type="number" placeholder="Total stock" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={totalStock} />
              </label>
              <label className="block mb-1">
                <span className="my-2">Book Location</span>
                <input onChange={handleOnchange} name="bookLocation" type="text" placeholder="Book Location" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={bookLocation} />
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
              <span className="my-2">Edition</span>
              <input onChange={handleOnchange} name="edition" type="text" placeholder="Book Edition" className="block w-full rounded-md shadow-sm bg-white py-2 px-2 capitalize" defaultValue={edition} />
            </label>
            <label className="block mb-1">
              <span className="my-2">Pdf Link</span>
              <input onChange={handleOnchange} name="pdfLink" type="text" placeholder="Online pdf link" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={pdfLink} />
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

export default EditBook;
