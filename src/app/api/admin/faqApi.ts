// redux/services/api.ts

import { FaqCreateApiResponseType, FaqCreatePayloadType, FaqDeleteApiPayloadType, FaqDeleteApiResponseType } from "@/utility/types/admin/faq/faqType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const faqApi = createApi({
    reducerPath: "faqApi",
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

    tagTypes: ["faq"],

    endpoints: (builder) => ({

        createFaq: builder.mutation<FaqCreateApiResponseType, FaqCreatePayloadType>({
            query: (formData) => ({
                url: `/admin/faqs`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["faq"]
        }),
        allFaq: builder.query({
            query: () => ({
                url: `/admin/faqs?sort=-created_at`,
                method: "GET"
            }),
            providesTags: ["faq"]
        }),

        singleFaq: builder.query({
            query: (id) => ({
                url: `/admin/faqs/${id}`,
                method: "GET"
            }),
            providesTags: ["faq"]
        }),

        faqUpdate: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/admin/faqs/${id}`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["faq"]
        }),

        faqDelete: builder.mutation<FaqDeleteApiResponseType, FaqDeleteApiPayloadType>({
            query: ({ id }) => ({
                url: `/admin/faqs/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["faq"]
        })


    }),
});

export const { useCreateFaqMutation, useAllFaqQuery, useFaqDeleteMutation, useFaqUpdateMutation, useSingleFaqQuery } = faqApi;
