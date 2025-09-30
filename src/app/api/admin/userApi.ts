// redux/services/api.ts

import { UserDeleteApiPayload, UserDeleteApiResponse } from "@/utility/types/admin/user/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const userApi = createApi({
    reducerPath: "userApi",
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

        allUser: builder.query({
            query: () => ({
                url: `admin/users?include=roles`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),

        singleUser: builder.query({
            query: (userId) => ({
                url: `/admin/users/${userId}`
            }),
            providesTags: ["user"]
        }),

        userRoleUpdate: builder.mutation({
            query: ({ userId, payload }) => ({
                url: `/admin/users/${userId}/assign-role`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["user"]
        }),

        userDelete: builder.mutation<UserDeleteApiResponse, UserDeleteApiPayload>({
            query: ({ userId }) => ({
                url: `/admin/users/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        }),

        userStatusUpdate: builder.mutation({
            query: ({ userId, payload }) => ({
                url: `/admin/users/${userId}/status`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["user"]
        })







    }),
});

export const { useAllUserQuery, useSingleUserQuery, useUserRoleUpdateMutation, useUserDeleteMutation, useUserStatusUpdateMutation } = userApi;
