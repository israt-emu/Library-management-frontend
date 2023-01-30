import React, {useEffect, useRef, useState} from "react";
import {FaSearch} from "react-icons/fa";
import {FaBars} from "react-icons/fa";
import {MdRefresh} from "react-icons/md";
import {BsViewList} from "react-icons/bs";
import {FiGrid} from "react-icons/fi";
import {IoSettingsOutline} from "react-icons/io5";
import {MdOutlineDarkMode} from "react-icons/md";
import {MdLightMode} from "react-icons/md";
import {MdDisabledByDefault} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {userLoggedOut} from "../../features/auth/authSlice";
import DropModal from "../ui/DropModal";

import {themeChange} from "../../features/theme/themeSlice";
import {bookmarkViewChange, settingBookmarks} from "../../features/bookmark/bookmarkSlice";
import {searched} from "../../features/filter/filterSlice";
import {useNavigate} from "react-router-dom";
import {settingStores} from "../../features/store/storeSlice";

const Navbar = ({setToggle, toggle}) => {
  const {bookmarkView} = useSelector((state) => state.bookmark);
  // const [dropModal, setDropModal] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.theme?.themeMode);
  // changing theme
  const themeModeChange = (mode) => {
    dispatch(themeChange(mode));
    localStorage.setItem(
      "theme",
      JSON.stringify({
        mode: mode,
      })
    );
  };
  // closing dropdown on clicking outside
  // const ref = useRef();
  // const btnRef = useRef();
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!ref?.current?.contains(event.target) && !btnRef?.current?.contains(event.target)) {
  //       setDropModal(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  // }, [ref, btnRef]);
  //logout
  // const logOut = () => {
  //   dispatch(userLoggedOut());
  //   localStorage.removeItem("auth");
  //   dispatch(settingStores([]));
  //   dispatch(settingBookmarks([]));
  // };
  //search functionality with debounce
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchText = useSelector((state) => state?.filter?.searchText);
  const [timer, setTimer] = useState(null);
  const handleSearch = (value) => {
    setSearch(value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      dispatch(searched(value));
      navigate("/dashboard/search");
    }, 1200);
    setTimer(newTimer);
  };
  //
  useEffect(() => {
    setSearch(searchText);
  }, [searchText]);
  //
  const handleBookmarkView = () => {
    // save to localStorage and toggle grid and list view
    if (bookmarkView === "list") {
      console.log(bookmarkView);
      dispatch(bookmarkViewChange("grid"));
      localStorage.setItem(
        "bookmarkView",
        JSON.stringify({
          view: "grid",
        })
      );
    }
    if (bookmarkView === "grid") {
      console.log(bookmarkView);
      dispatch(bookmarkViewChange("list"));
      localStorage.setItem(
        "bookmarkView",
        JSON.stringify({
          view: "list",
        })
      );
    }
  };
  //reload page
  const reloadPage = () => {
    window.location.reload(false);
  };
  return (
    <div className=" ">
      <header className=" border-b border-border fixed w-full bg-white z-10">
        <div className=" flex">
          <div className="flex items-center justify-start text-fill w-44 bg-second p-2">
            <button onClick={() => setToggle(!toggle)} className="nav-icon p-2 w-8 h-8" title="Main Menu">
              <FaBars className={`text-lg transition-all duration-100 ${!toggle ? "hidden" : "block"}`} />
              <MdDisabledByDefault className={`text-lg  transition-all duration-100 ${toggle ? "hidden" : "block"}`} />
            </button>
            <h2 className="text-sm">A.MATH LIBRARY</h2>
          </div>

          {/* search input  */}
          <div className="px-4 p-1 w-1/3">
            <div className="relative w-full justify-start">
              <span className="absolute left-0 top-1 md:top-3 flex items-center pl-[1px]  md:pl-3">
                <button type="submit" title="Search" className="p-1 focus:outline-none">
                  <FaSearch className="bg-grey text-placeholder w-[10px] md:w-[14px] " />
                </button>
              </span>
              <input type="text" name="Search" placeholder="Search" value={search} className="w-full py-1 pl-5 md:py-3 md:px-10 text-sm md:text-md bg-grey rounded-md focus:outline-none placeholderStyles focus:bg-grey focus:custom-shadow text-primary" onChange={(e) => handleSearch(e.target.value)} />
            </div>
          </div>

          <div className="ml-auto flex">
            {/* navbar icons  */}
            <div className="flex items-center text-primary dropdown relative">
              <button className="nav-icon" title="Refresh" onClick={reloadPage}>
                {" "}
                <MdRefresh className="navbar-icon" />
              </button>
              {/* grid and list view icons  */}
              <button className={`${bookmarkView === "grid" ? "block " : "hidden"} flex justify-center items-center nav-icon`} title="List View" onClick={handleBookmarkView}>
                <BsViewList className="navbar-icon" />
              </button>
              <button className={`${bookmarkView === "grid" ? "hidden" : "block"} flex justify-center items-center nav-icon`} title="Grid View" onClick={handleBookmarkView}>
                <FiGrid className="navbar-icon" />
              </button>
              {/* light and darkmode icons  */}

              <button className={`${theme === "dark" ? "hidden" : "block"} flex justify-center items-center nav-icon`} title="Dark Mode" onClick={() => themeModeChange("dark")}>
                <MdOutlineDarkMode className="navbar-icon" />
              </button>
              <button className={`${theme !== "light" ? "block" : "hidden"} flex justify-center items-center nav-icon`} title="Light Mode" onClick={() => themeModeChange("light")}>
                <MdLightMode className="navbar-icon" />
              </button>
              {/* <button className="nav-icon dropdown-toggle" title="Settings" id="dropdownMenuButton1" aria-expanded="false" onClick={() => setDropModal(true)} ref={ref}>
              <IoSettingsOutline className="navbar-icon" />
            </button> */}
            </div>
            <div className="justify-end text-fill w-44 bg-white border-l p-2"></div>
          </div>

          {/* {dropModal && <DropModal ref={ref} btnRef={btnRef} logOut={logOut} />} */}
        </div>
      </header>
    </div>
  );
};

export default Navbar;