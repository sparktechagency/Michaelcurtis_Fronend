"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ViewInsurance from "./ViewInsurance";
import CreateProvider from "./CreateProvider";
import { useAllPolicyQuery } from "@/app/api/admin/policyApi";
import { useAddInsuranceSponserMutation, useAllProviderQuery, useDeleteProviderMutation, useRemoveInsuranceMutation } from "@/app/api/admin/insuranceApi";
import { InsuranceProvider } from "@/utility/types/admin/insurance-provider/providerType";
import { AllPolicyApiResponse } from "@/utility/types/admin/policy/policyType";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { deleteAlert } from "@/helper/deleteAlert";
import { updateAlert } from "@/helper/updertAlert";
import ProviderUpdate from "./ProviderUpdate";





const Provider = () => {

    // Fetch all policies

    const { data: policyData } = useAllPolicyQuery({});
    const policyOptions: AllPolicyApiResponse[] = policyData?.data || [];


    // Fetch all providers
    const { data: allProviderData } = useAllProviderQuery({});



    const [providers, setProviders] = useState<InsuranceProvider[]>([]);

    // Sync providers when API data is loaded
    useEffect(() => {
        if (allProviderData?.data) {
            setProviders(allProviderData.data);
        }
    }, [allProviderData]);



    // Filters & search
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [policyFilter, setPolicyFilter] = useState<string>("");

    // Modal states
    const [viewModal, setViewModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const providersPerPage = 5;

    const filteredProviders = providers.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === ""
                ? true
                : statusFilter === "active"
                    ? p.status === "active"
                    : p.status === "inactive";

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredProviders.length / providersPerPage);
    const displayedProviders = filteredProviders.slice(
        (currentPage - 1) * providersPerPage,
        currentPage * providersPerPage
    );



    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    const [providerSlug, setProviderSlug] = useState<string | undefined>();

    const handleOpenModal = (slug: string) => {
        setViewModal(true);
        setProviderSlug(slug)
    }



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
    };


    const [addInsuranceSponser] = useAddInsuranceSponserMutation();



    const handleSponserAdd = async (slug: string) => {
        const payload = new FormData();
        payload.append("is_sponsored", "1");
        payload.append("_method", "PUT");

        try {

            const res = await updateAlert();

            if (res?.isConfirmed) {
                const res = await addInsuranceSponser({ slug, payload }).unwrap();
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

    const [removeInsurance] = useRemoveInsuranceMutation();


    const handleRemoveInsurance = async (slug: string) => {
        const payload = new FormData();
        payload.append("is_sponsored", "0");
        payload.append("_method", "PUT");

        try {

            const res = await updateAlert();

            if (res?.isConfirmed) {
                const res = await removeInsurance({ slug, payload }).unwrap();
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


    const [updateModal, setUpdateModal] = useState<boolean>(false);


    const handleInsuranceUpdate = (slug: string) => {
        setUpdateModal(true);
        setProviderSlug(slug)
    }












    return (
        <>
            <div className=" bg-[#FAF5EC] px-7 pt-5 pb-6 shadow shadow-[#00000033] rounded-[12px]  ">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-center   mb-7 ">
                    <h2 className=" lg:text-3xl text-lg text-[#000000] font-normal ">Provider Directory</h2>
                    <button
                        onClick={() => setAddModal(true)}
                        className=" border border-[#D09A40] bg-[#D09A40] py-2 px-5 rounded-[34px] lg:text-xl text-sm font-normal text-white cursor-pointer "
                    >
                        + Add New Provider
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 gap-x-6 mb-4 justify-between ">
                    <div className="relative w-full lg:w-1/3">
                        <input
                            type="text"
                            placeholder="Search Providers...."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-[#B9B9B9] rounded-[6px] px-10 py-2 w-2xl focus:outline-none"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    <div className=" flex gap-x-10 " >
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-[#B9B9B9] rounded-[6px] px-10 py-2 text-[#686868] text-[16px] font-normal    "
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select
                            value={policyFilter}
                            onChange={(e) => setPolicyFilter(e.target.value)}
                            className="border border-[#B9B9B9] rounded-[6px] px-10 py-2 text-[#686868] text-[16px] font-normal"
                        >
                            {/* Default option */}
                            <option value="">All Policies</option>

                            {/* Dynamic options */}
                            {policyOptions.map((policy, index) => (
                                <option key={index} value={policy.name}>
                                    {policy.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto   rounded-md w-full mt-8 ">
                    <table className="min-w-full table-auto">
                        <thead className="sticky top-0">
                            <tr className=" text-[#000000] text-[16px] border-b border-[#989DA3]" >
                                <th className="px-6 py-3 text-left">Provider</th>
                                <th className="px-6 py-3 text-left">States</th>
                                <th className="px-6 py-3 text-left">Avg. Score</th>
                                <th className="px-6 py-3 text-left">Policies</th>
                                <th className="px-6 py-3 text-left">Sponsored</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProviders.map((provider, index) => (
                                <tr key={index} className="border-b border-[#989DA3] ">
                                    <td className="px-6 py-3">
                                        <div className=" flex flex-row items-center gap-x-2  " >
                                            <Image  unoptimized src={provider?.logo_url} width={2000} height={2000} alt="" className=" w-10 h-10 rounded-full " />
                                            <p className=" text-[#000000] font-thin text-[16px] " >
                                                {provider.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-[#000000] font-thin text-[16px]  ">{provider.states_count}</td>
                                    <td className="px-6 py-3  ">
                                        <div className=" flex items-center gap-x-1  " >
                                            <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00012 1.30835C8.06569 1.30838 8.13972 1.3251 8.22864 1.37573C8.26692 1.39757 8.30107 1.42751 8.3302 1.47632L8.35852 1.53296L10.0773 5.61206L10.2013 5.90698L10.5206 5.9353L14.9415 6.32202C15.0835 6.34288 15.1442 6.38208 15.1671 6.4021C15.2152 6.44424 15.2585 6.50403 15.2921 6.59644C15.3188 6.66982 15.3238 6.74016 15.3068 6.81909C15.2958 6.86986 15.2664 6.93074 15.1847 7.00366L11.8234 9.90894L11.5802 10.1179L11.6534 10.4304L12.6613 14.7605V14.7615C12.6842 14.861 12.671 14.9159 12.6534 14.9529C12.612 15.04 12.5573 15.1069 12.4874 15.1609C12.4354 15.2011 12.3733 15.2275 12.2853 15.2351C12.2287 15.24 12.1682 15.2295 12.09 15.1794L12.0841 15.1755L12.0782 15.1726L8.27356 12.8806L8.00012 12.7156L7.72571 12.8806L3.922 15.1716L3.91028 15.1794C3.83185 15.2292 3.77073 15.2399 3.71301 15.2351C3.62636 15.2279 3.56527 15.2019 3.51379 15.1619C3.44275 15.1066 3.38731 15.0389 3.34583 14.9519C3.32891 14.9164 3.31534 14.8622 3.33801 14.7625L4.3468 10.4304L4.41907 10.1179L4.1759 9.90894L0.807739 6.9978C0.731934 6.92731 0.704257 6.86808 0.693481 6.81812C0.676318 6.73839 0.681936 6.66807 0.70813 6.59546C0.740877 6.50483 0.78401 6.44517 0.83313 6.4021C0.856721 6.38144 0.916945 6.34227 1.05676 6.32202L5.47961 5.9353L5.79895 5.90698L5.92297 5.61206L7.64172 1.53296L7.67004 1.47632C7.69914 1.42763 7.73241 1.39754 7.77063 1.37573C7.85981 1.32487 7.93441 1.30835 8.00012 1.30835Z" fill="#FEE453" stroke="#BD8C3A" strokeWidth="1.0623" />
                                            </svg>
                                            </span>
                                            <p>{provider.formatted_overall_avg_score}</p>
                                        </div>

                                    </td>
                                    <td className="px-6 py-3 text-[#000000] font-thin text-[16px]">
                                        {provider?.policies[0]?.name.slice(0, 10)}...
                                        {provider?.policies[1]?.name.slice(0, 10)}...
                                    </td>
                                    <td className="px-6 py-3  ">
                                        {
                                            provider?.is_sponsored ? <>


                                                <span onClick={() => { handleRemoveInsurance(provider?.slug) }} className=" cursor-pointer " >
                                                    <svg width="67" height="27" viewBox="0 0 67 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_409_1662)">
                                                            <rect y="0.5" width="67" height="26" rx="13" fill="#45E03C" />
                                                            <g filter="url(#filter0_d_409_1662)">
                                                                <circle cx="52.5" cy="14" r="9.5" fill="white" />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <filter id="filter0_d_409_1662" x="35.7" y="-2.8" width="33.6" height="33.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset />
                                                                <feGaussianBlur stdDeviation="3.65" />
                                                                <feComposite in2="hardAlpha" operator="out" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_409_1662" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_409_1662" result="shape" />
                                                            </filter>
                                                            <clipPath id="clip0_409_1662">
                                                                <rect y="0.5" width="67" height="26" rx="13" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </span>



                                            </> :
                                                <>
                                                    <span onClick={() => { handleSponserAdd(provider?.slug) }} className=" cursor-pointer " >
                                                        <svg width="67" height="27" viewBox="0 0 67 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_409_1758)">
                                                                <rect y="0.5" width="67" height="26" rx="13" fill="#ADB4AC" />
                                                                <g filter="url(#filter0_d_409_1758)">
                                                                    <circle cx="14.5" cy="14" r="9.5" fill="white" />
                                                                </g>
                                                            </g>
                                                            <defs>
                                                                <filter id="filter0_d_409_1758" x="-2.3" y="-2.8" width="33.6" height="33.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                    <feOffset />
                                                                    <feGaussianBlur stdDeviation="3.65" />
                                                                    <feComposite in2="hardAlpha" operator="out" />
                                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_409_1758" />
                                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_409_1758" result="shape" />
                                                                </filter>
                                                                <clipPath id="clip0_409_1758">
                                                                    <rect y="0.5" width="67" height="26" rx="13" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </span>

                                                </>
                                        }
                                    </td>
                                    <td className="px-6 py-3 flex gap-2">
                                        <button
                                            onClick={() => { handleOpenModal(provider?.slug) }}
                                            className=" border border-[#989DA3] rounded-[6px] px-2 py-1 cursor-pointer "
                                        >
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.275 15.796C2.425 14.692 2 14.139 2 12.5C2 10.86 2.425 10.309 3.275 9.204C4.972 7 7.818 4.5 12 4.5C16.182 4.5 19.028 7 20.725 9.204C21.575 10.31 22 10.861 22 12.5C22 14.14 21.575 14.691 20.725 15.796C19.028 18 16.182 20.5 12 20.5C7.818 20.5 4.972 18 3.275 15.796Z" stroke="#697079" />
                                                <path d="M15 12.5C15 13.2956 14.6839 14.0587 14.1213 14.6213C13.5587 15.1839 12.7956 15.5 12 15.5C11.2044 15.5 10.4413 15.1839 9.87868 14.6213C9.31607 14.0587 9 13.2956 9 12.5C9 11.7044 9.31607 10.9413 9.87868 10.3787C10.4413 9.81607 11.2044 9.5 12 9.5C12.7956 9.5 13.5587 9.81607 14.1213 10.3787C14.6839 10.9413 15 11.7044 15 12.5Z" stroke="#697079" />
                                            </svg>

                                        </button>
                                        <button
                                            onClick={() => { handleInsuranceUpdate(provider?.slug) }}
                                            className=" border border-[#989DA3] rounded-[6px] px-2 py-1 cursor-pointer "
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.533 9.15016C7.36388 9.31929 7.22976 9.5201 7.13831 9.74111C7.04685 9.96211 6.99985 10.199 7 10.4382V13.0002H9.578C10.061 13.0002 10.525 12.8082 10.867 12.4662L18.467 4.86216C18.6365 4.6931 18.7709 4.49227 18.8627 4.27117C18.9544 4.05006 19.0016 3.81304 19.0016 3.57366C19.0016 3.33428 18.9544 3.09725 18.8627 2.87615C18.7709 2.65505 18.6365 2.45422 18.467 2.28516L17.716 1.53416C17.5469 1.36454 17.346 1.22995 17.1248 1.13812C16.9036 1.04629 16.6665 0.999023 16.427 0.999023C16.1875 0.999023 15.9504 1.04629 15.7292 1.13812C15.508 1.22995 15.3071 1.36454 15.138 1.53416L7.533 9.15016Z" stroke="#697079" stroke-linecap="round" strokeLinejoin="round" />
                                                <path d="M19 10C19 14.243 19 16.364 17.682 17.682C16.364 19 14.242 19 10 19C5.758 19 3.636 19 2.318 17.682C1 16.364 1 14.242 1 10C1 5.758 1 3.636 2.318 2.318C3.636 1 5.758 1 10 1" stroke="#697079" stroke-linecap="round" strokeLinejoin="round" />
                                            </svg>


                                        </button>
                                        <button
                                            onClick={() => { handleDeleteInsurance(provider?.slug) }}
                                            className="border border-[#E04F4F] rounded-[6px] px-3 py-1 cursor-pointer"
                                        >
                                            <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.61601 16.5C2.17134 16.5 1.79101 16.3416 1.47501 16.025C1.15901 15.7083 1.00067 15.3286 1.00001 14.886V2.49998H0.500007C0.358007 2.49998 0.23934 2.45198 0.144007 2.35598C0.0486736 2.25998 0.000673516 2.14098 6.84931e-06 1.99898C-0.000659817 1.85698 0.0473402 1.73831 0.144007 1.64298C0.240674 1.54765 0.35934 1.49998 0.500007 1.49998H4.00001C4.00001 1.29331 4.07667 1.11331 4.23001 0.95998C4.38334 0.806647 4.56334 0.72998 4.77001 0.72998H9.23001C9.43667 0.72998 9.61667 0.806647 9.77001 0.95998C9.92334 1.11331 10 1.29331 10 1.49998H13.5C13.642 1.49998 13.7607 1.54798 13.856 1.64398C13.9513 1.73998 13.9993 1.85898 14 2.00098C14.0007 2.14298 13.9527 2.26165 13.856 2.35698C13.7593 2.45231 13.6407 2.49998 13.5 2.49998H13V14.885C13 15.329 12.8417 15.709 12.525 16.025C12.2083 16.341 11.8283 16.4993 11.385 16.5H2.61601ZM12 2.49998H2.00001V14.885C2.00001 15.0643 2.05767 15.2116 2.17301 15.327C2.28834 15.4423 2.43601 15.5 2.61601 15.5H11.385C11.5643 15.5 11.7117 15.4423 11.827 15.327C11.9423 15.2116 12 15.0643 12 14.885V2.49998ZM5.30801 13.5C5.45001 13.5 5.56901 13.452 5.66501 13.356C5.76101 13.26 5.80867 13.1413 5.80801 13V4.99998C5.80801 4.85798 5.76001 4.73931 5.66401 4.64398C5.56801 4.54865 5.44901 4.50065 5.30701 4.49998C5.16501 4.49931 5.04634 4.54731 4.95101 4.64398C4.85567 4.74065 4.80801 4.85931 4.80801 4.99998V13C4.80801 13.142 4.85601 13.2606 4.95201 13.356C5.04801 13.452 5.16667 13.5 5.30801 13.5ZM8.69301 13.5C8.83501 13.5 8.95367 13.452 9.04901 13.356C9.14434 13.26 9.19201 13.1413 9.19201 13V4.99998C9.19201 4.85798 9.14401 4.73931 9.04801 4.64398C8.95201 4.54798 8.83334 4.49998 8.69201 4.49998C8.55001 4.49998 8.43101 4.54798 8.33501 4.64398C8.23901 4.73998 8.19134 4.85865 8.19201 4.99998V13C8.19201 13.142 8.24001 13.2606 8.33601 13.356C8.43201 13.4513 8.55101 13.4993 8.69301 13.5Z" fill="#E04F4F" />
                                            </svg>

                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {displayedProviders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No providers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>



                {/* View Modal */}
                {viewModal && (
                    <ViewInsurance viewModal={viewModal} setViewModal={setViewModal} providerSlug={providerSlug} ></ViewInsurance>
                )}

                {/* Add Modal */}
                {addModal && (
                    <CreateProvider setAddModal={setAddModal} addModal={addModal} ></CreateProvider>
                )}
                {/* update modal  */}
                {
                    updateModal && (
                        <ProviderUpdate updateModal={updateModal} setUpdateModal={setUpdateModal} providerSlug={providerSlug} />
                    )
                }
            </div>










            {/* Pagination */}
            <div className="flex justify-center mt-24 gap-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1 || totalPages === 0}
                    className={`px-3 py-1 border rounded shadow-sm 
      ${currentPage === 1 || totalPages === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-100"}`}
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
                            d="M0.843002 7.71102L6.5 13.368L7.914 11.954L2.964 7.00401L7.914 2.05401L6.5 0.640015L0.843002 6.29701C0.655531 6.48454 0.550215 6.73885 0.550215 7.00401C0.550215 7.26918 0.655531 7.52349 0.843002 7.71102Z"
                            fill="#1E1E1E"
                        />
                    </svg>
                </button>

                {/* Page Numbers */}
                {totalPages > 0 &&
                    Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`px-3 py-1 border rounded shadow shadow-[#00000040] 
          ${currentPage === i + 1
                                    ? "bg-[#D09A40] text-white cursor-default"
                                    : "cursor-pointer hover:bg-gray-100"}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                {/* Next Button */}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`px-3 py-1 border rounded shadow-sm 
      ${currentPage === totalPages || totalPages === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-100"}`}
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
                            d="M7.15706 7.71102L1.50006 13.368L0.0860596 11.954L5.03606 7.00401L0.0860596 2.05401L1.50006 0.640015L7.15706 6.29701C7.34453 6.48454 7.44985 6.73885 7.44985 7.00401C7.44985 7.26918 7.34453 7.52349 7.15706 7.71102Z"
                            fill="#1E1E1E"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Provider;
