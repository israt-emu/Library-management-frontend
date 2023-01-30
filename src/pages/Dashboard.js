import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import {userLoggedOut} from "../features/auth/authSlice";
import {useGetBookmarksQuery} from "../features/bookmark/bookmarkAPI";
import {loadingBookmarks, settingBookmarks, settingError} from "../features/bookmark/bookmarkSlice";
import {pathChange, resetSearch} from "../features/filter/filterSlice";
import {useGetStoresQuery} from "../features/store/storeApi";
import {loadingStores, settingStoreError, settingStores} from "../features/store/storeSlice";
import {jwtVerify} from "../utils/jwtVerify";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const theme = useSelector((state) => state?.theme?.themeMode);
  // const {_id: id} = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  //load bookmarks
  // const {data, isLoading, isError} = useGetBookmarksQuery({userId: id});
  // useEffect(() => {
  //   if (isLoading && !isError) {
  //     dispatch(loadingBookmarks());
  //   }
  //   if (!isLoading && isError) {
  //     dispatch(settingError("There was an error occured!"));
  //   }
  //   if (!isLoading && !isError) {
  //     if (data?.bookmarks?.length > 0) {
  //       dispatch(settingBookmarks(data?.bookmarks));
  //     } else if (data?.bookmarks?.length === 0) {
  //       dispatch(settingBookmarks([]));
  //     }
  //   }
  // }, [data, isLoading, isError, dispatch]);
  //load stores
  // const {data: storeData, isLoading: storeLoading, isError: storeError} = useGetStoresQuery({userId: id});
  // useEffect(() => {
  //   if (storeLoading && !storeError) {
  //     dispatch(loadingStores());
  //   }
  //   if (!storeLoading && storeError) {
  //     dispatch(settingStoreError("There was an error occured!"));
  //   }
  //   if (!storeLoading && !storeError) {
  //     if (storeData?.stores?.length > 0) {
  //       dispatch(settingStores(storeData?.stores));
  //     } else if (storeData?.stores?.length === 0) {
  //       dispatch(settingStores([]));
  //     }
  //   }
  // }, [storeData, storeLoading, storeError, dispatch]);
  ///
  useEffect(() => {
    dispatch(pathChange(location?.pathname));
    if (location?.pathname !== "/dashboard/search") {
      dispatch(resetSearch());
    }
  }, [location, dispatch]);
  //auth checking on route change
  // useEffect(() => {
  //   const jwtExpired = jwtVerify();
  //   if (jwtExpired) {
  //     dispatch(userLoggedOut());
  //     localStorage.clear();
  //   }
  // }, [location, dispatch]);

  // // closing navigation on clicking outside
  // const ref = useRef();
  // const btnRef = useRef();
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       !ref?.current?.contains(event.target) &&
  //       !btnRef?.current?.contains(event.target)
  //     ) {
  //       setDropModal(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  // }, [ref, btnRef]);
  return (
    <div className={`${theme === "dark" ? "theme-dark" : "theme-light"} bg-fill`}>
      <Navbar setToggle={setToggle} toggle={toggle} />
      <div className="flex justify-between">
        <div className={`h-screen fixed ${toggle ? "-left-96 md:left-0 w-14" : "left-0 w-44"} top-[52px]  shadow-md  z-50  transition-all duration-300 bg-main`}>
          {" "}
          <Sidebar toggle={toggle} setToggle={setToggle} />
        </div>
        <div className={`text-primary ${toggle ? " px-4 transition-all duration-300" : " transition-all duration-300 px-8"} h-screen mt-24 z-0`}>
          <Outlet />
        </div>
        <div className={`h-screen fixed top-[52px]  shadow-md w-44 z-50  transition-all duration-300 bg-main right-0`}></div>
      </div>
    </div>
  );
};

export default Dashboard;