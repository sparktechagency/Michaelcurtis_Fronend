// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const policyApi = createApi({
    reducerPath: "policyApi",
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

    tagTypes: ["policy"],

    endpoints: (builder) => ({

        allPolicy: builder.query({
            query: () => ({
                url: `/admin/policies?sort=-created_at`,
                method: "GET"
            }),
            providesTags: ["policy"]
        }),
        createPolicy: builder.mutation({
            query: (formData) => ({
                url: `/admin/policies`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["policy"]
        }),



        singlePolicy: builder.query({
            query: (policyId) => ({
                url: `/admin/policies/${policyId}`,
                method: "GET"
            }),
            providesTags: ["policy"]
        }),

        policyDelete: builder.mutation({
            query: (slug) => ({
                url: `/admin/policies/${slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["policy"]
        }),

        policyUpdate: builder.mutation({
            query: ({ policySlug, formData }) => ({
                url: `/admin/policies/${policySlug}`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["policy"]
        })

    }),
});

export const { useAllPolicyQuery, useCreatePolicyMutation, useSinglePolicyQuery, usePolicyDeleteMutation, usePolicyUpdateMutation } = policyApi;
