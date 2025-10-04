
import { useContactReadMutation, useDeleteContactApiMutation, useSingleContactQuery } from "@/app/api/admin/contactApi";
import { deleteAlert } from "@/helper/deleteAlert";
import { readAlert } from "@/helper/readAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";




type PolicyViewProps = {
    viewContactModal: boolean;
    setViewcontactModal1: React.Dispatch<React.SetStateAction<boolean>>;
    // blogSlug: string | null
    contactId: number | undefined
};

const ViewContact: React.FC<PolicyViewProps> = ({
    viewContactModal,
    setViewcontactModal1,
    contactId
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (viewContactModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [viewContactModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setViewcontactModal1(false), 500);
    }, [setViewcontactModal1]);

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

        if (viewContactModal) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [viewContactModal, handleClose]);




    const id = contactId;


    const { data } = useSingleContactQuery(id);


    console.log(`single contact is `, data)





    const [deleteContactApi] = useDeleteContactApiMutation();

    // ✅ Delete
    const handleDelete = async () => {
        try {
            const res = await deleteAlert();
            if (res.isConfirmed) {
                const res = await deleteContactApi(id).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }



        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };

    const [contactRead] = useContactReadMutation();


    const readContact = async () => {
        try {
            const res = await readAlert();
            if (res?.isConfirmed) {
                const res = await contactRead(id).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }








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


                <div className="max-w-4xl mx-auto  ">

                    <div className=" mb-7 " >
                        <h1 className=" lg:text-4xl text-lg  mb-3 " >Message Details</h1>
                        <p>Jun 15, 2025, 10:30 AM</p>
                    </div>

                    {/* Form Fields */}
                    <form className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                defaultValue={data?.data?.name}
                                className="mt-2 focus:outline-0 w-full border border-[#989DA3] rounded-[7px] py-3 px-4   "
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                defaultValue={data?.data?.email}
                                className="mt-2 focus:outline-0 w-full border border-[#989DA3] rounded-[7px] py-3 px-4   "
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Enter message..."
                                defaultValue={data?.data?.message}
                                className="mt-2 focus:outline-0 w-full border border-[#989DA3] rounded-[7px] py-3 px-4"
                            ></textarea>
                        </div>
                    </form>
                    {/* Header */}
                    <div className="flex justify-between items-center mt-20">
                        {/* Left: Mark Read */}
                        <button onClick={readContact} className=" gap-x-14 flex items-center ">
                            <span className=" text-2xl  " >
                                Mark as Read
                            </span>
                            <span className=" cursor-pointer " >
                                <svg width="93" height="36" viewBox="0 0 93 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1422_3094)">
                                        <rect x="0.513184" y="0.162109" width="91.9328" height="35.6754" rx="17.8377" fill="#45E03C" />
                                        <g filter="url(#filter0_d_1422_3094)">
                                            <circle cx="72.5499" cy="18.6856" r="13.0352" fill="white" />
                                        </g>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_1422_3094" x="49.4981" y="-4.36617" width="46.1034" height="46.1034" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset />
                                            <feGaussianBlur stdDeviation="5.00828" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1422_3094" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1422_3094" result="shape" />
                                        </filter>
                                        <clipPath id="clip0_1422_3094">
                                            <rect x="0.513184" y="0.162109" width="91.9328" height="35.6754" rx="17.8377" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </span>
                        </button>

                        {/* Right: Icons */}
                        <div onClick={handleDelete} className="flex gap-3 cursor-pointer ">
                            <svg width="130" height="54" viewBox="0 0 130 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.446289" width="129" height="54" rx="27" fill="#D93939" />
                                <path d="M32.0623 35.0005C31.6176 35.0005 31.2373 34.8421 30.9213 34.5255C30.6053 34.2088 30.447 33.8291 30.4463 33.3865V21.0005H29.9463C29.8043 21.0005 29.6856 20.9525 29.5903 20.8565C29.495 20.7605 29.447 20.6415 29.4463 20.4995C29.4456 20.3575 29.4936 20.2388 29.5903 20.1435C29.687 20.0481 29.8056 20.0005 29.9463 20.0005H33.4463C33.4463 19.7938 33.523 19.6138 33.6763 19.4605C33.8296 19.3071 34.0096 19.2305 34.2163 19.2305H38.6763C38.883 19.2305 39.063 19.3071 39.2163 19.4605C39.3696 19.6138 39.4463 19.7938 39.4463 20.0005H42.9463C43.0883 20.0005 43.207 20.0485 43.3023 20.1445C43.3976 20.2405 43.4456 20.3595 43.4463 20.5015C43.447 20.6435 43.399 20.7621 43.3023 20.8575C43.2056 20.9528 43.087 21.0005 42.9463 21.0005H42.4463V33.3855C42.4463 33.8295 42.288 34.2095 41.9713 34.5255C41.6546 34.8415 41.2746 34.9998 40.8313 35.0005H32.0623ZM41.4463 21.0005H31.4463V33.3855C31.4463 33.5648 31.504 33.7121 31.6193 33.8275C31.7346 33.9428 31.8823 34.0005 32.0623 34.0005H40.8313C41.0106 34.0005 41.158 33.9428 41.2733 33.8275C41.3886 33.7121 41.4463 33.5648 41.4463 33.3855V21.0005ZM34.7543 32.0005C34.8963 32.0005 35.0153 31.9525 35.1113 31.8565C35.2073 31.7605 35.255 31.6418 35.2543 31.5005V23.5005C35.2543 23.3585 35.2063 23.2398 35.1103 23.1445C35.0143 23.0491 34.8953 23.0011 34.7533 23.0005C34.6113 22.9998 34.4926 23.0478 34.3973 23.1445C34.302 23.2411 34.2543 23.3598 34.2543 23.5005V31.5005C34.2543 31.6425 34.3023 31.7611 34.3983 31.8565C34.4943 31.9525 34.613 32.0005 34.7543 32.0005ZM38.1393 32.0005C38.2813 32.0005 38.4 31.9525 38.4953 31.8565C38.5906 31.7605 38.6383 31.6418 38.6383 31.5005V23.5005C38.6383 23.3585 38.5903 23.2398 38.4943 23.1445C38.3983 23.0485 38.2796 23.0005 38.1383 23.0005C37.9963 23.0005 37.8773 23.0485 37.7813 23.1445C37.6853 23.2405 37.6376 23.3591 37.6383 23.5005V31.5005C37.6383 31.6425 37.6863 31.7611 37.7823 31.8565C37.8783 31.9518 37.9973 31.9998 38.1393 32.0005Z" fill="white" />
                                <path d="M51.1683 20.665H55.5573C56.5653 20.665 57.4403 20.805 58.1823 21.085C58.9243 21.351 59.5823 21.757 60.1563 22.303C60.7443 22.877 61.2203 23.591 61.5843 24.445C61.9483 25.285 62.1303 26.244 62.1303 27.322C62.1303 28.414 61.9483 29.387 61.5843 30.241C61.2343 31.095 60.7583 31.802 60.1563 32.362C59.5963 32.908 58.9383 33.321 58.1823 33.601C57.4403 33.867 56.5653 34 55.5573 34H51.1683V20.665ZM55.5363 32.404C56.8663 32.404 57.9373 31.998 58.7493 31.186C59.1693 30.766 59.4983 30.22 59.7363 29.548C59.9883 28.876 60.1143 28.134 60.1143 27.322C60.1143 26.51 59.9883 25.768 59.7363 25.096C59.4983 24.424 59.1693 23.878 58.7493 23.458C58.3293 23.038 57.8533 22.73 57.3213 22.534C56.7893 22.324 56.1943 22.219 55.5363 22.219H53.1003V32.404H55.5363ZM68.377 34.189C67.481 34.189 66.683 33.993 65.983 33.601C65.297 33.195 64.758 32.614 64.366 31.858C63.974 31.102 63.778 30.206 63.778 29.17C63.778 28.134 63.974 27.238 64.366 26.482C64.772 25.712 65.325 25.124 66.025 24.718C66.725 24.312 67.509 24.109 68.377 24.109C69.231 24.109 69.973 24.312 70.603 24.718C71.233 25.11 71.716 25.663 72.052 26.377C72.402 27.091 72.577 27.91 72.577 28.834V29.527H65.689C65.689 30.171 65.808 30.738 66.046 31.228C66.284 31.704 66.62 32.075 67.054 32.341C67.488 32.593 68.006 32.719 68.608 32.719C69.14 32.719 69.623 32.649 70.057 32.509C70.491 32.355 70.827 32.194 71.065 32.026C71.317 31.858 71.492 31.725 71.59 31.627L72.346 32.824C72.136 33.034 71.835 33.244 71.443 33.454C71.065 33.664 70.61 33.839 70.078 33.979C69.56 34.119 68.993 34.189 68.377 34.189ZM70.75 28.225C70.75 27.735 70.666 27.28 70.498 26.86C70.33 26.44 70.064 26.104 69.7 25.852C69.336 25.6 68.874 25.474 68.314 25.474C67.754 25.474 67.278 25.614 66.886 25.894C66.508 26.16 66.221 26.503 66.025 26.923C65.829 27.329 65.71 27.763 65.668 28.225H70.75ZM74.7268 20.245H76.5958V34H74.7268V20.245ZM83.4502 34.189C82.5542 34.189 81.7562 33.993 81.0562 33.601C80.3702 33.195 79.8312 32.614 79.4392 31.858C79.0472 31.102 78.8512 30.206 78.8512 29.17C78.8512 28.134 79.0472 27.238 79.4392 26.482C79.8452 25.712 80.3982 25.124 81.0982 24.718C81.7982 24.312 82.5822 24.109 83.4502 24.109C84.3042 24.109 85.0462 24.312 85.6762 24.718C86.3062 25.11 86.7892 25.663 87.1252 26.377C87.4752 27.091 87.6502 27.91 87.6502 28.834V29.527H80.7622C80.7622 30.171 80.8812 30.738 81.1192 31.228C81.3572 31.704 81.6932 32.075 82.1272 32.341C82.5612 32.593 83.0792 32.719 83.6812 32.719C84.2132 32.719 84.6962 32.649 85.1302 32.509C85.5642 32.355 85.9002 32.194 86.1382 32.026C86.3902 31.858 86.5652 31.725 86.6632 31.627L87.4192 32.824C87.2092 33.034 86.9082 33.244 86.5162 33.454C86.1382 33.664 85.6832 33.839 85.1512 33.979C84.6332 34.119 84.0662 34.189 83.4502 34.189ZM85.8232 28.225C85.8232 27.735 85.7392 27.28 85.5712 26.86C85.4032 26.44 85.1372 26.104 84.7732 25.852C84.4092 25.6 83.9472 25.474 83.3872 25.474C82.8272 25.474 82.3512 25.614 81.9592 25.894C81.5812 26.16 81.2942 26.503 81.0982 26.923C80.9022 27.329 80.7832 27.763 80.7412 28.225H85.8232ZM92.8451 34.21C91.9771 34.21 91.3051 33.965 90.8291 33.475C90.5631 33.209 90.3811 32.887 90.2831 32.509C90.1991 32.117 90.1571 31.599 90.1571 30.955V25.705H88.7291V24.298H90.1361L90.3251 21.652H92.0261V24.298H94.7141V25.705H92.0261V30.724C92.0261 31.144 92.0541 31.48 92.1101 31.732C92.1661 31.984 92.2501 32.173 92.3621 32.299C92.6001 32.579 92.9501 32.719 93.4121 32.719C93.6081 32.719 93.7971 32.705 93.9791 32.677C94.1751 32.635 94.3291 32.593 94.4411 32.551L94.6511 33.937C94.4551 34.007 94.1821 34.07 93.8321 34.126C93.4961 34.182 93.1671 34.21 92.8451 34.21ZM100.369 34.189C99.4732 34.189 98.6752 33.993 97.9752 33.601C97.2892 33.195 96.7502 32.614 96.3582 31.858C95.9662 31.102 95.7702 30.206 95.7702 29.17C95.7702 28.134 95.9662 27.238 96.3582 26.482C96.7642 25.712 97.3172 25.124 98.0172 24.718C98.7172 24.312 99.5012 24.109 100.369 24.109C101.223 24.109 101.965 24.312 102.595 24.718C103.225 25.11 103.708 25.663 104.044 26.377C104.394 27.091 104.569 27.91 104.569 28.834V29.527H97.6812C97.6812 30.171 97.8002 30.738 98.0382 31.228C98.2762 31.704 98.6122 32.075 99.0462 32.341C99.4802 32.593 99.9982 32.719 100.6 32.719C101.132 32.719 101.615 32.649 102.049 32.509C102.483 32.355 102.819 32.194 103.057 32.026C103.309 31.858 103.484 31.725 103.582 31.627L104.338 32.824C104.128 33.034 103.827 33.244 103.435 33.454C103.057 33.664 102.602 33.839 102.07 33.979C101.552 34.119 100.985 34.189 100.369 34.189ZM102.742 28.225C102.742 27.735 102.658 27.28 102.49 26.86C102.322 26.44 102.056 26.104 101.692 25.852C101.328 25.6 100.866 25.474 100.306 25.474C99.7462 25.474 99.2702 25.614 98.8782 25.894C98.5002 26.16 98.2132 26.503 98.0172 26.923C97.8212 27.329 97.7022 27.763 97.6602 28.225H102.742Z" fill="white" />
                            </svg>


                        </div>
                    </div>
                </div>





            </div >
        </>
    );
};

export default ViewContact;
