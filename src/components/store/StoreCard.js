import React, {useEffect} from "react";
import bookMarkImg from "../../assets/images/bookmark2.jpg";
import {MdOutlineDelete} from "react-icons/md";
import Moment from "react-moment";
import {useDeleteStoreMutation} from "../../features/store/storeApi";
import {useDispatch, useSelector} from "react-redux";
import {setStoreInRedux} from "../../features/store/storeSlice";
const StoreCard = ({store, setError, setStoreModal}) => {
  const {url, title, createdAt, _id: id, thumbnail} = store || {};
  const [deleteStore, {data: deleteData, isLoading, isSuccess, error: deleteError}] = useDeleteStoreMutation();
  const {_id: userId} = useSelector((state) => state?.auth?.user);

  const handleDeleteStore = () => {
    deleteStore({id: id, userId});
  };
  //setting error when error occured
  useEffect(() => {
    if (isSuccess && deleteData?.status === "success") {
      setError("");
    } else if (deleteError && !isSuccess) {
      setError("Sorry! There was an error occured on deleting the store..");
    }
  }, [isSuccess, deleteData, deleteError, setError]);
  //
  const dispatch = useDispatch();
  const openStoreModal = () => {
    dispatch(setStoreInRedux(store));
    setStoreModal(true);
  };
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg border border-border h-full">
        <div className="cursor-pointer" onClick={openStoreModal}>
          <img className="w-full" src={thumbnail ? `data:image/jpeg;base64,${thumbnail}` : bookMarkImg} alt="book mark" />
          <div className="px-6 pt-2">
            <h2 className="font-bold text-xl mb-2">{title}</h2>
          </div>
          <div className="px-6 ">
            {" "}
            <p>{url}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div>
            <button className="hover:bg-link_hover transition-all p-1 rounded-full" title="Delete permanently!" onClick={handleDeleteStore} disabled={isLoading}>
              <MdOutlineDelete className="w-6 h-6" />
            </button>
          </div>
          <div>
            {" "}
            <span className="inline-block bg-main rounded px-3 py-1 text-sm font-semibold text-primary mr-2 mb-2">
              {" "}
              <Moment format="D MMM YYYY" withTitle>
                {createdAt}
              </Moment>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
