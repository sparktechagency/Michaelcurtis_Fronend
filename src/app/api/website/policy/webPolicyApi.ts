// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const webPolicyApi = createApi({
    reducerPath: "webPolicyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),

    tagTypes: ["web-policy"],

    endpoints: (builder) => ({
        webAllPolicy: builder.query({
            query: () => ({
                url: `/user/policies/`,
                method: "GET"
            })
        }),
        singlePolicyDetails: builder.query({
            query: (slug) => ({
                url: `user/policies/${slug}?include=statesCount`,
                method: "GET"
            })
        })
    }),
});

export const { useWebAllPolicyQuery, useSinglePolicyDetailsQuery } = webPolicyApi;
