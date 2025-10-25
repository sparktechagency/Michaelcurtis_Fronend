"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import MaxWidth from "../max-width/MaxWidth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "sonner";
import {
  useUserProfileQuery,
} from "@/app/api/website/auth/authApi";
import {
  useDashboardNotificationQuery,
  useSingleNotificationReadMutation,
  useAllNotificationReadMutation,
} from "@/app/api/admin/notificationApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DashobardNotificationType } from "@/utility/types/notification/notificationType";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [userToken, setUserToken] = useState<string>();

  // ✅ Fetch user
  const { data: userData } = useUserProfileQuery({});

  // ✅ Set token
  useEffect(() => {
    const token = Cookies.get("user_token");
    setUserToken(token);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Logout successfully");
        Cookies.remove("user_token");
        window.location.href = "/auth/login";
      }
    });
  };

  // ✅ Fetch notifications
  const { data: notificationData } = useDashboardNotificationQuery({});
  const notifications: DashobardNotificationType[] =
    notificationData?.data || [];

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const currentNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const handlePrev = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));

  // ✅ API mutations
  const [allNotificationRead] = useAllNotificationReadMutation();
  const [singleNotificationRead] = useSingleNotificationReadMutation();

  const readAllNotification = async () => {
    try {
      const res = await allNotificationRead({}).unwrap();
      if (res) toast.message(res?.message);
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error.data?.message || "Something went wrong ❌");
    }
  };

  const singleNotification = async (id: string) => {
    try {
      const res = await singleNotificationRead(id).unwrap();
      if (res) toast.message(res?.message);
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error.data?.message || "Something went wrong ❌");
    }
  };

  // ✅ Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    if (notificationOpen || profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen, profileOpen]);

  // ✅ Unread notification count for badge
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="sticky top-0 bg-white z-50 border-b-[2px] py-2">
      <MaxWidth>
        <div className="flex items-center justify-between gap-x-7 py-1">
          {/* Logo */}
          <div>
            <Link className="flex items-center" href={"/"}>
              <Image
                src="/images/logo/logo-svg-1.svg"
                alt="Logo"
                width={316}
                height={69}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Rankings", href: "/rankings" },
              { name: "Provider", href: "/providers" },
              { name: "Policies", href: "/policies" },
              { name: "Blog", href: "/blog" },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-2 text-xl transition-colors duration-200 ${isActive
                    ? "text-[#D09A40] font-semibold"
                    : "text-black font-normal"
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[4px] bg-[#D09A40]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div
            className="hidden md:flex items-center gap-x-4 relative"
            ref={profileRef}
          >
            {/* 🔔 Notification Icon */}
            {userToken && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen((prev) => !prev)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer "
                >
                  <Bell size={28} className="text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Notifications</h2>
                      <button
                        onClick={readAllNotification}
                        className="text-sm cursor-pointer text-[#D09A40] hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[550px] overflow-y-auto space-y-6 my-4 px-4  ">
                      {currentNotifications.length > 0 ? (
                        currentNotifications.map((item, i) => (
                          <div
                            onClick={() => singleNotification(item?.id)}
                            key={i}
                            className={`flex justify-between items-start px-4 py-1 rounded-lg transition shadow gap-y-6  ${item.is_read
                              ? "bg-gray-100 border text-gray-700 cursor-not-allowed"
                              : "bg-[#D09A40] text-white cursor-pointer"
                              }`}
                          >
                            <div>
                              <h2 className="text-lg font-semibold">
                                {item.title}
                              </h2>
                              <p
                                className="text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: item.message,
                                }}
                              />
                            </div>
                            <div className="text-sm font-light">
                              {item.created_at_human}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center  items-center px-4 py-2 border-t bg-gray-50">
                      <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-1 text-sm ${currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black hover:text-[#D09A40]"
                          }`}
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <span className="text-sm text-gray-500">
                        {currentPage} of {totalPages || 1}
                      </span>

                      <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-1 text-sm ${currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black hover:text-[#D09A40]"
                          }`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {userToken ? (
              <div>
                <button onClick={() => setProfileOpen((prev) => !prev)}>
                  <Image
                    src={userData?.data?.avatar || "/images/user.png"}
                    width={61}
                    height={61}
                    alt="User Avatar"
                    className="w-[64px] h-[64px] cursor-pointer border border-[#BD8C3A] p-1 rounded-full"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm lg:text-xl"
                      onClick={() => setProfileOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm lg:text-xl"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className=" cursor-pointer px-6 py-2 text-black border border-gray-400 rounded-full">
                    Login
                  </button>
                </Link>
                <Link href="/auth/sign-up">
                  <button className=" cursor-pointer px-6 py-2 text-white bg-[#D09A40] rounded-full">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={28} className="cursor-pointer" />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden">

          {/* Drawer */}
          {isOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black opacity-40"
                onClick={() => setIsOpen(false)}
              ></div>

              {/* Drawer Panel */}
              <div className="relative ml-auto w-64 bg-white h-full shadow-lg flex flex-col p-4">
                {/* Close button */}
                <button
                  className="self-end mb-4"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={28} />
                </button>

                {/* Menu Items */}
                <nav className="flex flex-col gap-4">
                  {[
                    { name: "Rankings", href: "/rankings" },
                    { name: "Provider", href: "/providers" },
                    { name: "Policies", href: "/policies" },
                    { name: "Blog", href: "/blog" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-[#D09A40]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* Login/Signup or Profile */}
                  <div className="mt-auto flex flex-col gap-3">
                    {userToken ? (
                      <>
                        <Link
                          href="/profile"
                          className="text-black hover:text-[#D09A40]"
                          onClick={() => setIsOpen(false)}
                        >
                          View Profile
                        </Link>
                        <button
                          className="text-black hover:text-[#D09A40] text-left"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login">
                          <button className=" cursor-pointer px-4 py-2 text-black border border-gray-400 rounded-full w-full">
                            Login
                          </button>
                        </Link>
                        <Link href="/auth/sign-up">
                          <button className=" cursor-pointer px-4 py-2 text-white bg-[#D09A40] rounded-full w-full">
                            Sign Up
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>


              </div>
            </div>
          )}
        </div>
      </MaxWidth>
    </div>
  );
};

export default Navbar;
