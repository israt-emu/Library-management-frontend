import React from "react";

const AdminCard = ({admin}) => {
  return (
    <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-100 dark:text-gray-800 shadow-md">
      <img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" />
      <div className="flex-1 my-4">
        <p className="text-lg font-semibold leading-snug">{admin?.name}</p>
        <p className="text-sm">{admin?.role.toUpperCase()}</p>
      </div>
      <div className="flex items-center justify-center p-3 space-x-3 border-t-2"></div>
    </div>
  );
};

export default AdminCard;
