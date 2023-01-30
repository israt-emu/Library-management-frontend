import React, {useEffect} from "react";
import {BsFillBookmarkCheckFill} from "react-icons/bs";
import {FaWindowRestore} from "react-icons/fa";
import {MdOutlineArchive} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sidebarActiveChange} from "../../features/activeLink/activeLinkSlice";

const Sidebar = ({toggle}) => {
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
            <li className={`${active === "bookmarks" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/bookmarks" className="link-styles">
                <BsFillBookmarkCheckFill className="link-icon-styles" title="Bookmarks" />
                <span className={`link-text transition-all duration-300 ${toggle && "hidden"}`}>Bookmarks</span>
              </Link>
            </li>
            <li className={`${active === "store" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/store" className="link-styles">
                <FaWindowRestore title="Store" className="link-icon-styles" />
                <span className={`link-text ${toggle && "hidden"}`}>Store</span>
              </Link>
            </li>

            <li className={`${active === "archive" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/archive" className="link-styles">
                <MdOutlineArchive title="Archive" className="link-icon-styles" />
                <span className={`link-text ${toggle && "hidden"}`}>Archive</span>
              </Link>
            </li>
            <li className={`${active === "trash" ? "link-active" : "link-hover"}`}>
              <Link to="/dashboard/trash" className="link-styles">
                <FaRegTrashAlt title="Trash" className="link-icon-styles" />
                <span className={`link-text ${toggle && "hidden"}`}>Trash</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
