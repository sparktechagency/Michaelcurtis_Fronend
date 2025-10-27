// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const metaDataApi = createApi({
    reducerPath: "metaDataApi",
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

    tagTypes: ["metadata"],

    endpoints: (builder) => ({
        createMetaData: builder.mutation({
            query: (payload) => ({
                url: `/meta-datas`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["metadata"]
        }),

        metaDataByPageName: builder.query({
            query: (pageName) => ({
                url: `/meta-datas/${pageName}`,
                method: "GET"
            }),
            providesTags: ["metadata"]
        }),

    }),
});

export const { useCreateMetaDataMutation, useMetaDataByPageNameQuery } = metaDataApi;
