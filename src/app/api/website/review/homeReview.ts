// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const homeReview = createApi({
    reducerPath: "homeReview",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,

    }),

    tagTypes: ["review"],

    endpoints: (builder) => ({

        homePageAllReview: builder.query({
            query: () => ({
                url: `/reviews/?include=user,provider&sort=-id&per_page=10`,
                method: "GET"
            }),
            providesTags: ["review"]
        }),


    }),
});

export const {
    useHomePageAllReviewQuery

} = homeReview;
