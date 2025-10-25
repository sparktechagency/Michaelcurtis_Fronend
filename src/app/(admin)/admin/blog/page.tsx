"use client"
import React, { useEffect } from 'react'
import BlogList from './BlogList'
import Cookies from "js-cookie";
const Page: React.FC = () => {
  useEffect(() => {
    const adminToken = Cookies.get("admin_token"); // ✅ check inside useEffect
    if (!adminToken) {
      window.location.href = "/auth/login";
    }
  }, []);
  return (
    <div>
      <BlogList></BlogList>
    </div>
  )
}

export default Page