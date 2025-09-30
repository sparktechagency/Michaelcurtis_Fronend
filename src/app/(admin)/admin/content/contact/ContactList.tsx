"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ViewContact from "./ViewContact";

type Message = {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
    status: "Read" | "Unread";
};

const sampleMessages: Message[] = [
    { id: 1, name: "John Doe", email: "john@example.com", message: "I’d like to know more about your services.", date: "2025-09-25", status: "Unread" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Please update me on my booking status.", date: "2025-09-24", status: "Read" },
    { id: 3, name: "Mark Lee", email: "mark@example.com", message: "Can you send me more details?", date: "2025-09-23", status: "Unread" },
    { id: 4, name: "Alice Green", email: "alice@example.com", message: "I want to reschedule my lesson.", date: "2025-09-22", status: "Read" },
    { id: 5, name: "Bob Brown", email: "bob@example.com", message: "Is there a discount for beginners?", date: "2025-09-21", status: "Unread" },
    { id: 6, name: "Sophie White", email: "sophie@example.com", message: "Thanks for your quick response!", date: "2025-09-20", status: "Read" },
    { id: 7, name: "Tom Adams", email: "tom@example.com", message: "I’m interested in evening lessons.", date: "2025-09-19", status: "Unread" },
];

export default function ContactList() {
    const [messages, setMessages] = useState<Message[]>(sampleMessages);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Filter messages
    const filteredMessages = messages.filter((msg) => {
        const matchSearch =
            msg.name.toLowerCase().includes(search.toLowerCase()) ||
            msg.email.toLowerCase().includes(search.toLowerCase()) ||
            msg.message.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "All" || msg.status === statusFilter;

        return matchSearch && matchStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredMessages.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedMessages = filteredMessages.slice(startIndex, startIndex + rowsPerPage);

    const handleDelete = (id: number) => {
        setMessages(messages.filter((msg) => msg.id !== id));
    };


    const [viewContactModal, setViewcontactModal1] = useState<boolean>(false);

    const handleViewModal = () => {
        setViewcontactModal1(true)
    }









    return (
        <>
            <div className=" bg-[#FAF5EC]  shadow shadow-[#00000033] pt-5 pb-9 rounded-[12px] px-7  ">
                <div className=" flex items-center justify-between mb-5 " >
                    <h1 className=" lg:text-[27px] text-sm  " >Contact Messages</h1>
                    <button className=" bg-[#D09A40] border border-[#D09A40] text-white py-2 px-5 rounded-[36px] flex items-center gap-x-2.5 text-xl cursor-pointer " >
                        <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z" fill="white" />
                        </svg>
                        </span>
                        New Post
                    </button>
                </div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <div className="relative w-full sm:w-1/2">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or message..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1); // reset to first page
                            }}
                            className="w-full pl-10 pr-4 p-2.5 border border-[#B9B9B9] rounded-[6px] focus:outline-none focus:ring-0"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1); // reset to first page
                        }}
                        className="py-2.5 px-6 border border-[#B9B9B9] rounded-[6px] focus:outline-none focus:ring-0 text-[#686868] "
                    >
                        <option value="All">All Status</option>
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse ">
                        <thead className="">
                            <tr>
                                <th className="p-3 text-left ">Name</th>
                                <th className="p-3 text-left ">Email</th>
                                <th className="p-3 text-left ">Message Preview</th>
                                <th className="p-3 text-left ">Date Submitted</th>
                                <th className="p-3 text-left ">Status</th>
                                <th className="p-3 text-center ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedMessages.length > 0 ? (
                                paginatedMessages.map((msg) => (
                                    <tr key={msg.id} className=" border-t border-[#989DA3] ">
                                        <td className="p-3 ">{msg.name}</td>
                                        <td className="p-3 ">{msg.email}</td>
                                        <td className="p-3  truncate max-w-xs">
                                            {msg.message}
                                        </td>
                                        <td className="p-3 ">{msg.date}</td>
                                        <td className="p-3 ">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${msg.status === "Unread"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {msg.status}
                                            </span>
                                        </td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <button
                                                onClick={() => { handleViewModal() }}
                                                className=" border border-[#989DA3] rounded-[6px] px-3 py-2 cursor-pointer "

                                            >
                                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.275 12.296C1.425 11.192 1 10.639 1 9C1 7.36 1.425 6.809 2.275 5.704C3.972 3.5 6.818 1 11 1C15.182 1 18.028 3.5 19.725 5.704C20.575 6.81 21 7.361 21 9C21 10.64 20.575 11.191 19.725 12.296C18.028 14.5 15.182 17 11 17C6.818 17 3.972 14.5 2.275 12.296Z" stroke="#697079" />
                                                    <path d="M14 9C14 9.79565 13.6839 10.5587 13.1213 11.1213C12.5587 11.6839 11.7956 12 11 12C10.2044 12 9.44129 11.6839 8.87868 11.1213C8.31607 10.5587 8 9.79565 8 9C8 8.20435 8.31607 7.44129 8.87868 6.87868C9.44129 6.31607 10.2044 6 11 6C11.7956 6 12.5587 6.31607 13.1213 6.87868C13.6839 7.44129 14 8.20435 14 9Z" stroke="#697079" />
                                                </svg>

                                            </button>
                                            <button
                                                className="border border-[#E04F4F] rounded-[6px] px-3 py-2 cursor-pointer "
                                                onClick={() => handleDelete(msg.id)}
                                            >
                                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.61601 16.0005C2.17134 16.0005 1.79101 15.8421 1.47501 15.5255C1.15901 15.2088 1.00067 14.8291 1.00001 14.3865V2.00047H0.500007C0.358007 2.00047 0.23934 1.95247 0.144007 1.85647C0.0486736 1.76047 0.000673516 1.64147 6.84931e-06 1.49947C-0.000659817 1.35747 0.0473402 1.2388 0.144007 1.14347C0.240674 1.04814 0.35934 1.00047 0.500007 1.00047H4.00001C4.00001 0.793802 4.07667 0.613802 4.23001 0.460469C4.38334 0.307135 4.56334 0.230469 4.77001 0.230469H9.23001C9.43667 0.230469 9.61667 0.307135 9.77001 0.460469C9.92334 0.613802 10 0.793802 10 1.00047H13.5C13.642 1.00047 13.7607 1.04847 13.856 1.14447C13.9513 1.24047 13.9993 1.35947 14 1.50147C14.0007 1.64347 13.9527 1.76214 13.856 1.85747C13.7593 1.9528 13.6407 2.00047 13.5 2.00047H13V14.3855C13 14.8295 12.8417 15.2095 12.525 15.5255C12.2083 15.8415 11.8283 15.9998 11.385 16.0005H2.61601ZM12 2.00047H2.00001V14.3855C2.00001 14.5648 2.05767 14.7121 2.17301 14.8275C2.28834 14.9428 2.43601 15.0005 2.61601 15.0005H11.385C11.5643 15.0005 11.7117 14.9428 11.827 14.8275C11.9423 14.7121 12 14.5648 12 14.3855V2.00047ZM5.30801 13.0005C5.45001 13.0005 5.56901 12.9525 5.66501 12.8565C5.76101 12.7605 5.80867 12.6418 5.80801 12.5005V4.50047C5.80801 4.35847 5.76001 4.2398 5.66401 4.14447C5.56801 4.04914 5.44901 4.00114 5.30701 4.00047C5.16501 3.9998 5.04634 4.0478 4.95101 4.14447C4.85567 4.24114 4.80801 4.3598 4.80801 4.50047V12.5005C4.80801 12.6425 4.85601 12.7611 4.95201 12.8565C5.04801 12.9525 5.16667 13.0005 5.30801 13.0005ZM8.69301 13.0005C8.83501 13.0005 8.95367 12.9525 9.04901 12.8565C9.14434 12.7605 9.19201 12.6418 9.19201 12.5005V4.50047C9.19201 4.35847 9.14401 4.2398 9.04801 4.14447C8.95201 4.04847 8.83334 4.00047 8.69201 4.00047C8.55001 4.00047 8.43101 4.04847 8.33501 4.14447C8.23901 4.24047 8.19134 4.35914 8.19201 4.50047V12.5005C8.19201 12.6425 8.24001 12.7611 8.33601 12.8565C8.43201 12.9518 8.55101 12.9998 8.69301 13.0005Z" fill="#E04F4F" />
                                                </svg>

                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 text-center text-gray-500 "
                                    >
                                        No messages found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Pagination */}
            <div className="flex items-center gap-x-4 justify-center mt-14">
                {/* Prev Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }`}
                >
                    <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.343063 7.71065L6.00006 13.3676L7.41406 11.9536L2.46406 7.00365L7.41406 2.05365L6.00006 0.639648L0.343063 6.29665C0.155592 6.48418 0.0502763 6.73848 0.0502763 7.00365C0.0502763 7.26881 0.155592 7.52312 0.343063 7.71065Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md ${currentPage === page
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-200 hover:bg-yellow-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages || totalPages === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }`}
                >
                    <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.65694 7.71065L1.99994 13.3676L0.585938 11.9536L5.53594 7.00365L0.585938 2.05365L1.99994 0.639648L7.65694 6.29665C7.84441 6.48418 7.94972 6.73848 7.94972 7.00365C7.94972 7.26881 7.84441 7.52312 7.65694 7.71065Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>


            {
                viewContactModal && (
                    <ViewContact viewContactModal={viewContactModal} setViewcontactModal1={setViewcontactModal1} />
                )
            }

        </>
    );
}
