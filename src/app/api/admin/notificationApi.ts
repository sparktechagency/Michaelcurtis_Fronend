// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const notificationApi = createApi({
    reducerPath: "notification",
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

    tagTypes: ["insurance"],

    endpoints: (builder) => ({

        sendNotification: builder.mutation({
            query: (formData) => ({
                url: `/admin/notifications`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["insurance"]
        }),

        allNotification: builder.query({
            query: () => ({
                url: "/admin/notifications?include=sender&sort=-created_at",
                method: "GET"
            })
        })




    }),
});

export const { useSendNotificationMutation, useAllNotificationQuery } = notificationApi;
