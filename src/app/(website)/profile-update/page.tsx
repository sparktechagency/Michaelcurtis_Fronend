"use client"
import React, { useEffect } from 'react'
import ProfileUpdateFrom from './ProfileUpdateFrom'
import Cookies from "js-cookie";
const Page: React.FC = () => {
    useEffect(() => {
        const userToken = Cookies.get("user_token");
        if (!userToken) {
            window.location.href = "/auth/login"
        }
    }, [])
    return (
        <div>
            <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
                <ProfileUpdateFrom></ProfileUpdateFrom>
            </div>
        </div>
    )
}

export default Page