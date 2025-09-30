"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PolicyView from "./PolicyView";
import AddPolicy from "./AddPolicy";
import PolicyUpdate from "./PolicyUpdate";
import { useAllPolicyQuery, usePolicyDeleteMutation } from "@/app/api/admin/policyApi";
import { AllPolicyApiResponse } from "@/utility/types/admin/policy/policyType";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { deleteAlert } from "@/helper/deleteAlert";



// const initialProviders: ProviderType[] = [
//     { id: 1, Category: "Gloirepaluku", Description: "California, Texas", Last_Updated: "4.5", Status: "Auto Insurance" },
//     { id: 2, Category: "Virtue Insurance", Description: "Florida, New York", Last_Updated: "4.7", Status: "Health Insurance" },
//     { id: 3, Category: "Hope Coverage", Description: "Texas, Nevada", Last_Updated: "4.2", Status: "Home Insurance" },
//     { id: 4, Category: "Hope Coverage", Description: "Texas, Nevada", Last_Updated: "4.2", Status: "Home Insurance" },
//     { id: 5, Category: "Hope Coverage", Description: "Texas, Nevada", Last_Updated: "4.2", Status: "Home Insurance" },
//     { id: 6, Category: "Next Insurance", Description: "Florida, Texas", Last_Updated: "4.1", Status: "Auto Insurance" },
//     { id: 7, Category: "SafeLife", Description: "California, Nevada", Last_Updated: "4.6", Status: "Health Insurance" },
// ];

