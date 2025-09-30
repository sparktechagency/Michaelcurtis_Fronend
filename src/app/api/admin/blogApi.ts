// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers, { }) => {
            // Try to get tokens from localStorage
            const adminToken = Cookies.get("admin_token");
            const userToken = Cookies.get("user_token");

            if (adminToken) {
                headers.set("Authorization", `Bearer ${adminToken}`);
            } else if (userToken) {
                headers.set("Authorization", `Bearer ${userToken}`);
            }

            return headers;
        },
    }),

    tagTypes: ["blog"],

    endpoints: (builder) => ({

        createBlog: builder.mutation({
            query: (payload) => ({
                url: "/admin/blogs",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["blog"]
        }),

        allBlog: builder.query({
            query: () => ({
                url: "/admin/blogs/?include=user,policyCategories&sort=-created_at",
                method: "GET"
            }),
            providesTags: ["blog"]
        }),

        singleBlog: builder.query({
            query: (blogSlug) => ({
                url: `/admin/blogs/${blogSlug}`,
                method: "GET"
            }),
            providesTags: ["blog"]
        }),


        userBlogUpdate: builder.mutation({
            query: ({ blogSlug, payload }) => ({
                url: `/admin/blogs/${blogSlug}`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["blog"]
        }),

        blogStatusUpdate: builder.mutation({
            query: ({ blogSlug, payload }) => ({
                url: `/admin/blogs/${blogSlug}/status`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["blog"]
        }),

        blogDelete: builder.mutation({
            query: (slug) => ({
                url: `/admin/blogs/${slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["blog"]
        })



    }),
});

export const { useCreateBlogMutation, useAllBlogQuery, useSingleBlogQuery, useUserBlogUpdateMutation, useBlogStatusUpdateMutation, useBlogDeleteMutation } = blogApi;
