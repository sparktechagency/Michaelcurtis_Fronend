"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import MaxWidth from "../max-width/MaxWidth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar
  const [profileOpen, setProfileOpen] = useState(false); // Profile menu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    // { name: "Home", href: "/" },
    { name: "Rankings", href: "/rankings" },
    { name: "Provider", href: "/providers" },
    { name: "Policies", href: "/policies" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       profileRef.current &&
  //       !profileRef.current.contains(event.target as Node)
  //     ) {
  //       setProfileOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [profileRef]);


  const [userToken, setUserToken] = useState<string>();

  useEffect(() => {
    const userToken = Cookies.get("user_token");
    setUserToken(userToken)
  }, []);

  console.log(userToken)





  return (
    <div className="sticky top-0 bg-white z-50 border-b-[2px] py-2  ">
      <MaxWidth>
        <div className="flex items-center justify-between gap-x-7 py-1  ">
          {/* Logo */}
          <div >
            <Link className=" flex items-center " href={"/"}>
              <Image
                src="/images/logo/logo-svg-1.svg"
                alt="Logo"
                width={316}
                height={69}
                className="object-contain      "
                priority
              />
              {/* <h1 className=" text-sm lg:text-[31px] font-bold text-center text-black ">CoverageGrader</h1> */}
            </Link>
          </div>

          {/* Nav menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-2 cursor-pointer text-xl font-normal transition-colors duration-200 ${isActive
                    ? "text-[#D09A40] font-semibold"
                    : "text-black"
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

          {/* Login/Profile & Sign Up */}
          {/* Login/Profile & Sign Up */}
          <div className="hidden md:block">
            <div className="flex flex-row gap-x-4 relative" ref={profileRef}>
              {userToken ? (
                // ✅ Show Profile Dropdown when logged in
                <div>
                  <button onClick={() => setProfileOpen(!profileOpen)}>
                    <Image
                      src={"/images/insurance/user-img.svg"}
                      width={61}
                      height={61}
                      alt="User Avatar"
                      className="w-[64px] h-[64px] cursor-pointer border border-[#BD8C3A] p-1 rounded-full"
                    />
                  </button>

                  {/* Profile dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 lg:text-xl text-sm font-normal"
                        onClick={() => setProfileOpen(false)}
                      >
                        View Profile
                      </Link>

                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 lg:text-xl text-sm font-normal"
                        onClick={() => {
                          Cookies.remove("user_token");
                          setUserToken(undefined);
                          setProfileOpen(false);
                          window.location.reload(); // optional: refresh after logout
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // ✅ Show Login & Sign Up when no token
                <>
                  <Link href="/auth/login">
                    <button className="px-6 py-2 text-black border border-gray-400 rounded-full cursor-pointer">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <button className="px-6 py-2 text-white bg-[#D09A40] rounded-full cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={28} className=" cursor-pointer " />
            </button>
          </div>
        </div>
      </MaxWidth>

      {/* Mobile Sidebar */}
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="cursor-pointer" size={28} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-black"
            >
              {item.name}
            </Link>
          ))}

          {/* Auth / Profile Section */}
          <div className="block" ref={profileRef}>
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)}>
                  <Image
                    src="/images/insurance/user-img.svg"
                    width={64}
                    height={64}
                    alt="User"
                    className="w-[64px] h-[64px] cursor-pointer border border-[#BD8C3A] p-1 rounded-full"
                  />
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm font-normal"
                      onClick={() => setProfileOpen(false)}
                    >
                      View Profile
                    </Link>

                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-normal"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setProfileOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  className="px-6 py-2 text-black border border-gray-400 rounded-full"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Login
                </button>
                <Link href="/auth/sign-up">
                  <button className="px-6 py-2 text-white bg-[#D09A40] rounded-full">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Overlay */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-40" />}
    </div>
  );
};

export default Navbar;