export default function ProvidersTable() {

    const { data } = useAllPolicyQuery({});

    console.log(data?.data)


    const initialProviders: AllPolicyApiResponse[] = data?.data || [];





    const [search, setSearch] = useState("");
    const [policyFilter, setPolicyFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filtered providers
    const filteredProviders = initialProviders.filter((p) => {
        const matchesSearch = p.slug.toLowerCase().includes(search.toLowerCase());
        const matchesPolicy = policyFilter === "All" ? true : p.status === policyFilter;
        const matchesStatus = statusFilter === "All" ? true : statusFilter === "Sponsored" ? p.status : !p.description;
        return matchesSearch && matchesPolicy && matchesStatus;
    });

    // Pagination logic

    const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
    const paginatedProviders = filteredProviders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // Modals
    const [policyViewModal, setPolicyViewModal] = useState(false);
    const [uploadPolicyModal, setUploadPolicyModal] = useState(false);
    const [policyUpdateModal, setPolicyUpdateModal] = useState(false);



    const [policyId, setPolicyId] = useState<string>();


    const handlePolicyModal = (slgu: string) => {
        setPolicyViewModal(true)
        setPolicyId(slgu)
    };


    const [policyDelete] = usePolicyDeleteMutation();


    const handleDeletePolicy = async (slug: string) => {
        try {

            const res = await deleteAlert();

            if (res.isConfirmed) {
                const res = await policyDelete(slug);

                if (res) {
                    console.log(res)
                    toast.success((res as { data?: { message?: string } })?.data?.message || "Policy deleted successfully");
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


    const [policySlug, setPolicySlug] = useState<string>()


    const handlePolicyUpdate = (slug: string) => {
        setPolicyUpdateModal(true)
        setPolicySlug(slug)

    }






    return (
        <>
            <div className="bg-[#FAF5EC] pb-14 pt-5 px-8 shadow shadow-[#00000033] rounded-[12px]">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-[27px] font-normal">Status</h1>
                    <button
                        onClick={() => setUploadPolicyModal(true)}
                        className="cursor-pointer flex flex-row items-center gap-x-2.5 py-2 px-5 border border-[#D09A40] bg-[#D09A40] rounded-[34px] text-xl font-normal text-white"
                    >
                        <span>+</span> Add New Policy Category
                    </button>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-row justify-between gap-4 mb-8 mt-8">
                    <div className="flex items-center border border-[#B9B9B9] w-2xl rounded-[6px] px-3 py-2">
                        <FiSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search provider..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full focus:outline-none bg-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-x-6">
                        <select
                            value={policyFilter}
                            onChange={(e) => setPolicyFilter(e.target.value)}
                            className="border border-[#B9B9B9] rounded-[6px] px-3 py-2 text-[#686868]"
                        >
                            <option value="All">All Status</option>
                            <option value="Auto Insurance">Auto Insurance</option>
                            <option value="Health Insurance">Health Insurance</option>
                            <option value="Home Insurance">Home Insurance</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-[#B9B9B9] rounded-[6px] px-3 py-2 text-[#686868]"
                        >
                            <option value="All">All Status</option>
                            <option value="Sponsored">Sponsored</option>
                            <option value="Not Sponsored">Not Sponsored</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-[16px] font-normal text-[#000000]">Category</th>
                                <th className="px-4 py-2 text-left text-[16px] font-normal text-[#000000]">Description</th>
                                <th className="px-4 py-2 text-left text-[16px] font-normal text-[#000000]">Last Updated</th>
                                <th className="px-4 py-2 text-left text-[16px] font-normal text-[#000000]">Status</th>
                                <th className="px-4 py-2 text-left text-[16px] font-normal text-[#000000]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#989DA3] pb-3 mb-3">
                            {paginatedProviders.length > 0 ? (
                                paginatedProviders.map((p) => (
                                    <tr key={p.id}>
                                        <td className="px-4 py-2 text-lg text-[#000000] font-normal pb-4 flex items-center gap-x-4">
                                            <Image src={p.logo_url} width={1000} height={1000} alt="" className=" w-20 h-8 object-cover  " />
                                            <p>{p.slug}</p>
                                        </td>
                                        <td className="px-4 py-2 text-[#000000] text-lg font-thin">
                                            {p.description
                                                ? new DOMParser().parseFromString(p.description, "text/html").body.textContent?.slice(0, 20)
                                                : ""}...
                                        </td>
                                        <td className="px-4 py-2 text-[#000000] text-lg font-thin">{p?.updated_at}</td>
                                        <td className="px-4 py-2 text-[#000000] text-lg font-thin">
                                            <button className="py-1 px-3.5 bg-[#C8FFD1] text-sm text-[#24983F] rounded-[4px] cursor-pointer">{p.status}</button>
                                        </td>
                                        <td className="px-4 py-2 flex flex-row items-center gap-x-3">
                                            <button onClick={() => handlePolicyModal(p.slug)} className="cursor-pointer border border-[#989DA3] rounded-[6px] px-3 py-2">
                                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.275 12.296C1.425 11.192 1 10.639 1 9C1 7.36 1.425 6.809 2.275 5.704C3.972 3.5 6.818 1 11 1C15.182 1 18.028 3.5 19.725 5.704C20.575 6.81 21 7.361 21 9C21 10.64 20.575 11.191 19.725 12.296C18.028 14.5 15.182 17 11 17C6.818 17 3.972 14.5 2.275 12.296Z" stroke="#697079" />
                                                    <path d="M14 9C14 9.79565 13.6839 10.5587 13.1213 11.1213C12.5587 11.6839 11.7956 12 11 12C10.2044 12 9.44129 11.6839 8.87868 11.1213C8.31607 10.5587 8 9.79565 8 9C8 8.20435 8.31607 7.44129 8.87868 6.87868C9.44129 6.31607 10.2044 6 11 6C11.7956 6 12.5587 6.31607 13.1213 6.87868C13.6839 7.44129 14 8.20435 14 9Z" stroke="#697079" />
                                                </svg>

                                            </button>
                                            <button onClick={() => handlePolicyUpdate(p.slug)} className="cursor-pointer border border-[#989DA3] rounded-[6px] px-3 py-2">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.533 9.14991C7.36388 9.31905 7.22976 9.51986 7.13831 9.74086C7.04685 9.96187 6.99985 10.1987 7 10.4379V12.9999H9.578C10.061 12.9999 10.525 12.8079 10.867 12.4659L18.467 4.86191C18.6365 4.69285 18.7709 4.49202 18.8627 4.27092C18.9544 4.04982 19.0016 3.81279 19.0016 3.57341C19.0016 3.33404 18.9544 3.09701 18.8627 2.87591C18.7709 2.65481 18.6365 2.45397 18.467 2.28491L17.716 1.53391C17.5469 1.36429 17.346 1.22971 17.1248 1.13788C16.9036 1.04605 16.6665 0.998779 16.427 0.998779C16.1875 0.998779 15.9504 1.04605 15.7292 1.13788C15.508 1.22971 15.3071 1.36429 15.138 1.53391L7.533 9.14991Z" stroke="#697079" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M19 10C19 14.243 19 16.364 17.682 17.682C16.364 19 14.242 19 10 19C5.758 19 3.636 19 2.318 17.682C1 16.364 1 14.242 1 10C1 5.758 1 3.636 2.318 2.318C3.636 1 5.758 1 10 1" stroke="#697079" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </button>
                                            <button onClick={() => { handleDeletePolicy(p.slug) }} className="cursor-pointer border border-[#E04F4F] rounded-[6px] px-3 py-2">
                                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.61601 16C2.17134 16 1.79101 15.8416 1.47501 15.525C1.15901 15.2083 1.00067 14.8286 1.00001 14.386V1.99998H0.500007C0.358007 1.99998 0.23934 1.95198 0.144007 1.85598C0.0486736 1.75998 0.000673516 1.64098 6.84931e-06 1.49898C-0.000659817 1.35698 0.0473402 1.23831 0.144007 1.14298C0.240674 1.04765 0.35934 0.99998 0.500007 0.99998H4.00001C4.00001 0.793314 4.07667 0.613314 4.23001 0.45998C4.38334 0.306647 4.56334 0.22998 4.77001 0.22998H9.23001C9.43667 0.22998 9.61667 0.306647 9.77001 0.45998C9.92334 0.613314 10 0.793314 10 0.99998H13.5C13.642 0.99998 13.7607 1.04798 13.856 1.14398C13.9513 1.23998 13.9993 1.35898 14 1.50098C14.0007 1.64298 13.9527 1.76165 13.856 1.85698C13.7593 1.95231 13.6407 1.99998 13.5 1.99998H13V14.385C13 14.829 12.8417 15.209 12.525 15.525C12.2083 15.841 11.8283 15.9993 11.385 16H2.61601ZM12 1.99998H2.00001V14.385C2.00001 14.5643 2.05767 14.7116 2.17301 14.827C2.28834 14.9423 2.43601 15 2.61601 15H11.385C11.5643 15 11.7117 14.9423 11.827 14.827C11.9423 14.7116 12 14.5643 12 14.385V1.99998ZM5.30801 13C5.45001 13 5.56901 12.952 5.66501 12.856C5.76101 12.76 5.80867 12.6413 5.80801 12.5V4.49998C5.80801 4.35798 5.76001 4.23931 5.66401 4.14398C5.56801 4.04865 5.44901 4.00065 5.30701 3.99998C5.16501 3.99931 5.04634 4.04731 4.95101 4.14398C4.85567 4.24065 4.80801 4.35931 4.80801 4.49998V12.5C4.80801 12.642 4.85601 12.7606 4.95201 12.856C5.04801 12.952 5.16667 13 5.30801 13ZM8.69301 13C8.83501 13 8.95367 12.952 9.04901 12.856C9.14434 12.76 9.19201 12.6413 9.19201 12.5V4.49998C9.19201 4.35798 9.14401 4.23931 9.04801 4.14398C8.95201 4.04798 8.83334 3.99998 8.69201 3.99998C8.55001 3.99998 8.43101 4.04798 8.33501 4.14398C8.23901 4.23998 8.19134 4.35865 8.19201 4.49998V12.5C8.19201 12.642 8.24001 12.7606 8.33601 12.856C8.43201 12.9513 8.55101 12.9993 8.69301 13Z" fill="#E04F4F" />
                                                </svg>

                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                        No providers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>
            {/* Pagination Controls */}
            <div className="mt-24">
                {totalPages > 0 && (
                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || filteredProviders.length === 0}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.843002 7.71114L6.5 13.3681L7.914 11.9541L2.964 7.00414L7.914 2.05414L6.5 0.640137L0.843002 6.29714C0.655531 6.48466 0.550215 6.73897 0.550215 7.00414C0.550215 7.2693 0.655531 7.52361 0.843002 7.71114Z" fill="#1E1E1E" />
                            </svg>

                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={filteredProviders.length === 0}
                                className={`px-3 py-1 border rounded ${currentPage === page ? "bg-[#D09A40] text-white" : ""
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || filteredProviders.length === 0}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.15706 7.71114L1.50006 13.3681L0.0860596 11.9541L5.03606 7.00414L0.0860596 2.05414L1.50006 0.640137L7.15706 6.29714C7.34453 6.48466 7.44985 6.73897 7.44985 7.00414C7.44985 7.2693 7.34453 7.52361 7.15706 7.71114Z" fill="#1E1E1E" />
                            </svg>

                        </button>
                    </div>
                )}
            </div>

            {policyViewModal && <PolicyView policyId={policyId} policyViewModal={policyViewModal} setPolicyViewModal={setPolicyViewModal} />}
            {uploadPolicyModal && <AddPolicy uploadPolicyModal={uploadPolicyModal} setUploadPolicyModal={setUploadPolicyModal} />}
            {policyUpdateModal && <PolicyUpdate policySlug={policySlug} policyUpdateModal={policyUpdateModal} setPolicyUpdateModal={setPolicyUpdateModal} />}
        </>
    );
}
