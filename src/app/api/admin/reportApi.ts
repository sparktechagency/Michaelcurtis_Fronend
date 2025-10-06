// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const reportApi = createApi({
    reducerPath: "reportApi",
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

    tagTypes: ["report"],

    endpoints: (builder) => ({
        userGrowthReport: builder.query({
            query: ({ timeframe }) => ({
                url: `/admin/reports-analytics/charts?period=${timeframe}`,
                method: "GET"
            }),
            providesTags: ["report"]
        }),

        recentReport: builder.query({
            query: () => ({
                url: `/admin/reports-analytics/recent-reports?sort=-created_at`,
                method: "GET"
            }),
            providesTags: ['report']
        }),


        reportDownload: builder.query({
            query: (id) => ({
                url: `/admin/reports-analytics/download/${id}`,
                method: "GET"
            })
        })

    })
});

export const { useUserGrowthReportQuery, useRecentReportQuery, useLazyReportDownloadQuery } = reportApi;
