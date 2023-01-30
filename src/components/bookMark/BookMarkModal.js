import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import {useSelector} from "react-redux";
import {useUpdateBookmarkMutation} from "../../features/bookmark/bookmarkAPI";
import Error from "../ui/Error";

export default function Modal({showModal, setShowModal}) {
  const {editedBookmark} = useSelector((state) => state.bookmark);
  const {_id: userId} = useSelector((state) => state?.auth?.user);
  const {title: bookmarkTitle, url: bookmarkUrl, updatedAt, _id: id, group: bookmarkGroup} = editedBookmark || {};
  const [group, setGroup] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setGroup(bookmarkGroup);
    setTitle(bookmarkTitle);
    setUrl(bookmarkUrl);
  }, [bookmarkTitle, bookmarkUrl, bookmarkGroup]);

  const [updateBookmark, {data: responseData, isError, isSuccess, isLoading}] = useUpdateBookmarkMutation();
  //
  const handleClose = () => {
    setShowModal(false);
    setError("");
  };
  // update bookmark
  const handleUpdateBookmark = (e) => {
    e.preventDefault();
    var urlValidation = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    if (urlValidation) {
      const data = {
        group,
        title,
        url,
        userId: userId,
      };
      updateBookmark({id, data});
    } else {
      setError("Please provide valid url!");
    }
  };
  useEffect(() => {
    if (responseData?.status === "success" && isSuccess) {
      setShowModal(false);
      setError("");
    }
    if ((!isSuccess || responseData?.status !== "success") && isError) {
      setError("There was an error occured!");
    }
  }, [isSuccess, isError, responseData, setShowModal]);

  // console.log(bookmark);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
            <div className="relative w-full my-6 mx-auto max-w-3xl px-4 bg-modalBg rounded-lg shadow-lg ">
              {/*content*/}
              <form onSubmit={handleUpdateBookmark} className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between   rounded-t">
                  <button className="p-1 ml-auto bg-transparent border-0 text-primary opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none " onClick={() => setShowModal(false)}></button>
                </div>
                {/*body*/}
                <div className="relative px-4 flex-auto text-primary ">
                  {" "}
                  <input autoFocus value={title} type="text" placeholder="Title" className="bookmarkInput w-full bg-modalBg" onChange={(e) => setTitle(e.target.value)} />
                  <input type="text" value={group} placeholder="Group" className="bookmarkInput w-full bg-modalBg" onChange={(e) => setGroup(e.target.value)} />
                  <input value={url} type="text" onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="bookmarkInput w-full bg-modalBg" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-4 border-t border-solid border-slate-200 rounded-b">
                  <div className="flex space-x-2 mb-1">
                    <p className="text-primary">Edited</p>
                    <Moment className="text-primary" fromNow>
                      {updatedAt}
                    </Moment>
                  </div>
                  <div>
                    <button className="text-red-500 background-transparent font-bold uppercase sm:px-2 md:px-6 md:text-sm text-xs py-2  outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => handleClose()}>
                      Close
                    </button>
                    <button type="submit" className="bg-main text-primary  font-bold uppercase md:text-sm text-xs px-2 md:px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className="px-2 pb-2">{error !== "" && <Error message={error} />}</div>
              </form>
            </div>
          </div>

          <div className="bg-opacity-30 fixed inset-0 z-40 bg-black transition-all"></div>
        </>
      ) : null}
    </>
  );
}
