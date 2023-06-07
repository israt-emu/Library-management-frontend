import React, {useEffect, useState} from "react";
import {useAddNotificationMutation} from "../../features/notice/noticeApi";
import Error from "../ui/Error";

const AddNotificationModal = ({notificationModal, setNotificationModal, user}) => {
  const [addNotification, {isError, isLoading, isSuccess}] = useAddNotificationMutation();
  const [notiFicationData, setNotificationData] = useState({});
  const [err, setErr] = useState("");
  //add notification
  const handleAddNotification = () => {
    notiFicationData.user = user;
    addNotification(notiFicationData);
  };
  useEffect(() => {
    if (isSuccess) {
      setNotificationModal(false);
      setErr("");
    } else if (isError && !isSuccess) {
      setErr("There was an error occured!");
    }
  }, [isSuccess, setNotificationModal, isError]);
  const handleOnchange = (e) => {
    notiFicationData[e.target.name] = e.target.value;
    setNotificationData({...notiFicationData});
  };

  return (
    <div>
      {notificationModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Notification</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setNotificationModal(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label className="block mb-1">
                    <span className="my-2">Title</span>
                    <input onChange={handleOnchange} name="title" type="text" placeholder="Title" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
                  </label>

                  <label className="block mb-1">
                    <span className="my-2">Message</span>
                    <input onChange={handleOnchange} name="message" type="text" placeholder="Category" className="block w-full rounded-md shadow-sm bg-white py-2 px-2" />
                  </label>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setNotificationModal(false)}>
                    Close
                  </button>
                  <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" disabled={isLoading} onClick={() => handleAddNotification()}>
                    Send
                  </button>
                </div>
                <div className="mb-2">{err && <Error message={err} />}</div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default AddNotificationModal;
