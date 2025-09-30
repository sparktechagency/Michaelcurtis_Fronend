// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const insuranceApi = createApi({
    reducerPath: "insuranceApi",
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

        createInsurance: builder.mutation({
            query: (formData) => ({
                url: `/providers`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["insurance"]
        }),
        allProvider: builder.query({
            query: () => ({
                url: `/providers?include=policyCategories,states&filter[status]=active&sort=-created_at`,
                method: "GET"
            })
        })



    }),
});

export const { useCreateInsuranceMutation, useAllProviderQuery } = insuranceApi;
