import React, {useEffect} from "react";
import {AiTwotoneStar} from "react-icons/ai";
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
                <AiTwotoneStar className="sidebar-icon" title="Top Books!" />
                <span className={`link-text transition-all duration-300 ${toggle && "hidden"}`}>Top Books</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;