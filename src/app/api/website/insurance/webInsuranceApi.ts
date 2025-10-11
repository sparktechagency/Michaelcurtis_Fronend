// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const webInsuranceApi = createApi({
    reducerPath: "webInsuranceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),

    tagTypes: ["insurance"],

    endpoints: (builder) => ({
        allInsuranceApi: builder.query({
            query: () => ({
                url: `/providers?filter[status]=active`,
                method: "GET"
            })
        }),

        searchInsurance: builder.query({
            query: ({ query, selectedPolicies, score, selectedPrice, selectedState }) => ({
                url: `/providers?include=policyCategories,states,statesCount&filter[name]=${query}&filter[policyCategories.slug]=${selectedPolicies}&filter[avg_overall_rating]=${score}&filter[price]=${selectedPrice}&filter[states.name]=${selectedState} `,
                method: "GET"
            })
        }),

        rankingInsuranceSearch: builder.query({
            query: ({ score, selectedPrice, selectedState, selected }) => ({
                url: `/providers?include=policyCategories,states,statesCount&filter[policyCategories.slug]=${selected}&filter[avg_overall_rating]=${score}&filter[price]=${selectedPrice}&filter[states.name]=${selectedState} `,
                method: "GET"
            })
        })
    }),
});

export const { useAllInsuranceApiQuery, useSearchInsuranceQuery, useRankingInsuranceSearchQuery } = webInsuranceApi;
