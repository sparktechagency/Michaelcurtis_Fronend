"use client"

import React, { useEffect } from 'react'
import FaqList from './FaqList'


import Cookies from "js-cookie";
const Page: React.FC = () => {
    useEffect(() => {
        const adminToken = Cookies.get("admin_token"); // ✅ check inside useEffect
        if (!adminToken) {
            window.location.href = "/admin/login";
        }
    }, []);
    return (
        <div>
            <FaqList></FaqList>
        </div>
    )
}

export default Page