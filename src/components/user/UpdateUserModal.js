import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {useUpdateMutation} from "../../features/auth/authApi";
import {useUpdateBookmarkMutation} from "../../features/bookmark/bookmarkAPI";
import Error from "../ui/Error";

import {getUpdatedUser} from "../../features/auth/authSlice";

export default function UpdateUserModal({showModal, setShowModal, btnRef}) {
  //   const { editedBookmark } = useSelector((state) => state.bookmark);

  const {user} = useSelector((state) => state.auth);
  // console.log(user);
  const {name, email, updatedAt} = user || {};
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setUserName(name);
    setUserEmail(email);
  }, [email, name]);
  // console.log(user);
  //   const [
  //     updateBookmark,
  //     { data: responseData, error, isError, isSuccess, isLoading },
  //   ] = useUpdateBookmarkMutation();
  const [updateUser, {data: responseData, error: responseError, isError, isSuccess, isLoading}] = useUpdateMutation();
  //   // update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const data = {
      name: userName,
      userEmail,
      password,
      newPassword,
    };
    // updateBookmark({ id, data });
    if (newPassword !== repeatPassword) {
      setError("Password Did not match !");
      return;
    }
    // console.log(data);
    updateUser({email, data});

    // setError("");

    // setShowModal(false);
  };
  useEffect(() => {
    if (responseError?.data?.status == "fail") {
      setError(responseError?.data?.message);
      setShowModal(true);
    }
    if (isSuccess) {
      setError("");
      setShowModal(false);
    }
  }, [responseError?.data?.message, responseError?.data?.status, setShowModal, isSuccess]);
  console.log(isLoading);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all ">
            <div className="relative w-full my-6 mx-auto max-w-3xl rounded-lg shadow-lg px-4 bg-modalBg" ref={btnRef}>
              {/*content*/}
              <form onSubmit={handleUpdateUser} className="border-0  relative flex flex-col w-full outline-none focus:outline-none pb-3 ">
                {/*header*/}
                <div className="flex items-start justify-between   rounded-t">
                  <button className="p-1 ml-auto bg-transparent border-0 text-primary opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}></button>
                </div>
                {/*body*/}
                <div className="relative px-4 flex-auto text-primary">
                  {" "}
                  <input autoFocus value={userName} type="text" placeholder="Name" className="bookmarkInput w-full bg-modalBg" onChange={(e) => setUserName(e.target.value)} />
                  <input type="email" value={userEmail} placeholder="Email" className="bookmarkInput w-full bg-modalBg" onChange={(e) => setUserEmail(e.target.value)} />
                  <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Old Password" className="bookmarkInput w-full bg-modalBg" minlength={3} required />
                  <input value={newPassword} type="password" onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="bookmarkInput w-full bg-modalBg" minlength={3} />
                  <input value={repeatPassword} type="password" onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repet Password" className="bookmarkInput w-full bg-modalBg" minlength={3} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-4 border-t border-solid border-gray-700 rounded-b">
                  <div className="flex space-x-2">
                    <p className="text-primary">Edited</p>
                    <Moment className="text-primary" fromNow>
                      {updatedAt}
                    </Moment>
                  </div>
                  <div className="flex">
                    <button className="text-red-500 background-transparent font-bold uppercase sm:px-2 md:px-6 md:text-sm text-xs py-2  outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button type="submit" className="bg-main text-primary active:bg-emerald-600 font-bold uppercase  px-2 md:px-6 md:text-sm text-xs py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" disabled={isLoading}>
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className="ml-2 ">{(error || isError) && <Error message={error} />}</div>
              </form>
            </div>
          </div>
          <div className="bg-opacity-30 fixed inset-0 z-40 bg-black transition-all"></div>
        </>
      ) : null}
    </>
  );
}
