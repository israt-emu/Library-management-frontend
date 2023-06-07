import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useGetArticlesQuery, useGetLatestArticlesQuery, useGetPopularArticlesQuery} from "../../features/article/articleApi";
import CardSkeletonLoader from "../ui/CardSkeletonLoader";
import Error from "../ui/Error";
import SidebarArticleCard from "./SidebarArticleCard";
import SingleArticles from "./SingleArticles";

const Articles = () => {
  const [active, setActive] = useState("latest");
  const {data: articlesData, isError, error, isLoading} = useGetArticlesQuery();
  const {data: latestArticles} = useGetLatestArticlesQuery();
  const {data: popularArticles} = useGetPopularArticlesQuery();
  console.log(articlesData);

  let content = null;

  if (isError) {
    content = (
      <div className="mt-10">
        <Error message={error} />
      </div>
    );
  }
  if (!isError && isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
        <CardSkeletonLoader />
        <CardSkeletonLoader />
      </div>
    );
  }
  if (!isError && !isLoading && articlesData?.article?.length > 0) {
    content = (
      <div>
        <div className="grid grid-cols-2 space-y-3 space-x-2">
          {articlesData?.article?.map((b) => (
            <SingleArticles data={b} />
          ))}
        </div>
      </div>
    );
  }
  if (!isError && !isLoading && articlesData?.article?.length === 0) {
    content = <div className="grid grid-cols-1 justify-center items-center gap-4 mt-8 pb-8 w-11/12 mx-auto">No Articles Found!</div>;
  }
  return (
    <div>
      <section className="px-5 py-10  text-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="font-bold my-4 text-primary">Articles</h1>
          <div>
            <Link to={"/dashboard/addarticle"}>
              <button className="inline-block bg-second rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 text-sidebar_text">Add Article</button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
          <div className=" py-2 xl:col-span-9 lg:col-span-9 md:hidden lg:block  ">{content}</div>

          <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block text-primary">
            <div className="mb-8 space-x-5 border-b-2 border-opacity-10 border-blue-600">
              <button type="button" className={`pb-5 text-xs font-bold uppercase border-b-2   ${active === "latest" ? "text-primary border-second" : "border-transparent text-gray-400"}`} onClick={() => setActive("latest")}>
                Latest
              </button>
              <button type="button" className={`pb-5 text-xs font-bold uppercase border-b-2   ${active === "popular" ? "text-primary border-second" : "border-transparent text-gray-400"}`} onClick={() => setActive("popular")}>
                Popular
              </button>
            </div>
            {/* //sidebar latest and popular articles  */}
            <div className="flex flex-col divide-y divide-gray-300">
              {/* // */}
              {active === "latest" ? latestArticles?.articles?.map((a, i) => <SidebarArticleCard key={i} article={a} />) : null}
              {/* // */}
              {active === "popular" ? popularArticles?.articles?.map((a, i) => <SidebarArticleCard key={i} article={a} />) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
