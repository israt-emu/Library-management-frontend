import React from "react";
import { useState } from "react";
import NoticeItem from "./NoticeItem";

const Notice = () => {
  return (
    <div>
      <h1 className="font-bold my-4"> Notice</h1>

      <div>
        <div className="  py-4 lg:px-4 flex flex-col space-y-3">
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
          <NoticeItem />
        </div>
      </div>
    </div>
  );
};

export default Notice;
