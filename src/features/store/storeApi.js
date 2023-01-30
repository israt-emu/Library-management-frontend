import {apiSlice} from "../api/apiSlice";

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: (data) => ({
        url: `/store/stores`,
        method: "POST",
        body: data,
      }),
    }),

    addStore: builder.mutation({
      query: (data) => ({
        url: `store/addStore`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          const data = result?.data?.store;

          // update bookmark cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getStores", {userId: arg?.userId}, (draft) => {
                draft?.stores?.push(data);
                console.log(JSON.stringify(draft));
                console.log(data);
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    deleteStore: builder.mutation({
      query: (data) => ({
        url: `/store/deleteStore`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({id, userId}, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update bookmark cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getStores", {userId}, (draft) => {
                const filterDraft = draft?.stores?.filter((d) => d._id !== id);
                return {
                  ...draft,
                  stores: filterDraft,
                };
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
  }),
});

export const {useAddStoreMutation, useGetStoresQuery, useDeleteStoreMutation} = storeApi;
