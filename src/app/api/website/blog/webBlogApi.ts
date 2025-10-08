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
                url: `/user/blogs?include=user,policyCategories`,
                method: "GET"
            }),
            providesTags: ["activity"]
        }),
        webSingleBlog: builder.query({
            query: (slug) => ({
                url: `/user/blogs/${slug}`,
                method: "GET"
            })
        })
    }),
});

export const { useWebAllBlogQuery, useWebSingleBlogQuery } = webBlogApi;
