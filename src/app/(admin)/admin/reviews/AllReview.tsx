"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ViewReview from "./ViewReview";
import { useGetAllReviewQuery } from "@/app/api/website/review/reviewApi";
import { Review } from "@/utility/types/website/review-type/reviewType";

interface ReviewType {
    id: number;
    reviewer: string;
    provider: string;
    score: number;
    comment: string;
    date: string;
    status: "Pending" | "Approved" | "Rejected";
}

// const initialReviews: ReviewType[] = [
//     { id: 1, reviewer: "Alice", provider: "Virtue Insurance", score: 4.5, comment: "Good service", date: "2025-09-16", status: "Pending" },
//     { id: 2, reviewer: "Bob", provider: "Hope Coverage", score: 3.8, comment: "Average", date: "2025-09-15", status: "Approved" },
//     { id: 3, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 4, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 5, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 6, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 7, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 8, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 9, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 10, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 11, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     { id: 12, reviewer: "Charlie", provider: "Gloirepaluku", score: 4.9, comment: "Excellent", date: "2025-09-14", status: "Rejected" },
//     // add more dummy data
// ];

export default function AllReview() {

    const { data } = useGetAllReviewQuery([]);

    console.log(data?.data)


    const initialReviews: Review[] = data?.data || [];



    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");
    const [scoreFilter, setScoreFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    // Filtered reviews
    const filteredReviews = initialReviews.filter((r) => {
        const matchesSearch = r.user?.full_name.toLowerCase().includes(search.toLowerCase()) || r.provider.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" ? true : r.status === statusFilter;
        const matchesScore = scoreFilter === "All" ? true : r.score === Number(scoreFilter);

        return matchesSearch && matchesStatus && matchesScore;
    });

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const paginatedReviews = filteredReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const [reviewModal, setReviewModal] = useState<boolean>(false);

    const openReviewModal = () => {
        setReviewModal(true)
    }

    return (
        <>
            <div className=" bg-[#FAF5EC] shadow shadow-[#00000033] pt-5 pb-10 px-8 rounded-[12px] ">
                <h1 className="text-[27px] font-semibold mb-6">Reviews</h1>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2 w-full lg:w-1/3">
                        <FiSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search reviewer or provider..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-4 flex-wrap">


                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
                            <option value="All">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
                            <option value="All">All Scores</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded shadow">
                    <table className="min-w-full divide-y divide-[#989DA3]">
                        <thead className="">
                            <tr className=" pb-4 " >
                                {["Reviewer", "Provider", "Score", "Comment", "Date", "Status", "Actions"].map((col) => (
                                    <th key={col} className="px-4 py-3 text-left  font-medium">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#989DA3]  ">
                            {paginatedReviews.length > 0 ? (
                                paginatedReviews.map((r) => (
                                    <tr className="" key={r.id}>
                                        <td className="px-4 py-2 text-lg font-normal ">{r.reviewer}</td>
                                        <td className="px-4 py-2 text-lg font-normal">{r.provider}</td>
                                        <td className="px-4 py-2">
                                            <div className=" flex flex-row items-center gap-x-1 " >
                                                <span>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.00012 0.808105C8.06569 0.808137 8.13972 0.824854 8.22864 0.875488C8.26692 0.897324 8.30107 0.927268 8.3302 0.976074L8.35852 1.03271L10.0773 5.11182L10.2013 5.40674L10.5206 5.43506L14.9415 5.82178C15.0835 5.84264 15.1442 5.88184 15.1671 5.90186C15.2152 5.94399 15.2585 6.00379 15.2921 6.09619C15.3188 6.16958 15.3238 6.23992 15.3068 6.31885C15.2958 6.36961 15.2664 6.4305 15.1847 6.50342L11.8234 9.40869L11.5802 9.61768L11.6534 9.93018L12.6613 14.2603V14.2612C12.6842 14.3607 12.671 14.4156 12.6534 14.4526C12.612 14.5398 12.5573 14.6066 12.4874 14.6606C12.4354 14.7009 12.3733 14.7272 12.2853 14.7349C12.2287 14.7398 12.1682 14.7293 12.09 14.6792L12.0841 14.6753L12.0782 14.6724L8.27356 12.3804L8.00012 12.2153L7.72571 12.3804L3.922 14.6714L3.91028 14.6792C3.83185 14.729 3.77073 14.7396 3.71301 14.7349C3.62636 14.7276 3.56527 14.7016 3.51379 14.6616C3.44275 14.6064 3.38731 14.5386 3.34583 14.4517C3.32891 14.4162 3.31534 14.362 3.33801 14.2622L4.3468 9.93018L4.41907 9.61768L4.1759 9.40869L0.807739 6.49756C0.731934 6.42707 0.704257 6.36783 0.693481 6.31787C0.676318 6.23815 0.681936 6.16783 0.70813 6.09521C0.740877 6.00458 0.78401 5.94493 0.83313 5.90186C0.856721 5.8812 0.916945 5.84203 1.05676 5.82178L5.47961 5.43506L5.79895 5.40674L5.92297 5.11182L7.64172 1.03271L7.67004 0.976074C7.69914 0.927384 7.73241 0.897297 7.77063 0.875488C7.85981 0.824624 7.93441 0.808105 8.00012 0.808105Z" fill="#FEE453" stroke="#BD8C3A" strokeWidth="1.0623" />
                                                    </svg>

                                                </span>
                                                <span className=" font-thin " >
                                                    4.8/5 <span className="text-lg font-normal" >(A+)</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-lg font-thin text-[#000000] ">{r.comment}</td>
                                        <td className="px-4 py-2 text-lg font-thin text-[#000000] ">{r.date}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-3 py-1 cursor-pointer rounded  text-sm ${r.status === "Pending" ? "bg-[#FFFDC8] text-[#909824] " : r.status === "Approved" ? "bg-[#C8FFD1] text-[#24983F] " : "bg-[#FFC8C8] text-[#982424] "
                                                    }`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button onClick={openReviewModal} className="px-2 py-1  cursor-pointer border border-[#989DA3] rounded-[6px] ">
                                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.275 12.296C1.425 11.192 1 10.639 1 9C1 7.36 1.425 6.809 2.275 5.704C3.972 3.5 6.818 1 11 1C15.182 1 18.028 3.5 19.725 5.704C20.575 6.81 21 7.361 21 9C21 10.64 20.575 11.191 19.725 12.296C18.028 14.5 15.182 17 11 17C6.818 17 3.972 14.5 2.275 12.296Z" stroke="#697079" />
                                                    <path d="M14 9C14 9.79565 13.6839 10.5587 13.1213 11.1213C12.5587 11.6839 11.7956 12 11 12C10.2044 12 9.44129 11.6839 8.87868 11.1213C8.31607 10.5587 8 9.79565 8 9C8 8.20435 8.31607 7.44129 8.87868 6.87868C9.44129 6.31607 10.2044 6 11 6C11.7956 6 12.5587 6.31607 13.1213 6.87868C13.6839 7.44129 14 8.20435 14 9Z" stroke="#697079" />
                                                </svg>

                                            </button>
                                            <button className="px-2 cursor-pointer  py-1 border border-[#989DA3] rounded-[6px] ">
                                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.54996 11.3081L0.579956 6.3381L1.29396 5.6251L5.54996 9.8811L14.706 0.725098L15.419 1.4391L5.54996 11.3081Z" fill="#697079" />
                                                </svg>


                                            </button>
                                            <button className="px-2 cursor-pointer  py-1 border border-[#989DA3] rounded-[6px] ">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L13 13M13 1L1 13" stroke="#697079" strokeLinecap="round" />
                                                </svg>



                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                        No reviews found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 border rounded ${currentPage === page ? "bg-[#D09A40] text-white" : ""}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
                        Next
                    </button>
                </div>
            )}

            {
                reviewModal && (
                    <ViewReview reviewModal={reviewModal} setReviewModal={setReviewModal} ></ViewReview>
                )
            }

        </>
    );
}
