// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const webBlogApi = createApi({
    reducerPath: "webBlogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),

    tagTypes: ["activity"],

    endpoints: (builder) => ({
        webAllBlog: builder.query({
            query: () => ({
                url: `/user/blogs`,
                method: "GET"
            })
        })
    }),
});

export const { useWebAllBlogQuery } = webBlogApi;
