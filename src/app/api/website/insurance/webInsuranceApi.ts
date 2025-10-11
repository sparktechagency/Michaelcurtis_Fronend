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
        })
    }),
});

export const { useAllInsuranceApiQuery } = webInsuranceApi;
