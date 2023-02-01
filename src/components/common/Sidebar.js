import React, { useEffect } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { BsBookHalf } from "react-icons/bs";
import { MdAnalytics } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActiveChange } from "../../features/activeLink/activeLinkSlice";

const Sidebar = ({ toggle }) => {
  //
  const active = useSelector((state) => state?.active?.sidebarActive);
  const path = useSelector((state) => state?.filter?.path);
  const dispatch = useDispatch();
  //sidebar link active change on path change
  useEffect(() => {
    const activeLink = path.split("/")[2];
    dispatch(sidebarActiveChange(activeLink));
  }, [path, dispatch]);

  return (
    <div className="md:flex flex-col h-full text-fill ">
      <div className="space-y-3">
        <div className="flex-1">
          {/* sidebar link  */}
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li
              className={`${
                active === "bookmarks" ? "link-active" : "link-hover"
              }`}
            >
              <Link to="/dashboard/user" className="link-styles">
                <AiTwotoneStar className="sidebar-icon" title="Top Books!" />
                <span
                  className={`link-text transition-all duration-300 ${
                    toggle && "hidden"
                  }`}
                >

                  Dashboard
                </span>
              </Link>
            </li>
            <li
              className={`${
                active === "bookmarks" ? "link-active" : "link-hover"
              }`}
            >
              <Link to="/dashboard/books" className="link-styles">
                <BsBookHalf className="sidebar-icon" title="Books!" />
                <span
                  className={`link-text transition-all duration-300 ${
                    toggle && "hidden"
                  }`}
                >
                  Books
                </span>
              </Link>
            </li>

            <li
              className={`${
                active === "bookmarks" ? "link-active" : "link-hover"
              }`}
            >
              <Link to="/dashboard/analytics" className="link-styles">
                <MdAnalytics className="sidebar-icon" title="Analytics!" />
                <span
                  className={`link-text transition-all duration-300 ${
                    toggle && "hidden"
                  }`}
                >
                  Analytics
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
