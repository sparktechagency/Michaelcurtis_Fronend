"use client"
import React, { useEffect } from 'react'
import SendNotification from './SendNotification'
import RecentNotification from './RecentNotification'
import DashboardNotification from './DashboardNotification'

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
      <SendNotification></SendNotification>
      <RecentNotification></RecentNotification>
      <DashboardNotification></DashboardNotification>
    </div>
  )
}

export default Page