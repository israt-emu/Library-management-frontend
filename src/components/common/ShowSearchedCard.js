import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useGetSearchedBooksQuery} from "../../features/book/bookAPI";
import CardSkeletonLoader from "../ui/CardSkeletonLoader";
import Error from "../ui/Error";
import SearchCard from "./SearchCard";

const ShowSearchedCard = () => {
  const [search, setSearch] = useState("");
  // const [searchData, setSearchData] = useState([]);
  const [skip, setSkip] = useState(true);

  const searchText = useSelector((state) => state?.filter?.searchText);
  const {data, isLoading, isError} = useGetSearchedBooksQuery({search: search}, {skip: skip}) || {};
  //
  const navigate = useNavigate();
  useEffect(() => {
    if (searchText !== "") {
      setSearch(searchText);
      setSkip(false);
    } else if (searchText === "") {
      navigate("/dashboard/books");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  //let decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
        <CardSkeletonLoader />
        <CardSkeletonLoader />
        <CardSkeletonLoader />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div className="mt-10">
        <Error message="There was an error occured" />
      </div>
    );
  }
  if (!isLoading && !isError && data?.books?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 justify-around items-center gap-4 mt-8 pb-8 w-11/12 mx-auto">
        {data?.books?.map((d) => (
          <SearchCard key={d?._id} cardContent={d} search={search} />
        ))}
      </div>
    );
  }
  if (!isLoading && !isError && data?.books?.length === 0) {
    content = (
      <div className="flex justify-center items-center mt-12">
        <h1>No Mathing Result Found!!</h1>
      </div>
    );
  }

  return <div className="h-full bg-fill overflow-y-scroll no-scrollbar">{content}</div>;
};

export default ShowSearchedCard;
