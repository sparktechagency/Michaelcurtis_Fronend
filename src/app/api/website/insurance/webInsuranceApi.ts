// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const webInsuranceApi = createApi({
    reducerPath: "webInsuranceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),

    tagTypes: ["insurance"],

    endpoints: (builder) => ({
        // ✅ All active providers
        allInsuranceApi: builder.query({
            query: () => ({
                url: `/providers?include=policyCategories,states,statesCount&filter[status]=active`,
                method: "GET",
            }),
            providesTags: ["insurance"]
        }),

        // ✅ Search Providers with filters
        searchInsurance: builder.query({
            query: ({ query, selectedPrice, selectedPolicies, score, selectedState }) => ({
                url: `/providers?include=policyCategories,states,statesCount&filter[status]=active&filter[name]=${query}&filter[price]=${selectedPrice}&filter[policyCategories.slug]=${selectedPolicies}&filter[avg_overall_rating]=${score}&filter[states.name]=${selectedState}`,
                method: "GET",
            }),
            providesTags: ["insurance"]
        }),

        // ✅ Ranking Search
        rankingInsuranceSearch: builder.query({
            query: ({ score, selectedPrice, selectedState, selected }) => ({
                url: `/providers?include=policyCategories,states,statesCount&filter[status]=active&filter[policyCategories.slug]=${selected}&filter[avg_overall_rating]=${score}&filter[price]=${selectedPrice}&filter[states.name]=${selectedState}`,
                method: "GET",
            }),
            providesTags: ["insurance"]
        }),

        // ✅ Compare Providers by ID list
        compareProviders: builder.query({
            query: (ids: number[]) => {
                const params = new URLSearchParams();
                ids.forEach((id, index) => {
                    params.append(`provider_ids[${index}]`, id.toString());
                });

                return {
                    url: `/provider/compare?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["insurance"]
        }),

        webAllInsurance: builder.query({
            query: () => ({
                url: "/providers?include=policyCategories,states,statesCount&filter[status]=active",
                method: "GET"
            })
        }),
        webSearchApi: builder.query({
            query: (name) => ({
                url: `/search?search=${name}`,
                method: "GET"
            })
        }),

        mostReviewInsurance: builder.query({
            query: () => ({
                url: `/reviews/?include=user,provider&sort=overall_rating`,
                method: "GET"
            })
        })
    }),
});

// ✅ Export hooks
export const {
    useAllInsuranceApiQuery,
    useSearchInsuranceQuery,
    useRankingInsuranceSearchQuery,
    useCompareProvidersQuery,
    useWebSearchApiQuery,
    useMostReviewInsuranceQuery
} = webInsuranceApi;
