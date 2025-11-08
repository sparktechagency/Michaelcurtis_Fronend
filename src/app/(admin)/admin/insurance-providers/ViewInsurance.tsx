"use client"

import { useDeleteProviderMutation, useSingleProviderQuery } from "@/app/api/admin/insuranceApi";
import { deleteAlert } from "@/helper/deleteAlert";
import { InsuranceProvider } from "@/utility/types/admin/insurance-provider/providerType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "sonner";


type PolicyViewProps = {
    viewModal: boolean;
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
    providerSlug: string | undefined;
};

const UploadBlog: React.FC<PolicyViewProps> = ({
    viewModal,
    setViewModal,
    providerSlug
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


    const { data } = useSingleProviderQuery(providerSlug)

    console.log(data?.data)

    const insuranceProvider: InsuranceProvider = data?.data;

    console.log("insuranceProvider", insuranceProvider)


    const [deleteProvider] = useDeleteProviderMutation();

    const handleDeleteInsurance = async (slug: string) => {
        try {

            const res = await deleteAlert();
            if (res.isConfirmed) {
                const res = await deleteProvider(slug).unwrap();
                if (res) {
                    toast.success(res?.message);
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
                className={`fixed inset-0 z-50   bg-opacity-50 transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`fixed z-50 top-0 h-[95vh] overflow-y-auto left-1/2 transform -translate-x-1/2 max-w-3xl w-full mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
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


                    {/* Header: Logo and Insurance Title */}
                    <div className="flex  mb-6 gap-x-7 ">
                        <Image
                            width={108}
                            height={113}
                            src={insuranceProvider?.logo_url}
                            alt="insurance logo"
                            unoptimized
                            className="  rounded-[9px] w-[108px] h-[113px] border border-[#E9D1A7]  "
                        />


                        <div>
                            <h2 className=" lg:text-4xl text-lg text-black font-normal  ">{insuranceProvider?.name}</h2>
                            <div className="flex items-center space-x-1">
                                <span className=' font-bold text-[16px] ' >{insuranceProvider?.avg_overall_rating}</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`w-4 h-4 ${star <= Math.round(Number(insuranceProvider?.avg_overall_rating || 0))
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                                <span className="text-sm text-gray-500">({insuranceProvider?.reviews_count})</span>
                            </div>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className=" px-8 pb-9 pt-4 bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[10px] mb-6 ">
                        <h3 className=" lg:text-[27px] font-normal ">Overview</h3>
                        <div className="mt-2 grid grid-cols-2 ">
                            <div>
                                <div className=" text-lg text-[#000000] font-normal ">Category</div>
                                <div className="">
                                    {insuranceProvider?.policies?.map((item, i) => (
                                        <span
                                            key={item.id || i}
                                            className="text-lg text-[#000000] font-thin "
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-lg text-[#000000] font-normal ">Price</div>
                                <div className="text-lg text-[#39CC6A] font-normal">${insuranceProvider?.price} </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className=" mt-1 ">
                            <div className=" text-lg font-normal ">About</div>
                            <p className='text-lg font-thin' >
                                <p
                                    dangerouslySetInnerHTML={{ __html: insuranceProvider?.about }}
                                />
                            </p>
                        </div>

                        {/* Pros and Cons */}
                        <div className="grid grid-cols-2 gap-4 mt-4  ">
                            <div className="bg-green-100 pt-2.5 pb-8 rounded-lg px-6 ">
                                <div className=" font-normal text-[#188625] text-lg ">Pros</div>
                                <ul className=" text-xs mt-1.5 space-y-4   ">
                                    {
                                        insuranceProvider?.pros?.map((item, i) => {
                                            return (
                                                <div key={i} >
                                                    <li className=' ' >{item}</li>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="bg-[#FBE5DC]  rounded-lg px-4  pt-2.5 pb-8  ">
                                <div className="font-normal text-[#861818] text-lg ">Cons</div>
                                <ul className="text-xs mt-1.5 space-y-4  ">


                                    {
                                        insuranceProvider?.cons?.map((item, i) => {
                                            return (
                                                <div key={i} >
                                                    <li className=' ' >{item}</li>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/* Community Reviews Section */}
                    {/* <div className=" bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[10px] px-8 pt-4 pb-9  ">
                        <h3 className="lg:text-[27] text-lg text-black font-normal ">Community Reviews</h3>
                        <div className="flex items-center justify-between bg-[#E9D1A7] mt-4 rounded-[9px] py-2 px-4 ">
                            <div>
                                <div className=' flex justify-between ' >
                                    <div className=" font-normal text-[#000000] text-lg " >John D.</div>
                                    <div className="flex items-center gap-x-1  ">
                                        <span className=' font-normal text-[16px] ' >4.5</span>
                                        <span className="text-[#FEE453] text-xl ">★★★★☆</span>
                                    </div>
                                </div>
                                <p className=" mt-2 font-thin text-lg  ">
                                    Progressive is a top contender for those who value convenience and potential savings through its robust digital tools and usage-based programs like Snapshot.
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-8 ">
                        <button onClick={() => { handleDeleteInsurance(insuranceProvider?.slug) }} className="flex items-center space-x-2 px-8 cursor-pointer py-3 bg-[#D93939] text-white   rounded-[36px] ">
                            <i className="fas fa-trash-alt"></i>
                            <span>Delete</span>
                        </button>
                        <button className="px-8 cursor-pointer py-3 bg-[#D09A40] text-white   rounded-[36px] ">
                            Save
                        </button>
                    </div>
                </div>




            </div>
        </>
    );
};

export default UploadBlog;
