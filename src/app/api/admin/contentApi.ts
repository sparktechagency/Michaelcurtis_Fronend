// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const contentApi = createApi({
    reducerPath: "contentApi",
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

    tagTypes: ["content"],

    endpoints: (builder) => ({

        // about 

        aboutContentCreate: builder.mutation({
            query: (formData) => ({
                url: `/admin/pages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["content"]
        }),

        getAboutContent: builder.query({
            query: () => ({
                url: `/admin/pages/about`,
                method: "GET"
            }),
            providesTags: ["content"]
        }),

        // Methodology

        metholodgyContentCreate: builder.mutation({
            query: (formData) => ({
                url: `/admin/pages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["content"]
        }),

        getMetholodgyContent: builder.query({
            query: () => ({
                url: `/admin/pages/metholodgy`,
                method: "GET"
            }),
            providesTags: ["content"]
        }),


        // privacy 



        privacyContentCreate: builder.mutation({
            query: (formData) => ({
                url: `/admin/pages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["content"]
        }),

        getPrivacyContent: builder.query({
            query: () => ({
                url: `/admin/pages/privacy`,
                method: "GET"
            }),
            providesTags: ["content"]
        }),


        // privacy 



        termsContentCreate: builder.mutation({
            query: (formData) => ({
                url: `/admin/pages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["content"]
        }),

        getTermsContent: builder.query({
            query: () => ({
                url: `/admin/pages/privacy`,
                method: "GET"
            }),
            providesTags: ["content"]
        }),



    }),
});

export const { useAboutContentCreateMutation, useGetAboutContentQuery, useMetholodgyContentCreateMutation, useGetMetholodgyContentQuery, usePrivacyContentCreateMutation, useGetPrivacyContentQuery, useTermsContentCreateMutation, useGetTermsContentQuery } = contentApi;
