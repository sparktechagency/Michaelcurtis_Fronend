// redux/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const contactApi = createApi({
    reducerPath: "contactApi",
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

    tagTypes: ["contact"],

    endpoints: (builder) => ({
        allContact: builder.query({
            query: () => ({
                url: `/contacts`,
                method: "GET"
            }),
            providesTags: ["contact"]
        }),
        deleteContactApi: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["contact"]
        }),
        contactRead: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}/mark-as-read`,
                method: "PUT",
            }),
            invalidatesTags: ["contact"]
        }),

        singleContact: builder.query({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "GET"
            })
        }),

        sendContactInfo: builder.mutation({
            query: (formData) => ({
                url: `/contacts`,
                method: "POST",
                body: formData

            })
        })

    }),
});

export const { useAllContactQuery, useDeleteContactApiMutation, useContactReadMutation, useSingleContactQuery, useSendContactInfoMutation } = contactApi;
