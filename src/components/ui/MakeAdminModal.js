import React, {useEffect, useState} from "react";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import {useDispatch} from "react-redux";
import {useChangeAdminMutation} from "../../features/auth/authApi";
import Error from "./Error";

const MakeAdminModal = ({makeAdmin, setMakeAdmin, data}) => {
  const {email, admin} = data || {};
  const [changeAdmin, {data: updateData, isSuccess, isError}] = useChangeAdminMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleChangeAdmin = () => {
    changeAdmin({email, admin});
  };
  useEffect(() => {
    if (updateData?.status === "success" && isSuccess) {
      setMakeAdmin(false);
      setError("");
    } else if (!isSuccess && isError) {
      setError("There was an error occured!");
    }
  }, [isSuccess, isError, updateData, setMakeAdmin]);
  return (
    makeAdmin && (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
          <div className="relative w-full my-6 mx-auto max-w-3xl px-4 bg-modalBg rounded-lg shadow-lg py-6">
            {/*content*/}
            <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/*body*/}
              <div className="relative px-4 text-primary flex items-center">
                <button className="text-lg text-green-600 bg-green-200 rounded-md p-2 mr-3">
                  <MdOutlineAdminPanelSettings />
                </button>
                {!admin && <h2 className="text-lg font-medium">Are you sure you want to make this user admin?</h2>}
                {admin && <h2 className="text-lg font-medium">Are you sure you want to remove this user to admin?</h2>}
              </div>
              <div className="flex justify-end items-center mt-4">
                <button className="text-red-500 background-transparent font-bold sm:px-2 md:px-6 md:text-sm text-xs py-2  outline-none focus:outline-none mr-2 mb-1" type="button" onClick={() => setMakeAdmin(false)}>
                  No
                </button>
                <button type="submit" className="bg-green-200 text-second  font-bold uppercase md:text-sm text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={handleChangeAdmin}>
                  Yes
                </button>
              </div>
            </div>
            <div className="px-2 pb-2">{error !== "" && <Error message={error} />}</div>
          </div>
        </div>
        <div className="bg-opacity-40 fixed inset-0 z-40 bg-black transition-all"></div>
      </>
    )
  );
};

export default MakeAdminModal;
