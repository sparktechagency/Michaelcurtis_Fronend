"use client";

import { useSingleUserQuery, useUserDeleteMutation, useUserRoleUpdateMutation } from "@/app/api/admin/userApi";
import { deleteAlert } from "@/helper/deleteAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { toast } from "sonner";

type PolicyViewProps = {
    userViewModal: boolean;
    setUserViewModal: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number | undefined
};

const UserView: React.FC<PolicyViewProps> = ({
    userViewModal,
    setUserViewModal,
    userId
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (userViewModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [userViewModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setUserViewModal(false), 500);
    }, [setUserViewModal]);




    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("admin");

    const roles = ["admin", "user"];


    const { data } = useSingleUserQuery(userId);


    const singleUser = data?.data




    const payload = {
        role: selectedRole
    };

    const [userRoleUpdate, { isLoading }] = useUserRoleUpdateMutation();

    const handleRoleUpdate = async () => {
        try {

            const res = await userRoleUpdate({ userId, payload }).unwrap();
            if (res) {
                toast.success(res?.message);
                handleClose()
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }


    // user delete 


    const [userDelete] = useUserDeleteMutation();

    const handleDeleteUser = async () => {
        try {
            if (userId === undefined) {
                toast.error("User ID is missing.");
                return;
            }


            const res = await deleteAlert();

            if (res.isConfirmed) {
                const res = await userDelete({ userId }).unwrap();

                if (res) {
                    toast.success(res?.message)
                    handleClose()
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
            {/* Backdrop (❌ removed onClick so outside clicks won’t close modal) */}
            {userViewModal && (
                <div
                    className={`fixed inset-0 z-40  bg-opacity-50 transition-opacity duration-500 
                        ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                />
            )}

            {/* Modal */}
            {userViewModal && (
                <div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    className={`fixed h-[80vh] overflow-y-auto z-50 top-10 left-1/2 transform -translate-x-1/2 max-w-3xl w-full mx-4 
                        bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
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


                    {/* User Info */}
                    <div className="flex items-center gap-x-6">
                        <div className="w-16 h-16 rounded-full border-2 border-[#BD8C3A]   " >
                            <Image
                                src={singleUser?.avatar}
                                width={64}
                                height={64}
                                alt={"user"}
                                unoptimized
                                className="rounded-full  w-16 h-16 p-1 "
                            />
                        </div>
                        <div>
                            <h1 className="text-[#000000] text-3xl">John Doe</h1>
                            <div className="mt-2 space-x-3">
                                <button className="bg-[#F5E1F8] px-3.5 py-1 rounded-xl text-[#A4429E] text-sm">
                                    {
                                        singleUser?.main_role
                                    }
                                </button>
                                <button className="bg-[#C8FFD1] px-3.5 py-1 rounded-xl text-[#24983F] text-sm">
                                    {
                                        singleUser?.status
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className=" mt-9 bg-[#FAF5EC] shadow shadow-[#00000040] rounded-[14px] py-5 px-5 " >

                        <h1 className=" text-[27px] "  >Basic Information</h1>
                        <div className=" flex items-center justify-between mt-4 " >
                            <h1 className=" text-lg font-thin " >Email</h1>
                            <h1 className="text-lg" >{singleUser?.email}</h1>
                        </div>
                        <div className=" bg-[#989DA3] w-full h-0.5 mt-2.5 " >

                        </div>

                        <div className=" flex items-center justify-between mt-4 " >
                            <h1 className=" text-lg font-thin " >Join Date</h1>
                            <h1 className="text-lg" >{
                                singleUser?.joined_at}</h1>
                        </div>
                        <div className=" bg-[#989DA3] w-full h-0.5 mt-2.5 " >

                        </div>


                        <div className=" flex items-center justify-between mt-4 " >
                            <h1 className=" text-lg font-thin " >Last Login</h1>
                            <h1 className="text-lg" >{
                                singleUser?.last_login_at}</h1>
                        </div>
                        <div className=" bg-[#989DA3] w-full h-0.5 mt-2.5 " >

                        </div>

                    </div>


                    {/* client role  */}

                    <div className="mt-9 bg-[#FAF5EC] shadow shadow-[#00000040] rounded-[14px] pt-5 pb-10 px-5">
                        <h1 className="text-[27px]">Assigned Role</h1>

                        {/* Dropdown Header */}
                        <div
                            className="flex items-center justify-between mt-4 cursor-pointer"
                            onClick={() => setOpen(!open)}
                        >
                            <h1 className="text-lg font-thin">{selectedRole}</h1>
                            <h1 className="text-lg">
                                {open ? <FaChevronUp /> : <FaChevronDown />}
                            </h1>
                        </div>

                        <div className="bg-[#989DA3] w-full h-0.5 mt-2.5"></div>

                        {/* Dropdown List */}
                        {open && (
                            <div className="mt-3 bg-white shadow-md rounded-md overflow-hidden">
                                {roles.map((role, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setOpen(false);
                                        }}
                                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedRole === role ? "bg-gray-200 font-semibold" : ""
                                            }`}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Activity Summary */}

                    <div className=" mt-9 bg-[#FAF5EC] shadow shadow-[#00000040] rounded-[14px] pt-5 pb-10 px-5 " >

                        <h1 className=" text-[27px] "  >Activity Summary</h1>

                        <div className=" flex justify-between px-10 " >
                            <div className=" mt-3.5 " >
                                <h1 className=" text-4xl font-normal text-center " >12</h1>
                                <p className=" text-xl font-thin text-center " >Reviews Submitted</p>
                            </div>

                            <div className=" mt-3.5 " >
                                <span className=" flex items-center justify-center gap-x-1.5 text-3xl " >
                                    <span><svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.7855 1.50549C14.9148 1.50554 15.0579 1.53956 15.2259 1.63538C15.3297 1.69454 15.4157 1.78206 15.4828 1.94299L15.4837 1.9469L18.5755 9.28381L18.7855 9.78186L19.3236 9.82874L27.2777 10.525C27.5416 10.5636 27.6621 10.6367 27.7142 10.6823C27.8091 10.7652 27.8938 10.8804 27.9574 11.0553C28.0092 11.1979 28.0186 11.3361 27.9857 11.4889C27.9632 11.5932 27.9045 11.7114 27.7523 11.8483L21.7005 17.0778L21.2914 17.4323L21.4134 17.9596L23.2269 25.7477V25.7487C23.2707 25.9387 23.2465 26.0512 23.2084 26.1315C23.13 26.2963 23.026 26.424 22.8929 26.527C22.7899 26.6066 22.6672 26.6588 22.4984 26.6735C22.3826 26.6835 22.2613 26.6605 22.1107 26.5641L22.1009 26.5573L22.0902 26.5514L15.2474 22.4293L14.7855 22.15L14.3226 22.4293L7.47984 26.5514L7.47105 26.5563L7.46129 26.5631C7.31013 26.6592 7.18744 26.6822 7.06969 26.6725C6.90319 26.6586 6.78212 26.6083 6.68004 26.5289C6.54504 26.4239 6.44013 26.2948 6.36168 26.1305C6.3246 26.0528 6.29944 25.941 6.34312 25.7496L8.1566 17.9596L8.27965 17.4323L7.86949 17.0778L1.81773 11.8492C1.66715 11.7119 1.60897 11.5922 1.58629 11.4869C1.5531 11.3328 1.56261 11.1946 1.61363 11.0533C1.67567 10.8817 1.75921 10.7659 1.85582 10.6813C1.90918 10.6346 2.02967 10.5625 2.28941 10.525L10.2464 9.82874L10.7855 9.78186L10.9945 9.28381L14.0863 1.9469L14.142 1.83557C14.1991 1.74026 14.2663 1.67974 14.3441 1.63538C14.5124 1.53938 14.6561 1.50549 14.7855 1.50549Z" fill="#FEE453" stroke="#BD8C3A" stroke-width="1.79336" />
                                    </svg>
                                    </span>
                                    <h1>4.8/5</h1>
                                </span>
                                <p className=" text-xl font-thin text-center " >Average Review Rating</p>
                            </div>
                        </div>




                    </div>





                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            onClick={handleDeleteUser}
                            className=" cursor-pointer flex items-center space-x-2 px-8 py-3 text-[#FFFFFF] gap-x-1 rounded-[36px] border border-[#D09A40] transition bg-[#D93939] "
                        >
                            <span>
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.61601 16C2.17134 16 1.79101 15.8416 1.47501 15.525C1.15901 15.2083 1.00067 14.8286 1.00001 14.386V1.99998H0.500007C0.358007 1.99998 0.23934 1.95198 0.144007 1.85598C0.0486736 1.75998 0.000673516 1.64098 6.84931e-06 1.49898C-0.000659817 1.35698 0.0473402 1.23831 0.144007 1.14298C0.240674 1.04765 0.35934 0.99998 0.500007 0.99998H4.00001C4.00001 0.793314 4.07667 0.613314 4.23001 0.45998C4.38334 0.306647 4.56334 0.22998 4.77001 0.22998H9.23001C9.43667 0.22998 9.61667 0.306647 9.77001 0.45998C9.92334 0.613314 10 0.793314 10 0.99998H13.5C13.642 0.99998 13.7607 1.04798 13.856 1.14398C13.9513 1.23998 13.9993 1.35898 14 1.50098C14.0007 1.64298 13.9527 1.76165 13.856 1.85698C13.7593 1.95231 13.6407 1.99998 13.5 1.99998H13V14.385C13 14.829 12.8417 15.209 12.525 15.525C12.2083 15.841 11.8283 15.9993 11.385 16H2.61601ZM12 1.99998H2.00001V14.385C2.00001 14.5643 2.05767 14.7116 2.17301 14.827C2.28834 14.9423 2.43601 15 2.61601 15H11.385C11.5643 15 11.7117 14.9423 11.827 14.827C11.9423 14.7116 12 14.5643 12 14.385V1.99998ZM5.30801 13C5.45001 13 5.56901 12.952 5.66501 12.856C5.76101 12.76 5.80867 12.6413 5.80801 12.5V4.49998C5.80801 4.35798 5.76001 4.23931 5.66401 4.14398C5.56801 4.04865 5.44901 4.00065 5.30701 3.99998C5.16501 3.99931 5.04634 4.04731 4.95101 4.14398C4.85567 4.24065 4.80801 4.35931 4.80801 4.49998V12.5C4.80801 12.642 4.85601 12.7606 4.95201 12.856C5.04801 12.952 5.16667 13 5.30801 13ZM8.69301 13C8.83501 13 8.95367 12.952 9.04901 12.856C9.14434 12.76 9.19201 12.6413 9.19201 12.5V4.49998C9.19201 4.35798 9.14401 4.23931 9.04801 4.14398C8.95201 4.04798 8.83334 3.99998 8.69201 3.99998C8.55001 3.99998 8.43101 4.04798 8.33501 4.14398C8.23901 4.23998 8.19134 4.35865 8.19201 4.49998V12.5C8.19201 12.642 8.24001 12.7606 8.33601 12.856C8.43201 12.9513 8.55101 12.9993 8.69301 13Z" fill="white" />
                                </svg>

                            </span>
                            Delete
                        </button>
                        <button disabled={isLoading} onClick={handleRoleUpdate} className=" cursor-pointer px-8 py-3 bg-[#D09A40] text-white rounded-[36px] hover:bg-[#b8802f] transition">
                            {
                                isLoading ? "Loading..." : "SAVE"
                            }
                        </button>
                    </div>





                </div>
            )}
        </>
    );
};

export default UserView;
