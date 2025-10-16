"use client"
import React, { useEffect } from 'react'
import Provider from './Provider'

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
      <Provider></Provider>
    </div>
  )
}

export default Page