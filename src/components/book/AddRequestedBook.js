import React from "react";

const AddRequestedBook = () => {
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-900">
        <div className="px-5">
          <h1 className="text-4xl font-bold my-8">Request a book</h1>
        </div>
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mb-8">
          <div className="py-6 md:py-0 md:px-6">
            <div className="">
              <label className="block mb-1">
                <span className="my-2">Book Title</span>
                <input
                  type="text"
                  placeholder="Book Title"
                  className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
                />
              </label>

              <label className="block mb-1">
                <span className="my-2">Category</span>
                <input
                  type="number"
                  placeholder="Give an unique Id"
                  className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
                />
              </label>
              <label className="block mb-1">
                <span className="my-2">Description</span>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
                />
              </label>
            </div>
          </div>
          <div className="py-6 md:py-0 md:px-6">
            <label className="block mb-1">
              <span className="my-2">Writer</span>
              <input
                type="text"
                placeholder="Writer"
                className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
              />
            </label>
            <label className="block mb-1">
              <span className="my-2">Publications</span>
              <input
                type="number"
                placeholder="Publication"
                className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
              />
            </label>

            <label className="block mb-1">
              <span className="my-2">Image Link</span>
              <input
                type="text"
                placeholder="Book Image Link"
                className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className=" px-8 py-2 text-lg rounded bg-main text-white"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddRequestedBook;
