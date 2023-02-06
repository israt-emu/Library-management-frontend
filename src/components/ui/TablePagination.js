import React, {useEffect, useState} from "react";
import {GrFormPrevious} from "react-icons/gr";
import {GrFormNext} from "react-icons/gr";

const TablePagination = ({currentPage, totalPage, setCurrentPage}) => {
  const [buttonNum, setButtonNum] = useState(0);
  useEffect(() => {
    if (totalPage > 4) {
      setButtonNum(4);
    } else {
      setButtonNum(totalPage);
    }
  }, [totalPage]);
  const handlePage = (num) => {
    setCurrentPage(num);
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 lg:px-0 flex items-center gap-2 justify-end">
        <button className="px-1 py-1 rounded hover:bg-white disabled:cursor-not-allowed" disabled={currentPage === 1} onClick={() => handlePage(currentPage - 1)} title="Previous">
          <GrFormPrevious />
        </button>
        {[...Array(buttonNum)?.keys()].map((num, i) => (
          <div key={i} className={`${currentPage === num + 1 ? "bg-second text-white" : "bg-white text-second"}  px-2 py-[2px] rounded cursor-pointer text-sm`} onClick={() => handlePage(num + 1)}>
            {num + 1}
          </div>
        ))}
        <button className="px-1 py-1 rounded hover:bg-white disabled:cursor-not-allowed" disabled={currentPage === totalPage} onClick={() => handlePage(currentPage + 1)} title="Next">
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
