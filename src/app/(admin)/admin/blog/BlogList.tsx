"use client";

import React, { useState } from "react";
import UploadBlog from "./UploadBlog";
import BlogView from "./BlogView";
import BlogUpdate from "./BlogUpdate";
import { useAllBlogQuery, useBlogDeleteMutation, useBlogStatusUpdateMutation } from "@/app/api/admin/blogApi";
import { BlogApiResponseType } from './../../../../utility/types/admin/blog/blogType';
import { useAllPolicyQuery } from "@/app/api/admin/policyApi";
import { AllPolicyApiResponse } from "@/utility/types/admin/policy/policyType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { updateAlert } from "@/helper/updertAlert";
import { deleteAlert } from "@/helper/deleteAlert";



export default function BlogList() {

    const { data } = useAllBlogQuery({});


    const initialPosts: BlogApiResponseType[] = data?.data || [];




    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [scoreFilter, setScoreFilter] = useState("All Scores");

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    // Filter logic
    const filteredPosts = initialPosts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All Categories" ? true : post.policy_categories?.name === categoryFilter;
        const matchesStatus = statusFilter === "All Status" ? true : post.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    // new post modal 

    const [openPostModal, setOpenPostModal] = useState<boolean>(false);

    const handleOpenPostModal = () => {
        setOpenPostModal(true)
    }


    // blog view modal 

    const [viewModal, setViewModal] = useState<boolean>(false);



    const handleBlogViewModal = (slug: string) => {
        setViewModal(true)
        setBlogSlug(slug)

    }


    // blog update modal 


    const [blogUpdate, setBlogUpdate] = useState<boolean>(false);
    const [blogSlug, setBlogSlug] = useState<string | null>(null)

    const handleBlogUpdate = (slug: string) => {
        setBlogUpdate(true);
        setBlogSlug(slug)

    }


    const { data: policyResponse } = useAllPolicyQuery({});


    const policyData: AllPolicyApiResponse[] = policyResponse?.data || [];


    // blog status update 

    const [statusModal, setStatusModal] = useState<boolean>(false);

    const [status, setStatus] = useState<string>();


    const [blogStatusUpdate,] = useBlogStatusUpdateMutation();



    const handleStatusModal = (slug: string) => {
        setBlogSlug(slug)
        setStatusModal(true)
    }


    const statusModalClose = () => {
        setStatusModal(false)
    }


    const handleUpdateStatus = async () => {
        const payload = new FormData();
        if (typeof status === "string") {
            payload.append("status", status);
        } else {
            toast.error("Please select a status.");
            return;
        }

        payload.append("_method", "PUT");


        try {

            const res = await updateAlert();

            if (res?.isConfirmed) {
                const res = await blogStatusUpdate({ blogSlug, payload }).unwrap();
                if (res) {
                    toast.success(res?.message);
                    statusModalClose();
                }
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }



    // blog delete 


    const [blogDelete] = useBlogDeleteMutation();


    const handleBlogDelete = async (slug: string) => {
        try {

            const res = await deleteAlert();

            if (res?.isConfirmed) {
                const res = await blogDelete(slug).unwrap();
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
            <div className=" bg-[#FAF5EC] pt-5 pb-9 px-9 shadow shadow-[#00000033] rounded-[12px] ">
                <div className=" flex items-center justify-between  " >
                    <h1 className=" lg:text-[27px] text-black font-normal " >Blogs</h1>
                    <button onClick={handleOpenPostModal} className=" flex flex-row items-center gap-x-1 bg-[#D09A40] border border-[#D09A40] rounded-[34px] px-5 py-2 cursor-pointer text-white text-xl font-normal " >
                        <span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z" fill="white" />
                            </svg>

                        </span>
                        New Post
                    </button>
                </div>
                {/* Search & Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center mt-5 justify-between  ">
                    <input
                        type="text"
                        placeholder="Search post..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 border rounded w-full lg:w-1/3 focus:outline-none"
                    />

                    {/* Custom dropdowns */}
                    <div className=" space-x-6 " >
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-[#B9B9B9] text-[#686868] rounded w-[161px] focus:outline-none"
                        >
                            <option>All Categories</option>
                            {policyData.map((cat, index) => (
                                <option key={index} value={cat?.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-[#B9B9B9] text-[#686868] rounded w-[141px] focus:outline-none"
                        >
                            <option>All Status</option>
                            <option>draft</option>
                            <option>published</option>
                        </select>

                        <select
                            value={scoreFilter}
                            onChange={(e) => setScoreFilter(e.target.value)}
                            className="px-4 py-2 border border-[#B9B9B9] text-[#686868] rounded w-[141px] focus:outline-none "
                        >
                            <option>All Scores</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto  shadow rounded-lg">
                    <table className="w-full table-auto divide-y divide-gray-200">
                        <thead className="">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-700 font-medium">Post Title</th>
                                <th className="px-4 py-2 text-left text-gray-700 font-medium">Author</th>
                                <th className="px-4 py-2 text-left text-gray-700 font-medium">Category</th>
                                <th className="px-4 py-2 text-left text-gray-700 font-medium">Date</th>
                                <th className="px-4 py-2 text-left text-gray-700 font-medium">Status</th>
                                <th className="px-4 py-2  text-gray-700 font-medium text-center ">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedPosts.length ? (
                                paginatedPosts.map((post) => (
                                    <tr key={post.id}>
                                        <td className="px-4 py-3">{post.title.slice(0, 20)}...</td>
                                        <td className="px-4 py-3">{post.author_name}</td>
                                        <td className="px-4 py-3  ">
                                            <button className=" bg-[#F0C8E9] text-[#BA2DB1] py-1.5 px-3.5 rounded-[12px] " >
                                                {post.policy_categories.name}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">{new Date(post?.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                onClick={() => { handleStatusModal(post?.slug) }}
                                                className={`px-3.5 cursor-pointer py-1.5 rounded-[12px]  ${post.status === "draft"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : post.status === "published"
                                                        ? "text-[#31BA2D] bg-[#DAF0C8]"
                                                        : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex gap-2 justify-center ">
                                            <button onClick={() => { handleBlogViewModal(post?.slug) }} className="px-2.5 py-1.5 border border-[#989DA3] rounded-[6px] cursor-pointer ">
                                                <span>
                                                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.275 12.296C1.425 11.192 1 10.639 1 9C1 7.36 1.425 6.809 2.275 5.704C3.972 3.5 6.818 1 11 1C15.182 1 18.028 3.5 19.725 5.704C20.575 6.81 21 7.361 21 9C21 10.64 20.575 11.191 19.725 12.296C18.028 14.5 15.182 17 11 17C6.818 17 3.972 14.5 2.275 12.296Z" stroke="#697079" />
                                                        <path d="M14 9C14 9.79565 13.6839 10.5587 13.1213 11.1213C12.5587 11.6839 11.7956 12 11 12C10.2044 12 9.44129 11.6839 8.87868 11.1213C8.31607 10.5587 8 9.79565 8 9C8 8.20435 8.31607 7.44129 8.87868 6.87868C9.44129 6.31607 10.2044 6 11 6C11.7956 6 12.5587 6.31607 13.1213 6.87868C13.6839 7.44129 14 8.20435 14 9Z" stroke="#697079" />
                                                    </svg>

                                                </span>
                                            </button>
                                            <button onClick={() => { handleBlogUpdate(post?.slug) }} className="px-2.5 py-1.5 border border-[#989DA3] rounded-[6px]  cursor-pointer">
                                                <span>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.533 9.15016C7.36388 9.31929 7.22976 9.5201 7.13831 9.74111C7.04685 9.96211 6.99985 10.199 7 10.4382V13.0002H9.578C10.061 13.0002 10.525 12.8082 10.867 12.4662L18.467 4.86216C18.6365 4.6931 18.7709 4.49227 18.8627 4.27117C18.9544 4.05006 19.0016 3.81304 19.0016 3.57366C19.0016 3.33428 18.9544 3.09725 18.8627 2.87615C18.7709 2.65505 18.6365 2.45422 18.467 2.28516L17.716 1.53416C17.5469 1.36454 17.346 1.22995 17.1248 1.13812C16.9036 1.04629 16.6665 0.999023 16.427 0.999023C16.1875 0.999023 15.9504 1.04629 15.7292 1.13812C15.508 1.22995 15.3071 1.36454 15.138 1.53416L7.533 9.15016Z" stroke="#697079" stroke-linecap="round" strokeLinejoin="round" />
                                                        <path d="M19 10C19 14.243 19 16.364 17.682 17.682C16.364 19 14.242 19 10 19C5.758 19 3.636 19 2.318 17.682C1 16.364 1 14.242 1 10C1 5.758 1 3.636 2.318 2.318C3.636 1 5.758 1 10 1" stroke="#697079" stroke-linecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </span>
                                            </button>
                                            <button onClick={() => { handleBlogDelete(post?.slug) }} className=" px-2.5 py-1.5 border border-[#E04F4F] rounded-[6px]  cursor-pointer">
                                                <span>
                                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.61601 16.0005C2.17134 16.0005 1.79101 15.8421 1.47501 15.5255C1.15901 15.2088 1.00067 14.8291 1.00001 14.3865V2.00047H0.500007C0.358007 2.00047 0.23934 1.95247 0.144007 1.85647C0.0486736 1.76047 0.000673516 1.64147 6.84931e-06 1.49947C-0.000659817 1.35747 0.0473402 1.2388 0.144007 1.14347C0.240674 1.04814 0.35934 1.00047 0.500007 1.00047H4.00001C4.00001 0.793802 4.07667 0.613802 4.23001 0.460469C4.38334 0.307135 4.56334 0.230469 4.77001 0.230469H9.23001C9.43667 0.230469 9.61667 0.307135 9.77001 0.460469C9.92334 0.613802 10 0.793802 10 1.00047H13.5C13.642 1.00047 13.7607 1.04847 13.856 1.14447C13.9513 1.24047 13.9993 1.35947 14 1.50147C14.0007 1.64347 13.9527 1.76214 13.856 1.85747C13.7593 1.9528 13.6407 2.00047 13.5 2.00047H13V14.3855C13 14.8295 12.8417 15.2095 12.525 15.5255C12.2083 15.8415 11.8283 15.9998 11.385 16.0005H2.61601ZM12 2.00047H2.00001V14.3855C2.00001 14.5648 2.05767 14.7121 2.17301 14.8275C2.28834 14.9428 2.43601 15.0005 2.61601 15.0005H11.385C11.5643 15.0005 11.7117 14.9428 11.827 14.8275C11.9423 14.7121 12 14.5648 12 14.3855V2.00047ZM5.30801 13.0005C5.45001 13.0005 5.56901 12.9525 5.66501 12.8565C5.76101 12.7605 5.80867 12.6418 5.80801 12.5005V4.50047C5.80801 4.35847 5.76001 4.2398 5.66401 4.14447C5.56801 4.04914 5.44901 4.00114 5.30701 4.00047C5.16501 3.9998 5.04634 4.0478 4.95101 4.14447C4.85567 4.24114 4.80801 4.3598 4.80801 4.50047V12.5005C4.80801 12.6425 4.85601 12.7611 4.95201 12.8565C5.04801 12.9525 5.16667 13.0005 5.30801 13.0005ZM8.69301 13.0005C8.83501 13.0005 8.95367 12.9525 9.04901 12.8565C9.14434 12.7605 9.19201 12.6418 9.19201 12.5005V4.50047C9.19201 4.35847 9.14401 4.2398 9.04801 4.14447C8.95201 4.04847 8.83334 4.00047 8.69201 4.00047C8.55001 4.00047 8.43101 4.04847 8.33501 4.14447C8.23901 4.24047 8.19134 4.35914 8.19201 4.50047V12.5005C8.19201 12.6425 8.24001 12.7611 8.33601 12.8565C8.43201 12.9518 8.55101 12.9998 8.69301 13.0005Z" fill="#E04F4F" />
                                                    </svg>


                                                </span>
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No posts found
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
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 border rounded ${currentPage === page ? "bg-[#D09A40] text-white" : ""
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
            {/* blog create modal  */}
            {
                openPostModal && (
                    <UploadBlog openPostModal={openPostModal} setOpenPostModal={setOpenPostModal} />
                )

            }
            {/* blog details modal  */}
            {
                viewModal && (
                    <BlogView blogSlug={blogSlug} viewModal={viewModal} setViewModal={setViewModal} ></BlogView>
                )
            }

            {/* blog update modal  */}


            {
                blogUpdate && (
                    <BlogUpdate blogSlug={blogSlug} blogUpdate={blogUpdate} setBlogUpdate={setBlogUpdate} />
                )

            }


            {/* blog status update modal  */}

            {/* Modal */}

            {statusModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-semibold mb-4">Change Status</h2>

                        {/* Dropdown */}
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={statusModalClose}

                                className=" cursor-pointer px-6 py-3 rounded-[26px] border border-[#D09A40] "
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStatus}
                                className=" cursor-pointer px-6 rounded-[26px] text-white py-3  bg-[#D09A40]  "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}






        </>
    );
}
