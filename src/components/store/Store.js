import React, {useState} from "react";
import {useSelector} from "react-redux";
import SkeletonLoader from "../bookMark/SkeletonLoader";
import Error from "../ui/Error";
import StoreCard from "./StoreCard";
import StoreDetailsModal from "./StoreDetailsModal";
import StoreFlatCard from "./StoreFlatCard";

const Store = () => {
  // const [error, setError] = useState("");
  // const [storeModal, setStoreModal] = useState(false);
  // const {stores, isLoading, isError, error: storeError} = useSelector((state) => state?.store?.storeData);

  // const {bookmarkView} = useSelector((state) => state?.bookmark);

  // // decide what to render
  // let content = null;

  // if (isError) {
  //   content = (
  //     <div className="mt-10">
  //       <Error message={storeError} />
  //     </div>
  //   );
  // }
  // if (!isError && isLoading) {
  //   content = (
  //     <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
  //       <SkeletonLoader />
  //       <SkeletonLoader />
  //       <SkeletonLoader />
  //     </div>
  //   );
  // }
  // if (!isError && !isLoading && stores?.length > 0 && bookmarkView === "grid") {
  //   content = (
  //     <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 mt-8 pb-8 mx-auto">
  //       {stores?.map((s) => (
  //         <StoreCard key={s?._id} store={s} setError={setError} setStoreModal={setStoreModal} />
  //       ))}
  //     </div>
  //   );
  // }
  // if (!isError && !isLoading && stores?.length > 0 && bookmarkView === "list") {
  //   content = (
  //     <div className="grid grid-cols-1 justify-center items-center gap-3 mt-8 pb-8 mx-auto">
  //       {stores?.map((s) => (
  //         <StoreFlatCard key={s?._id} store={s} setError={setError} setStoreModal={setStoreModal} />
  //       ))}
  //     </div>
  //   );
  // }
  // if (!isError && !isLoading && stores?.length === 0) {
  //   content = <div className="grid grid-cols-1 justify-center items-center gap-3 mt-8 pb-8">No Store Card Found!</div>;
  // }

  return (
    <div className="h-full overflow-y-scroll no-scrollbar w-full">
      {/* {error && (
        <div className="w-10/12 mx-auto">
          <Error message={error} />
        </div>
      )}
      {content}
      {storeModal && <StoreDetailsModal storeModal={storeModal} setStoreModal={setStoreModal} />} */}
    </div>
  );
};

export default Store;
