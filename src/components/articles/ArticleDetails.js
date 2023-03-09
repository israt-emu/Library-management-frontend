import React from "react";
import {useParams} from "react-router";
import {useGetArticleDetailsQuery} from "../../features/article/articleApi";

const ArticleDetails = () => {
  const {id} = useParams();
  const {data: articleDetails} = useGetArticleDetailsQuery({id: id, edit: false});
  const {title, authorName, description, image} = articleDetails?.article || {};
  console.log(articleDetails);
  return (
    <div>
      <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800">
        <div className="flex flex-col  mx-auto overflow-hidden rounded">
          <img src={image} alt="not available" className="w-full h-60 sm:h-96 bg-gray-500" />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6  sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50">
            <div className="space-y-2">
              <p className="inline-block text-2xl font-semibold sm:text-3xl">{title}</p>
              <p className="text-xs text-gray-600">
                By
                <p className="text-xs hover:underline ml-2">{authorName}</p>
              </p>
            </div>
            <div className="text-gray-800 text-xl">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
