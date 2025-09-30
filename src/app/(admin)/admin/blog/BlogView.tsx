"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { useSingleBlogQuery } from "@/app/api/admin/blogApi";
import { BlogApiResponseType } from "@/utility/types/admin/blog/blogType";


type PolicyViewProps = {
    viewModal: boolean;
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
    blogSlug: string | null
};

const BlogView: React.FC<PolicyViewProps> = ({
    viewModal,
    setViewModal,
    blogSlug
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (viewModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [viewModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setViewModal(false), 500);
    }, [setViewModal]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClose]);

    // Close on ESC and handle focus trap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();

            if (e.key === "Tab" && modalRef.current) {
                const focusableEls = modalRef.current.querySelectorAll(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const firstEl = focusableEls[0] as HTMLElement;
                const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

                if (!e.shiftKey && document.activeElement === lastEl) {
                    firstEl.focus();
                    e.preventDefault();
                } else if (e.shiftKey && document.activeElement === firstEl) {
                    lastEl.focus();
                    e.preventDefault();
                }
            }
        };

        if (viewModal) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [viewModal, handleClose]);



    // single blog 

    const { data } = useSingleBlogQuery(blogSlug);

    console.log(data?.data);

    const blogData: BlogApiResponseType = data?.data













    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0   bg-opacity-50 transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`fixed top-10 h-[80vh] overflow-y-auto left-1/2 transform -translate-x-1/2  w-5xl  mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
          ${showModal ? "translate-y-20 opacity-100 scale-100" : "-translate-y-40 opacity-0 scale-95"}`}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    ref={firstFocusableRef}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ✕
                </button>


                <div>
                    <div className=' lg:pt-13 pb-6  ' >
                        {/* image  */}
                        <Image src={"/images/blog/blog-details.svg"} width={1198} height={678} alt='' className=' block mx-auto ' />
                        <button className=' py-0.5 px-3 bg-[#C4F0C9] text-[#2D9434] rounded-[4px] block mx-auto lg:mt-8 mt-4 ' >Coverage</button>
                        <div className=' max-w-5xl mx-auto ' >
                            <h1 className=' lg:mt-5 mt-2 lg:text-5xl text-2xl font-bold text-center  ' > {blogData?.title} </h1>
                            <div className=' flex flex-row items-center gap-x-6 justify-center lg:mt-6 mt-3 ' >
                                <div className=' flex flex-row items-center gap-x-4 ' >
                                    <div>
                                        <Image
                                            src={blogData?.featured_image}
                                            alt={'blog.title'}
                                            width={46}
                                            height={46}
                                            className=""
                                        />
                                    </div>
                                    <div>
                                        <p>
                                            {
                                                blogData?.user?.full_name
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p>{blogData?.published_at}</p>
                                </div>
                            </div>
                            <div className=' flex items-center gap-x-7 justify-center lg:mt-8 mt-4 ' >
                                <div>
                                    <h1 className=' text-[#000000] lg:text-2xl text-lg  ' >Share this article</h1>
                                </div>
                                <div className=' flex items-baseline gap-x-3.5 ' >
                                    <span>
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_177_6402)">
                                                <path d="M19.1406 0H5.85938C2.62333 0 0 2.62333 0 5.85938V19.1406C0 22.3767 2.62333 25 5.85938 25H19.1406C22.3767 25 25 22.3767 25 19.1406V5.85938C25 2.62333 22.3767 0 19.1406 0Z" fill="url(#paint0_radial_177_6402)" />
                                                <path d="M19.1406 0H5.85938C2.62333 0 0 2.62333 0 5.85938V19.1406C0 22.3767 2.62333 25 5.85938 25H19.1406C22.3767 25 25 22.3767 25 19.1406V5.85938C25 2.62333 22.3767 0 19.1406 0Z" fill="url(#paint1_radial_177_6402)" />
                                                <path d="M12.5009 2.73438C9.84873 2.73438 9.51582 2.746 8.47422 2.79336C7.43457 2.84102 6.7249 3.00557 6.104 3.24707C5.46162 3.49648 4.9168 3.83018 4.37402 4.37314C3.83076 4.91602 3.49707 5.46084 3.24688 6.10293C3.00469 6.72402 2.83994 7.43398 2.79316 8.47314C2.74658 9.51484 2.73438 9.84785 2.73438 12.5001C2.73438 15.1523 2.74609 15.4842 2.79336 16.5258C2.84121 17.5654 3.00576 18.2751 3.24707 18.896C3.49668 19.5384 3.83037 20.0832 4.37334 20.626C4.91602 21.1692 5.46084 21.5037 6.10273 21.7531C6.72412 21.9946 7.43389 22.1592 8.47334 22.2068C9.51504 22.2542 9.84766 22.2658 12.4997 22.2658C15.1521 22.2658 15.484 22.2542 16.5256 22.2068C17.5652 22.1592 18.2757 21.9946 18.8971 21.7531C19.5392 21.5037 20.0832 21.1692 20.6258 20.626C21.169 20.0832 21.5026 19.5384 21.7529 18.8963C21.993 18.2751 22.1578 17.5652 22.2066 16.526C22.2534 15.4844 22.2656 15.1523 22.2656 12.5001C22.2656 9.84785 22.2534 9.51504 22.2066 8.47334C22.1578 7.43369 21.993 6.72412 21.7529 6.10322C21.5026 5.46084 21.169 4.91602 20.6258 4.37314C20.0826 3.82998 19.5394 3.49629 18.8965 3.24717C18.2739 3.00557 17.5639 2.84092 16.5242 2.79336C15.4825 2.746 15.1509 2.73438 12.4979 2.73438H12.5009ZM11.6248 4.49424C11.8849 4.49385 12.175 4.49424 12.5009 4.49424C15.1084 4.49424 15.4174 4.50361 16.4471 4.55039C17.3992 4.59395 17.916 4.75303 18.2603 4.88672C18.716 5.06367 19.0409 5.27529 19.3825 5.61719C19.7243 5.95898 19.9358 6.28447 20.1133 6.74023C20.247 7.08398 20.4062 7.60078 20.4496 8.55293C20.4964 9.58242 20.5065 9.8916 20.5065 12.4979C20.5065 15.1041 20.4964 15.4134 20.4496 16.4428C20.4061 17.3949 20.247 17.9117 20.1133 18.2556C19.9363 18.7113 19.7243 19.0358 19.3825 19.3774C19.0407 19.7192 18.7162 19.9308 18.2603 20.1078C17.9164 20.2421 17.3992 20.4008 16.4471 20.4443C15.4176 20.4911 15.1084 20.5013 12.5009 20.5013C9.89326 20.5013 9.58418 20.4911 8.55478 20.4443C7.60264 20.4004 7.08584 20.2413 6.74131 20.1076C6.28564 19.9306 5.96006 19.719 5.61826 19.3772C5.27646 19.0354 5.06494 18.7107 4.8875 18.2548C4.75381 17.9109 4.59453 17.3941 4.55117 16.442C4.50439 15.4125 4.49502 15.1033 4.49502 12.4954C4.49502 9.8875 4.50439 9.57998 4.55117 8.55049C4.59473 7.59834 4.75381 7.08154 4.8875 6.7373C5.06455 6.28154 5.27646 5.95605 5.61836 5.61426C5.96025 5.27246 6.28564 5.06084 6.74141 4.8835C7.08564 4.74922 7.60264 4.59053 8.55478 4.54678C9.45566 4.50605 9.80479 4.49385 11.6248 4.4918V4.49424ZM17.7138 6.11572C17.0668 6.11572 16.5419 6.64014 16.5419 7.28721C16.5419 7.93418 17.0668 8.45908 17.7138 8.45908C18.3607 8.45908 18.8856 7.93418 18.8856 7.28721C18.8856 6.64023 18.3607 6.11533 17.7138 6.11533V6.11572ZM12.5009 7.48496C9.73135 7.48496 7.48584 9.73047 7.48584 12.5001C7.48584 15.2697 9.73135 17.5142 12.5009 17.5142C15.2705 17.5142 17.5152 15.2697 17.5152 12.5001C17.5152 9.73057 15.2703 7.48496 12.5007 7.48496H12.5009ZM12.5009 9.24482C14.2986 9.24482 15.7562 10.7021 15.7562 12.5001C15.7562 14.2979 14.2986 15.7554 12.5009 15.7554C10.7031 15.7554 9.2457 14.2979 9.2457 12.5001C9.2457 10.7021 10.703 9.24482 12.5009 9.24482Z" fill="white" />
                                            </g>
                                            <defs>
                                                <radialGradient id="paint0_radial_177_6402" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.64062 26.9255) rotate(-90) scale(24.7769 23.0444)">
                                                    <stop stopColor="#FFDD55" />
                                                    <stop offset="0.1" stopColor="#FFDD55" />
                                                    <stop offset="0.5" stopColor="#FF543E" />
                                                    <stop offset="1" stopColor="#C837AB" />
                                                </radialGradient>
                                                <radialGradient id="paint1_radial_177_6402" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-4.1876 1.80088) rotate(78.681) scale(11.0754 45.6531)">
                                                    <stop stopColor="#3771C8" />
                                                    <stop offset="0.128" stopColor="#3771C8" />
                                                    <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                                                </radialGradient>
                                                <clipPath id="clip0_177_6402">
                                                    <rect width="25" height="25" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </span>
                                    <span>
                                        <span>
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_177_6407)">
                                                    <path d="M22.4753 0.681242H2.32574C1.86856 0.676589 1.42821 0.85349 1.10131 1.17313C0.774403 1.49277 0.587652 1.92903 0.582031 2.3862V22.6171C0.588669 23.0736 0.775866 23.5089 1.10266 23.8277C1.42945 24.1465 1.86922 24.3228 2.32574 24.3182H22.4753C22.9325 24.3218 23.3725 24.1443 23.6993 23.8245C24.026 23.5046 24.2128 23.0685 24.219 22.6113V2.38039C24.2108 1.92456 24.0231 1.49037 23.6966 1.1722C23.3701 0.854033 22.9311 0.677595 22.4753 0.681242Z" fill="#0076B2" />
                                                    <path d="M4.07978 9.54147H7.5885V20.831H4.07978V9.54147ZM5.83511 3.92285C6.23754 3.92285 6.63094 4.04221 6.96552 4.26583C7.30011 4.48945 7.56085 4.80729 7.71477 5.17912C7.86868 5.55096 7.90886 5.9601 7.8302 6.35477C7.75155 6.74944 7.55761 7.11192 7.27291 7.39635C6.98821 7.68078 6.62555 7.87438 6.2308 7.95265C5.83605 8.03093 5.42695 7.99037 5.05526 7.83609C4.68357 7.68182 4.36599 7.42078 4.14269 7.08598C3.91938 6.75118 3.8004 6.35768 3.80078 5.95524C3.8013 5.41604 4.01585 4.8991 4.39731 4.51801C4.77876 4.13692 5.29591 3.92285 5.83511 3.92285ZM9.78945 9.54147H13.1529V11.0914H13.1994C13.6682 10.2041 14.8113 9.26829 16.5182 9.26829C20.0715 9.26054 20.7303 11.599 20.7303 14.6312V20.831H17.2215V15.3383C17.2215 14.0306 17.1983 12.3469 15.3984 12.3469C13.5985 12.3469 13.2924 13.7729 13.2924 15.2531V20.831H9.78945V9.54147Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_177_6407">
                                                        <rect width="24.7994" height="24.7994" fill="white" transform="translate(0 0.100098)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MaxWidth>
                        <div className=' px-7 lg:px-14 lg:pt-12 pt-6 lg:pb-14 pb-7 bg-[#FFFFFF]  shadow shadow-[#00000040] ' >

                            <div className=' lg:text-2xl text-lg font-thin text-[#000000] '
                                dangerouslySetInnerHTML={{ __html: blogData?.content || "" }}
                            />
                        </div>
                    </MaxWidth>
                </div>





            </div>
        </>
    );
};

export default BlogView;
