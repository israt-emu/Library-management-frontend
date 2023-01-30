import React from "react";
import {useSelector} from "react-redux";

const StoreDetailsModal = ({setStoreModal, storeModal}) => {
  const store = useSelector((state) => state?.store?.store);
  const {htmlContent, url} = store || {};
  return (
    <>
      {storeModal ? (
        <div className="mt-12">
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none transition-all overflow-x-hidden">
            <div className="relative w-full my-6 mx-auto max-w-3xl bg-modalBg p-3 shadow-lg rounded-lg">
              {/*content*/}
              <h3 className="text-primary my-3 text-xl font-semibold">HTML Content of the page '{url}'</h3>
              <textarea id="message" rows="8" class="block p-2.5 w-full text-sm text-primary bg-modalBg rounded-lg border border-gray-700 focus:border-outline" disabled>
                {htmlContent}
              </textarea>
              <div className="text-right mt-2">
                <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setStoreModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="bg-opacity-30 fixed inset-0 z-40 bg-black transition-all"></div>
        </div>
      ) : null}
    </>
  );
};

export default StoreDetailsModal;
