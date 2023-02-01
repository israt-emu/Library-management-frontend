import React from "react";
import ReactImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { useGetBookDetailsQuery } from "../../features/book/bookAPI";
import "react-image-gallery/styles/css/image-gallery.css";

const BookDetails = () => {
  const { id } = useParams();
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  const { data: bookDetails } = useGetBookDetailsQuery({ id: id });
  const {
    name,
    writer,
    publications,
    pdfLink,
    totalViews,
    status,
    edition,
    bookId,
    category,
    description,
    totalStock,
    remainingStock,
    bookLocation,
    createdAt,
  } = bookDetails?.book || {};
  console.log(id, bookDetails);
  return (
    <div className=" mx-auto space-y-12 grid grid-cols-2">
      <article className="space-y-8 text-gray-900">
        <div className="space-y-6 px-3">
          <ReactImageGallery
            showNav={false}
            showPlayButton={false}
            items={images}
          />
        </div>
      </article>
      <div className="pl-4">
        <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
          {name}
        </h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-600">
          <div className="flex items-center md:space-x-2">
            <img
              src="https://source.unsplash.com/75x75/?portrait"
              alt=""
              className="w-4 h-4 border rounded-full bg-gray-500 border-gray-300"
            />
            <p className="text-sm my-2">{writer} </p>
          </div>
          <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
            {createdAt} • {totalViews} views
          </p>
        </div>
        <div className="flex flex-wrap py-6  space-x-2 border-t border-dashed border-gray-600">
  
          <a
            rel="noopener noreferrer"
            href="#"
            className="px-3 py-1 rounded-sm hover:underline bg-main text-gray-50"
          >
            {status}
          </a>
        </div>
        <div className="flex flex-wrap py-6 border-gray-600">
          <a
            rel="noopener noreferrer"
            href="#"
            className="px-3 py-1 rounded-sm hover:underline bg-blue-600 text-gray-50"
          >
            {category}
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            className="px-3 py-1 rounded-sm hover:underline bg-blue-600 text-gray-50"
          >
            {status}
          </a>
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Book Description</h4>
          <ul className="ml-4 space-y-1 list-disc">
            <li>
              <a rel="noopener noreferrer" href="#" className="hover:underline">
                Nunc id magna mollis
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#" className="hover:underline">
                Duis molestie, neque eget pretium lobortis
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#" className="hover:underline">
                Mauris nec urna volutpat, aliquam lectus sit amet
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;