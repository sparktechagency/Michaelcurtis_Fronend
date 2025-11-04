// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const webContentApi = createApi({
    reducerPath: "webContentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),

    tagTypes: ["content"],

    endpoints: (builder) => ({
        contentApi: builder.query({
            query: ({ pageName }) => ({
                url: `/user/pages/${pageName}`,
                method: "GET"
            }),
            providesTags: ["content"]
        }),
        webFaqApi: builder.query({
            query: () => ({
                url: "/user/faqs",
                method: "GET",
            }),
            providesTags: ["content"]
        }),

    }),
});

export const { useContentApiQuery, useWebFaqApiQuery } = webContentApi;
