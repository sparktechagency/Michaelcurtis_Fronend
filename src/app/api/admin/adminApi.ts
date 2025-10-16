// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const adminApi = createApi({
    reducerPath: "adminApi",
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

    tagTypes: ["activity"],

    endpoints: (builder) => ({

        adminActivity: builder.query({
            query: () => ({
                url: "/admin/dashboard/state",
                method: "GET"
            }),
            providesTags: ["activity"]
        }),

        recentActivity: builder.query({
            query: () => ({
                url: `/admin/dashboard/recent-activity`,
                method: "GET"
            })
        }),

        adminPasswordUpdate: builder.mutation({
            query: (payload) => ({
                url: `/auth/update-password`,
                method: "POST",
                body: payload
            })
        })



    }),
});

export const { useAdminActivityQuery, useRecentActivityQuery, useAdminPasswordUpdateMutation } = adminApi;
