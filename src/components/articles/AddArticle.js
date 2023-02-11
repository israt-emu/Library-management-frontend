import React from "react";

const AddArticle = () => {
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-900 w-full">
        <div className="px-5">
          <h1 className="text-4xl font-bold my-8">Add Article</h1>
        </div>
        <div className="flex   justify-center mb-8">
          <div className="py-6  w-2/3 md:py-0 md:px-6">
            <div className="">
              <label className="block mb-1">
                <span className="my-2">Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
                />
              </label>

              <label className="block mb-1">
                <span className="my-2">Category</span>
                <input
                  type="number"
                  placeholder="Category"
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

              <label className="block mb-1">
                <span className="my-2">Image Link</span>
                <input
                  type="text"
                  placeholder="Image Link"
                  className="block w-full rounded-md shadow-sm bg-white py-2 px-2"
                />
              </label>
            </div>
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

export default AddArticle;
