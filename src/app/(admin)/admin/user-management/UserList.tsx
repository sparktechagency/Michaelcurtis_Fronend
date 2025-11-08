"use client";

import { useState } from "react";
import Image from "next/image";
import UserView from "./UserView";
import { useAllUserQuery, useUserDeleteMutation, useUserStatusUpdateMutation } from "@/app/api/admin/userApi";
import { AllUserList } from "@/utility/types/admin/user/UserType";
import { toast } from "sonner";
import { deleteAlert } from "@/helper/deleteAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { updateAlert } from "@/helper/updertAlert";




export default function UserList() {

    const { data } = useAllUserQuery({});
    const usersData: AllUserList[] = data?.data || [];



    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");



    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const filteredUsers = usersData?.filter((user) => {
        const matchesSearch =
            user.full_name.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter ? user.main_role === roleFilter : true;
        const matchesStatus = statusFilter ? user.status === statusFilter : true;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    const [userViewModal, setUserViewModal] = useState<boolean>(false);


    const [userId, setUserId] = useState<number>()

    const handleUserViewModal = (id: number) => {
        setUserViewModal(true)
        setUserId(id)

    }

    const [userDelete] = useUserDeleteMutation();

    const handleDeleteUser = async (id: number) => {
        const userId = id
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

                }
            }



        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }



    // user status update 

    const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
    const [statusValue, setStatusValue] = useState<string>("");




    const handleOpenStatusModal = (id: number) => {
        setOpenStatusModal(true);
        setUserId(id);
    }

    const [userStatusUpdate, { isLoading }] = useUserStatusUpdateMutation();


    const handleStatusUpdate = async () => {
        const payload = new FormData();
        payload.append("_method", "PUT");
        payload.append("status", statusValue);
        try {

            const res = await updateAlert();

            if (res.isConfirmed) {
                const res = await userStatusUpdate({ userId, payload }).unwrap();
                if (res) {
                    toast.success(res?.message);
                    setOpenStatusModal(false);
                }
            }

        } catch (err) {
            console.log(err)
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);

        }
    }












    return (

        <div>
            <div className="  mx-auto bg-[#FAF5EC] shadow shadow-[#00000033] py-9 px-8 rounded-[12px]  ">
                {/* Filters */}
                <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4">
                    <div className="relative w-full lg:w-1/3">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L17.3 15.9C17.4833 16.0833 17.575 16.3167 17.575 16.6C17.575 16.8833 17.4833 17.1167 17.3 17.3C17.1167 17.4833 16.8833 17.575 16.6 17.575C16.3167 17.575 16.0833 17.4833 15.9 17.3L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z" fill="#686868" />
                                </svg>

                            </span>
                        </span>
                        <input
                            type="text"
                            placeholder="Search user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-[#B9B9B9] rounded-[6px] px-10 py-2 w-full focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full  ">
                    <table className="min-w-full w-full ">
                        <thead className="   ">
                            <tr>
                                <th className="px-4 py-2  text-[#000000] text-[16px] ">User</th>
                                <th className="px-4 py-2 text-center text-[#000000] text-[16px] ">Role</th>
                                <th className="px-4 py-2 text-center text-[#000000] text-[16px] ">Status</th>
                                <th className="px-4 py-2 text-center text-[#000000] text-[16px] ">Join Date</th>
                                <th className="px-4 py-2 text-center text-[#000000] text-[16px] ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.map((user) => (
                                <tr key={user.id} className="border-t border-gray-200 w-full  ">
                                    <td className="px-4 py-2 flex items-center gap-2 ">
                                        <Image
                                            src={user.avatar}
                                            alt={user.full_name}
                                            width={40}
                                            height={40}
                                            unoptimized
                                            className="rounded-full w-12 h-12 "
                                        />
                                        <span className=" font-normal text-sm " >{user.full_name}</span>
                                    </td>
                                    <td className=" text-center ">
                                        <button className="px-3.5 py-2 bg-[#EAEAEA] rounded-lg text-[#647268] text-xs font-normal  " >{user.main_role}</button>
                                    </td>
                                    <td className=" text-center ">
                                        <button onClick={() => { handleOpenStatusModal(user?.id) }} className="px-3.5 py-2 bg-[#C8FFD1] rounded-lg text-[#24983F] text-xs font-normal cursor-pointer  " >{user.status}</button>
                                    </td>
                                    <td className="px-4 py-2 text-center text-sm font-normal  ">{user.joined_at}</td>
                                    <td className="px-4 py-2 flex gap-2 justify-center ">
                                        <button
                                            onClick={() => { handleUserViewModal(user?.id) }}
                                            className=" cursor-pointer border border-[#989DA3] text-white px-2 py-1 rounded "
                                        >
                                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.275 11.796C1.425 10.692 1 10.139 1 8.5C1 6.86 1.425 6.309 2.275 5.204C3.972 3 6.818 0.5 11 0.5C15.182 0.5 18.028 3 19.725 5.204C20.575 6.31 21 6.861 21 8.5C21 10.14 20.575 10.691 19.725 11.796C18.028 14 15.182 16.5 11 16.5C6.818 16.5 3.972 14 2.275 11.796Z" stroke="#697079" />
                                                <path d="M14 8.5C14 9.29565 13.6839 10.0587 13.1213 10.6213C12.5587 11.1839 11.7956 11.5 11 11.5C10.2044 11.5 9.44129 11.1839 8.87868 10.6213C8.31607 10.0587 8 9.29565 8 8.5C8 7.70435 8.31607 6.94129 8.87868 6.37868C9.44129 5.81607 10.2044 5.5 11 5.5C11.7956 5.5 12.5587 5.81607 13.1213 6.37868C13.6839 6.94129 14 7.70435 14 8.5Z" stroke="#697079" />
                                            </svg>

                                        </button>
                                        <button onClick={() => { handleDeleteUser(user?.id) }} className="cursor-pointer border border-[#E04F4F] text-white px-2 py-1 rounded">
                                            <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.61601 16.5C2.17134 16.5 1.79101 16.3416 1.47501 16.025C1.15901 15.7083 1.00067 15.3286 1.00001 14.886V2.49998H0.500007C0.358007 2.49998 0.23934 2.45198 0.144007 2.35598C0.0486736 2.25998 0.000673516 2.14098 6.84931e-06 1.99898C-0.000659817 1.85698 0.0473402 1.73831 0.144007 1.64298C0.240674 1.54765 0.35934 1.49998 0.500007 1.49998H4.00001C4.00001 1.29331 4.07667 1.11331 4.23001 0.95998C4.38334 0.806647 4.56334 0.72998 4.77001 0.72998H9.23001C9.43667 0.72998 9.61667 0.806647 9.77001 0.95998C9.92334 1.11331 10 1.29331 10 1.49998H13.5C13.642 1.49998 13.7607 1.54798 13.856 1.64398C13.9513 1.73998 13.9993 1.85898 14 2.00098C14.0007 2.14298 13.9527 2.26165 13.856 2.35698C13.7593 2.45231 13.6407 2.49998 13.5 2.49998H13V14.885C13 15.329 12.8417 15.709 12.525 16.025C12.2083 16.341 11.8283 16.4993 11.385 16.5H2.61601ZM12 2.49998H2.00001V14.885C2.00001 15.0643 2.05767 15.2116 2.17301 15.327C2.28834 15.4423 2.43601 15.5 2.61601 15.5H11.385C11.5643 15.5 11.7117 15.4423 11.827 15.327C11.9423 15.2116 12 15.0643 12 14.885V2.49998ZM5.30801 13.5C5.45001 13.5 5.56901 13.452 5.66501 13.356C5.76101 13.26 5.80867 13.1413 5.80801 13V4.99998C5.80801 4.85798 5.76001 4.73931 5.66401 4.64398C5.56801 4.54865 5.44901 4.50065 5.30701 4.49998C5.16501 4.49931 5.04634 4.54731 4.95101 4.64398C4.85567 4.74065 4.80801 4.85931 4.80801 4.99998V13C4.80801 13.142 4.85601 13.2606 4.95201 13.356C5.04801 13.452 5.16667 13.5 5.30801 13.5ZM8.69301 13.5C8.83501 13.5 8.95367 13.452 9.04901 13.356C9.14434 13.26 9.19201 13.1413 9.19201 13V4.99998C9.19201 4.85798 9.14401 4.73931 9.04801 4.64398C8.95201 4.54798 8.83334 4.49998 8.69201 4.49998C8.55001 4.49998 8.43101 4.54798 8.33501 4.64398C8.23901 4.73998 8.19134 4.85865 8.19201 4.99998V13C8.19201 13.142 8.24001 13.2606 8.33601 13.356C8.43201 13.4513 8.55101 13.4993 8.69301 13.5Z" fill="#E04F4F" />
                                            </svg>

                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                {/* User Detail Modal */}
                {userViewModal && (
                    <UserView userId={userId} userViewModal={userViewModal} setUserViewModal={setUserViewModal} />
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 cursor-pointer border rounded disabled:opacity-50"
                >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.843002 7.71102L6.5 13.368L7.914 11.954L2.964 7.00401L7.914 2.05401L6.5 0.640015L0.843002 6.29701C0.655531 6.48454 0.550215 6.73885 0.550215 7.00401C0.550215 7.26918 0.655531 7.52349 0.843002 7.71102Z" fill="#1E1E1E" />
                    </svg>

                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 border cursor-pointer  rounded ${currentPage === i + 1 ? "bg-[#D09A40] shadow shadow-[#00000040] text-white" : ""
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer "
                >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.15706 7.71102L1.50006 13.368L0.0860596 11.954L5.03606 7.00401L0.0860596 2.05401L1.50006 0.640015L7.15706 6.29701C7.34453 6.48454 7.44985 6.73885 7.44985 7.00401C7.44985 7.26918 7.34453 7.52349 7.15706 7.71102Z" fill="#1E1E1E" />
                    </svg>

                </button>
            </div>

            {openStatusModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                        <h2 className="text-lg font-semibold mb-4 text-center">Change Status</h2>

                        {/* Dropdown */}
                        <select
                            value={statusValue}
                            onChange={(e) => setStatusValue(e.target.value)}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-0"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        {/* Actions */}
                        <div className="flex justify-end mt-6 gap-3">
                            <button
                                onClick={() => setOpenStatusModal(false)}
                                className="cursor-pointer flex items-center space-x-2 px-8 py-3 text-black gap-x-1 rounded-[36px] border border-[#D09A40] transition "
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStatusUpdate}
                                className="cursor-pointer px-8 py-3 bg-[#D09A40] text-white rounded-[36px] hover:bg-[#b8802f] transition "
                            >
                                {
                                    isLoading ? "loading..." : "Save"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )
            }









        </div>
    );
}
