// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const webUserApi = createApi({
    reducerPath: "webUserApi",
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

    tagTypes: ["user"],

    endpoints: (builder) => ({
        userProfile: builder.query({
            query: () => ({
                url: `/profile/me?`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        userProfileUpdate: builder.mutation({
            query: (formData) => ({
                url: `/profile/update`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["user"]
        }),
        userPasswordUpdate: builder.mutation({
            query: (payload) => ({
                url: `/auth/update-password`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["user"]
        }),
        userReview: builder.query({
            query: () => ({
                url: "/reviews/?include=user,provider&sort=-id",
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        userReviewDelete: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        })

    }),
});

export const {
    useUserProfileQuery,
    useUserProfileUpdateMutation,
    useUserPasswordUpdateMutation,
    useUserReviewQuery,
    useUserReviewDeleteMutation
} = webUserApi;
