// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
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

    tagTypes: ["review"],

    endpoints: (builder) => ({

        getAllReview: builder.query({
            query: () => ({
                url: `/reviews/?include=user,provider&sort=-id&per_page=10`,
                method: "GET"
            }),
            providesTags: ["review"]
        }),
        singleReview: builder.query({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}`,
                method: "GET"
            }),
            providesTags: ["review"]
        }),

        reviewStatusUpdate: builder.mutation({
            query: ({ formData, reviewId }) => ({
                url: `/reviews/${reviewId}/status`,
                method: "POST",
                body: formData

            }),
            invalidatesTags: ["review"]
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["review"]
        }),
        reviewByInsuranceSlug: builder.query({
            query: (slug) => ({
                url: `/providers/${slug}/reviews`,
                method: "GET"
            })
        }),

        postInsurance: builder.mutation({
            query: (payload) => ({
                url: `/reviews/`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["review"]
        })



    }),
});

export const { useGetAllReviewQuery, useSingleReviewQuery, useReviewStatusUpdateMutation, useDeleteReviewMutation, useReviewByInsuranceSlugQuery, usePostInsuranceMutation } = reviewApi;
