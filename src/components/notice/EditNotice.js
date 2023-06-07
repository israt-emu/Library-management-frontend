import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useGetNoticeDetailsQuery, useUpdateNoticeMutation} from "../../features/notice/noticeApi";

const EditNotice = () => {
  const [error, setError] = useState("");
  const {editNoticeId} = useParams();
  const {data: singleNotice} = useGetNoticeDetailsQuery({id: editNoticeId});
  const {title, category, description, image, fileLink} = singleNotice?.notice || {};
  const [updateNotice, {data, isSuccess, isError}] = useUpdateNoticeMutation();
  const [noticeData, setNoticeData] = useState({});
  const handleOnchange = (e) => {
    noticeData[e.target.name] = e.target.value;
    setNoticeData({...noticeData});
  };
  //edit notice
  const handleSubmit = () => {
    updateNotice({id: editNoticeId, data: noticeData});
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (data?.status === "success" && isSuccess) {
      navigate("/dashboard/notice");
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [data, isSuccess, isError, error, navigate]);
  return (
    <div>
      <section className="py-6 bg-gray-100 text-gray-900 w-full mb-8">
        <div className="px-5">
          <h1 className="text-4xl font-bold my-8 text-center">Edit Notice</h1>
        </div>
        <div className="flex   justify-center mb-8">
          <div className="py-6  w-2/3 md:py-0 md:px-6">
            <div className="">
              <label className="block mb-1">
                <span className="my-2">Title</span>
                <input onChange={handleOnchange} name="title" type="text" placeholder="Title" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={title} />
              </label>

              <label className="block mb-1">
                <span className="my-2">Category</span>
                <input onChange={handleOnchange} name="category" type="text" placeholder="Category" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={category} />
              </label>
              <label className="block mb-1">
                <span className="my-2">Description</span>
                <textarea onChange={handleOnchange} name="description" type="text" placeholder="Description" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={description} />
              </label>

              <label className="block mb-1">
                <span className="my-2">Image Link</span>
                <input onChange={handleOnchange} name="image" type="text" placeholder="Image Link" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={image} />
              </label>
              <label className="block mb-1">
                <span className="my-2">File Link</span>
                <input onChange={handleOnchange} name="fileLink" type="text" placeholder="File Link" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" defaultValue={fileLink} />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleSubmit} type="button" className=" px-8 py-2 text-lg rounded bg-main text-white">
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditNotice;
