"use client"
// app/components/Footer.tsx

import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import MaxWidth from "../max-width/MaxWidth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetSocialMediaLinkQuery } from "@/app/api/admin/socialLinkApi";

export default function Footer() {
    const pathname = usePathname();

    const { data, isLoading, isError } = useGetSocialMediaLinkQuery({});

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load links</p>;

    const links = data?.data || {};


    return (
        <div className="  shadow shadow-[#FAF5EC] pb-10  " >
            <footer className=" ">
                <MaxWidth>
                    <div className="flex flex-wrap justify-between gap-x-8 pt-10 ">

                        {/* Logo + Description */}
                        <div className="flex-1 min-w-[200px] md:min-w-[250px] lg:min-w-[350px]">
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
                            <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg  leading-relaxed">
                                Transparent insurance reviews powered <br />
                                by our community of real customers.
                            </p>
                        </div>

                        {/* Company */}
                        <div className="flex-1 min-w-[120px]">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/about-us" ? " text-[#D09A40] " : ""}`} href="/about-us">About Us</Link></li>
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/methodology" ? " text-[#D09A40] " : ""}`} href="/methodology">Methodology</Link></li>
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/contact" ? " text-[#D09A40] " : ""}`} href="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="flex-1 min-w-[150px]">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/privacy-policy" ? " text-[#D09A40] " : ""}`} href="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/term-service" ? " text-[#D09A40] " : ""}`} href="/term-service">Terms of Service</Link></li>
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/community-guidelines" ? " text-[#D09A40] " : ""}`} href="/community-guidelines">Community Guidelines</Link></li>
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/accessibility-statement" ? " text-[#D09A40] " : ""}`} href="/accessibility-statement">Accessibility Statement</Link></li>
                                <li><Link className={` font-thin text-xs text-[#697079] lg:text-[16px]  ${pathname == "/faq" ? " text-[#D09A40] " : ""}`} href="/faq">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div className="flex-1 min-w-[180px]">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Connect</h3>
                            <div className="flex items-center gap-4 text-2xl text-gray-600">
                                {links.facebook && (
                                    <Link
                                        href={links.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-600"
                                    >
                                        <FaFacebook />
                                    </Link>
                                )}
                                {links.instagram && (
                                    <Link
                                        href={links.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-pink-500"
                                    >
                                        <FaInstagram />
                                    </Link>
                                )}
                                {links.twitter && (
                                    <Link
                                        href={links.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-black"
                                    >
                                        <FaXTwitter />
                                    </Link>
                                )}
                                {links.linkedin && (
                                    <Link
                                        href={links.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-700"
                                    >
                                        <FaLinkedin />
                                    </Link>
                                )}
                            </div>
                            <p className="text-sm sm:text-base text-gray-900">
                                © {new Date().getFullYear()} CoverageGrader. All rights reserved.
                            </p>
                        </div>

                    </div>
                </MaxWidth>
            </footer>
        </div>
    );
}
