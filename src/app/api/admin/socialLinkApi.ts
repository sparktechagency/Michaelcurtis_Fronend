// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const socialLinkApi = createApi({
    reducerPath: "socialLinkApi",
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

    tagTypes: ["social"],

    endpoints: (builder) => ({
        storeSocialMedial: builder.mutation({
            query: (payload) => ({
                url: `/admin/social-media-settings`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["social"]
        }),
        getSocialMediaLink: builder.query({
            query: () => ({
                url: "/social-media-settings",
                method: "GET"
            })
        })
    }),
});

export const { useStoreSocialMedialMutation, useGetSocialMediaLinkQuery } = socialLinkApi;
