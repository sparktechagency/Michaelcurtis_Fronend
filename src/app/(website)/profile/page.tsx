"use client"
import React, { useEffect } from 'react'
import PorfileCard from './PorfileCard'
import Cookies from "js-cookie";
const Page: React.FC = () => {
    useEffect(() => {
        const userToken = Cookies.get("user_token");
        if (!userToken) {
            window.location.href = "/auth/login"
        }
    }, [])
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <PorfileCard></PorfileCard>
        </div>
    )
}

export default Page