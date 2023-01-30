import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGetGroupsQuery} from "../../features/bookmark/bookmarkAPI";
import BookmarkCard from "../bookMark/BookmarkCard";
import BookmarkFlatCard from "../bookMark/BookmarkFlatCard";
import SkeletonLoader from "../bookMark/SkeletonLoader";
import Error from "../ui/Error";

const Archive = () => {
  // const {bookmarkView, bookmarkData} = useSelector((state) => state.bookmark);
  // const {_id: id} = useSelector((state) => state?.auth?.user);
  // const {data: groupData} = useGetGroupsQuery({state: "archive", userId: id});
  // const [bookmarksByState, setBookmarksByState] = useState([]);

  // //filtering by state
  // useEffect(() => {
  //   if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarkData?.bookmarks?.length > 0) {
  //     const filter = bookmarkData?.bookmarks?.filter((b) => b?.state === "archive");
  //     setBookmarksByState(filter);
  //   }
  // }, [bookmarkData?.bookmarks, bookmarkData?.isLoading, bookmarkData?.isError]);
  // // decide what to render
  // let content = null;
  // if (bookmarkData?.isError) {
  //   content = (
  //     <div className="mt-10">
  //       <Error message={bookmarkData?.error} />
  //     </div>
  //   );
  // }
  // if (!bookmarkData?.isError && bookmarkData?.isLoading) {
  //   content = (
  //     <div className="grid grid-cols-3 mt-4">
  //       <SkeletonLoader />
  //       <SkeletonLoader />
  //       <SkeletonLoader />
  //     </div>
  //   );
  // }
  // if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarksByState?.length > 0 && bookmarkView === "grid") {
  //   content = groupData?.groups?.map((group, i) => (
  //     //filtering by group
  //     <div className="" key={i}>
  //       <h1 className="border-b-2 pb-2 w-1/6">{group.toUpperCase()}</h1>
  //       {/* // */}
  //       <div className="grid grid-cols-3 justify-center items-center gap-4 mt-8 pb-8">{bookmarksByState?.map((b) => (b?.group === group ? <BookmarkCard key={b?._id} bookmark={b} currentState="archive" /> : null))}</div>
  //     </div>
  //   ));
  // }
  // if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarksByState?.length > 0 && bookmarkView === "list") {
  //   content = groupData?.groups?.map((group, i) => (
  //     ////filtering by group
  //     <div className="" key={i}>
  //       <h1 className="border-b-2 pb-2 w-1/6">{group.toUpperCase()}</h1>
  //       {/* // */}
  //       <div className="grid grid-cols-1 justify-center items-center gap-3 mt-8 pb-8">{bookmarksByState?.map((b) => (b?.group === group ? <BookmarkFlatCard key={b?._id} bookmark={b} currentState="archive" /> : null))}</div>
  //     </div>
  //   ));
  // }

  // if (!bookmarkData?.isError && !bookmarkData?.isLoading && bookmarksByState?.length === 0) {
  //   content = (
  //     <div className="grid grid-cols-3 justify-center items-center gap-4 mt-12 ">
  //       <h1>No bookmark Found</h1>
  //     </div>
  //   );
  // }
  return <section className="overflow-y-scroll no-scrollbar h-full"></section>;
};

export default Archive;
