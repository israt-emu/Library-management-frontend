import React, { useEffect } from "react";
import Moment from "react-moment";
import {
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../features/notice/noticeApi";

import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "../../features/notice/noticeSlice";
export default function NotificationModal({
  setNotificationModal,
  notificationModal,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { _id: id } = user || {};
  const [updateStatus, { isLoading, isSuccess }] =
    useUpdateNotificationStatusMutation();
  const { data: notificationData } = useGetNotificationsQuery();

  const filterUserNotification = user?.admin
    ? notificationData?.notification?.filter(
        (d) => d?.user === "admin" || d?.user === "all"
      )
    : notificationData?.notification?.filter(
        (d) => d?.user === id || d?.user === "all"
      );

  useEffect(() => {
    // check if any unread notification remain
    const read =
      filterUserNotification?.filter((n) => {
        if (!n?.read) {
          return true;
        }
      }) || {};

    if (read.length > 0) {
      dispatch(newNotification(true));
    }
    if (read.length === 0) {
      dispatch(newNotification(false));
    }
    
  }, [filterUserNotification, dispatch, isSuccess]);
 
  return (
    <>
      {notificationModal ? (
        <>
          <div className="justify-end items-center flex overflow-y-hidden  fixed inset-0 z-50 outline-none focus:outline-none h-[calc(100%-4%)]">
            <div className="relative  max-w-sm  h-[calc(100%-3%)] ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t  h-[calc(100%-8rem)] ">
                  <h3 className="text-3xl font-semibold">Notifications</h3>
                  <button
                    className="p-1 rounded-full ml-auto bg-main border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setNotificationModal(false)}
                  >
                    <span className=" outline-none focus:outline-none ">
                      <MdClose className="text-white w-5 h-5" />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-row  w-auto bg-gray-50 max-h-screen overflow-y-scroll">
                  {filterUserNotification?.map((d) => (
                    <div
                      key={d?._id}
                      className={`mt-2 px-6 py-4 ${
                        d?.read ? "bg-white" : "bg-green-200"
                      } rounded-lg shadow w-full`}
                    >
                      <div className="inline-flex items-center justify-between w-full">
                        <div className="inline-flex items-center">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
                            alt="Training Icon"
                            className="w-6 h-6 mr-3"
                          />
                          <h3 className="font-bold text-base text-gray-800">
                            {d?.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs pl-8 text-gray-500 ">
                        <Moment fromNow>{d?.createdAt}</Moment>
                      </p>
                      <p className="mt-1 text-sm pl-8">{d?.message}</p>
                      <button
                        disabled={isLoading || d?.read}
                        onClick={() => updateStatus(d?._id)}
                        className={`mt-2 text-sm ml-8 ${
                          d?.read ? "" : "bg-second"
                        } px-3 py-1 flex justify-center items-center text-white`}
                      >
                        {" "}
                        {d?.read ? "" : "Mark as Read"}
                      </button>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setNotificationModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
