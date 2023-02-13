import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {MdLogout} from "react-icons/md";
import {MdOutlineAccountCircle} from "react-icons/md";
import {useState} from "react";
// import UpdateUserModal from "../user/UpdateUserModal";
const DropModal = ({ref, logOut, btnRef}) => {
  const {user} = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  return (
    <div>
      <ul className={`dropdown-menu min-w-max absolute bg-fill text-primary z-50 list-none text-left rounded-lg custom-shadow mt-1 md:right-10 right-6 border-none`} aria-labelledby="dropdownMenuButton1" ref={btnRef}>
        <li className="flex justify-center items-center py-1 md:py-2 px-4 hover:bg-grey hover:rounded-lg" >
          <Link to="/dashboard/user">
          <MdOutlineAccountCircle className="w-6 h-6" />
          <button className="dropdown-item ml-2 font-semibold block w-full bg-transparent ">{user?.name}</button>
          </Link>
        </li>
        <li className="flex justify-center items-center py-2 px-4 hover:bg-grey hover:rounded-lg cursor-pointer">
          <MdLogout className="w-5 h-5" />

          <button type="button" className="dropdown-item ml-2 font-semibold block w-full bg-transparent " onClick={logOut}>
            Log Out
          </button>
        </li>
      </ul>
      {/* <UpdateUserModal btnRef={btnRef} showModal={showModal} setShowModal={setShowModal} /> */}
    </div>
  );
};

export default DropModal;
