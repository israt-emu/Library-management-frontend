import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import SkeletonLoader from "../bookMark/SkeletonLoader";
import Error from "../ui/Error";
import SearchCard from "./SearchCard";

const ShowSearchedCard = () => {
  // const [search, setSearch] = useState("");
  // const [searchData, setSearchData] = useState([]);
  // const searchText = useSelector((state) => state?.filter?.searchText);

  // const {bookmarkView, bookmarkData} = useSelector((state) => state?.bookmark);
  // const {stores, isLoading: storeLoading, isError: storeIsError} = useSelector((state) => state?.store?.storeData);
  // //
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (searchText !== "") {
  //     setSearch(searchText);
  //     if (!storeLoading && !bookmarkData?.isLoading && !storeIsError && !bookmarkData?.isError && (bookmarkData?.bookmarks?.length > 0 || stores?.length > 0)) {
  //       //filtering bookmark by search
  //       const filteredBookmark = bookmarkData?.bookmarks?.filter((b) => b?.group.toLowerCase().includes(searchText.toLowerCase()) || b?.title.toLowerCase().includes(searchText.toLowerCase()) || b?.url.toLowerCase().includes(searchText.toLowerCase()));
  //       //filtering store by search
  //       const filteredStore = stores?.filter((s) => s?.group.toLowerCase().includes(searchText.toLowerCase()) || s?.title.toLowerCase().includes(searchText.toLowerCase()) || s?.url.toLowerCase().includes(searchText.toLowerCase()));
  //       setSearchData([...filteredBookmark, ...filteredStore]);
  //     }
  //   } else if (searchText === "") {
  //     setSearchData([]);
  //     navigate("/dashboard/bookmarks");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchText, storeLoading, storeIsError, bookmarkData?.isLoading, bookmarkData?.isError, stores, bookmarkData?.bookmarks]);
  // //let decide what to render
  // let content = null;

  // if (bookmarkData?.isError || storeIsError) {
  //   content = (
  //     <div className="mt-10">
  //       <Error message="There was an error occured" />
  //     </div>
  //   );
  // }
  // if ((!bookmarkData?.isError || !storeIsError) && (bookmarkData?.isLoading || storeLoading)) {
  //   content = (
  //     <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
  //       <SkeletonLoader />
  //       <SkeletonLoader />
  //       <SkeletonLoader />
  //     </div>
  //   );
  // }
  // if ((!bookmarkData?.isError || !storeIsError) && (!bookmarkData?.isLoading || !storeLoading) && searchData?.length > 0) {
  //   content = (
  //     <div className="grid grid-cols-1 md:grid-cols-3 justify-around items-center gap-4 mt-8 pb-8 w-11/12 mx-auto">
  //       {searchData?.map((d) => (
  //         <SearchCard key={d?._id} cardContent={d} search={search} />
  //       ))}
  //     </div>
  //   );
  // }
  // if ((!bookmarkData?.isError || !storeIsError) && (!bookmarkData?.isLoading || !storeLoading) && searchData?.length === 0) {
  //   content = (
  //     <div className="flex justify-center items-center mt-12">
  //       <h1>No Mathing Result Found!!</h1>
  //     </div>
  //   );
  // }

  return <div className="h-full bg-fill overflow-y-scroll no-scrollbar">Search</div>;
};

export default ShowSearchedCard;
