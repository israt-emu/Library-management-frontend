import React, { useState } from "react";

const NoticeItem = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div>
      <div
        className="p-2 bg-main items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
        onClick={() => setCollapse(!collapse)}
      >
        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          New
        </span>
        <span className="font-semibold mr-2 text-left flex-auto">
          Attention Library Members: Our library management website will be
          undergoing maintenance on Wednesday.
        </span>
        <svg
          className="fill-current opacity-75 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </div>
      {/* notice body  */}
      <div
        className={`p-4 w-3/4 transition-all duration-200 ${
          !collapse ? "hidden h-0" : "h-auto block"
        }`}
      >
        <p className="text-lg">
          February 8th from 9:00 AM to 5:00 PM. During this time, access to
          online resources, including the catalog and digital collections, will
          be unavailable. We apologize for any inconvenience and appreciate your
          understanding as we work to improve our website for you. If you have
          any questions, please contact us at [library contact information].
          Thank you."
        </p>
      </div>
    </div>
  );
};

export default NoticeItem;
