"use client";
import React, { useState } from "react";
import { useAllNotificationReadMutation, useDashboardNotificationQuery, useSingleNotificationReadMutation } from "@/app/api/admin/notificationApi";
import { DashobardNotificationType } from "@/utility/types/notification/notificationType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const DashboardNotification = () => {

    // Fetch Notifications
    const { data } = useDashboardNotificationQuery({});
    const notification: DashobardNotificationType[] = data?.data || [];

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(notification.length / itemsPerPage);

    // Slice current data
    const currentData = notification.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Mark all as read API
    const [allNotificationRead] = useAllNotificationReadMutation();

    const readAllNotification = async () => {
        try {
            const res = await allNotificationRead({}).unwrap();
            if (res) {
                toast.message(res?.message);
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };

    const [singleNotificationRead] = useSingleNotificationReadMutation();


    const singleNotification = async (id: string) => {
        try {
            const res = await singleNotificationRead(id).unwrap();
            if (res) {
                toast.message(res?.message)
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }

    return (
        <div className="mx-auto mt-10 p-4 ">

            {/* Top Bar */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={readAllNotification}
                    className="bg-[#D09A40] cursor-pointer text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
                >
                    Mark All as Read
                </button>
            </div>

            {/* Notification List */}
            <div className="flex flex-col gap-3">
                {currentData.length > 0 ? (
                    currentData.map((item) => (
                        <div
                            onClick={() => { singleNotification(item?.id) }}
                            key={item.id}
                            className={`
        flex justify-between items-start p-4 rounded-lg transition shadow
        ${item.is_read
                                    ? "bg-gray-100 border text-gray-700 cursor-not-allowed pointer-events-none"
                                    : "bg-[#D09A40] text-white cursor-pointer"
                                }
    `}
                        >
                            {/* Content */}
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {item.title}
                                </h2>
                                <p
                                    className="text-sm"
                                    dangerouslySetInnerHTML={{ __html: item.message }}
                                />
                            </div>

                            {/* Time */}
                            <div className="text-sm font-light">
                                {item.created_at_human}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No Notifications Found</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
                {/* Previous */}
                <button
                    className={`px-4 py-2 rounded-md border ${currentPage === 1
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-gray-200"
                        }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-md border transition ${currentPage === page
                            ? "bg-[#D09A40] text-white"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next */}
                <button
                    className={`px-4 py-2 rounded-md border ${currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-gray-200"
                        }`}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DashboardNotification;
