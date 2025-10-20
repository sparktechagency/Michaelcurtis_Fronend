// redux/services/api.ts
import { EmailVerifyApiPayload, EmailVerifyApiResponse, ForgetOtpVerifyApiResponse, LoginApiPayload, LoginApiResponse, NewPasswordSetApiPayload, NewPasswordSetApiRespone, OtpVerifyApiPayload, OtpVerifyApiResponse, OtpVeriryApiPayload, ProfileApiResponse, RegistrationApiPayload, RegistrationApiResponse } from "@/utility/types/authType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const authApi = createApi({
    reducerPath: "api",
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

    tagTypes: ["Profile"], // 👈 Define tag types here


    endpoints: (builder) => ({

        // registrationApi

        registrationApi: builder.mutation<RegistrationApiResponse, RegistrationApiPayload>({
            query: (payload) => ({
                url: `auth/register`,
                method: "POST",
                body: payload
            })
        }),

        // otp verify 

        otpVerify: builder.mutation({
            query: (payload) => ({
                url: `auth/verify `,
                method: "POST",
                body: payload
            })
        }),

        // resend otp 

        resendOtp: builder.mutation<OtpVerifyApiResponse, OtpVerifyApiPayload>({
            query: (payload) => ({
                url: `auth/resend-verification`,
                method: "POST",
                body: payload
            })
        }),

        // login api 

        loginOtp: builder.mutation<LoginApiResponse, LoginApiPayload>({
            query: (payload) => ({
                url: `auth/login`,
                method: "POST",
                body: payload
            })
        }),


        // forget password 

        emailVerify: builder.mutation<EmailVerifyApiResponse, EmailVerifyApiPayload>({
            query: (payload) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: payload
            })
        }),

        // verify password api 

        forgetOtpVerify: builder.mutation<ForgetOtpVerifyApiResponse, OtpVeriryApiPayload>({
            query: (payload) => ({
                url: `auth/verify-password-otp`,
                method: "POST",
                body: payload
            })
        }),

        forgetResendOtp: builder.mutation({
            query: (payload) => ({
                url: `auth/resend-verification`,
                method: "POST",
                body: payload
            })
        }),

        newPasswordSetApi: builder.mutation<NewPasswordSetApiRespone, NewPasswordSetApiPayload>({
            query: (paylod) => ({
                url: `/auth/reset-password-with-token`,
                method: "POST",
                body: paylod
            })
        }),


        adminProfile: builder.query<ProfileApiResponse, void>({
            query: () => ({
                url: `profile/me`,
                method: "GET"
            }),
            providesTags: ["Profile"]
        }),

        profileUpdate: builder.mutation({
            query: (payload) => ({
                url: `profile/update`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Profile"],
        }),

        passwordUpdate: builder.mutation({
            query: (payload) => ({
                url: `auth/update-password`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Profile"]
        }),

        userProfile: builder.query({
            query: () => ({
                url: "/profile/me?",
                method: "GET"
            }),
            providesTags: ["Profile"]
        })




    }),
});

export const { useRegistrationApiMutation, useOtpVerifyMutation, useResendOtpMutation, useLoginOtpMutation, useEmailVerifyMutation, useForgetOtpVerifyMutation, useNewPasswordSetApiMutation, useForgetResendOtpMutation, useAdminProfileQuery, useProfileUpdateMutation, usePasswordUpdateMutation, useUserProfileQuery } = authApi;
