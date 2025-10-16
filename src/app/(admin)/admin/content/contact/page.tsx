"use client"
import React, { useEffect } from 'react'
import ContactList from './ContactList'

import Cookies from "js-cookie";
const Page = () => {
    useEffect(() => {
        const adminToken = Cookies.get("admin_token"); // ✅ check inside useEffect
        if (!adminToken) {
            window.location.href = "/admin/login";
        }
    }, []);

    return (
        <div>
            <ContactList></ContactList>
        </div>
    )
}

export default Page