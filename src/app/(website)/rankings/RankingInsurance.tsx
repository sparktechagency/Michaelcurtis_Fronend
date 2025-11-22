"use client"
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'


// state 
type StateType = {
    name: string
}



import { Checkbox } from '@/components/ui/checkbox';
import TopThree from './TopThree';
import Link from 'next/link';
import { TopInsuranceType } from '@/utility/types/admin/insurance-provider/providerType';
import { useRankingInsuranceSearchQuery } from '@/app/api/website/insurance/webInsuranceApi';
import { useAllStateQuery } from '@/app/api/admin/insuranceApi';
import { AllPolicyApiResponse } from '@/utility/types/admin/policy/policyType';
import Image from 'next/image';
import { useWebAllPolicyQuery } from '@/app/api/website/policy/webPolicyApi';
import RankingSkeleton from '@/app/components/skeleton/RankingSkeleton';



const RankingInsurance = () => {
    // auto 

    const [selected, setSelected] = useState<string | undefined>("");
    const [open, setOpen] = useState(false);


    const autoDropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autoDropdownRef.current && !autoDropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);







    // state 
    const [selectedState, setSelectedState] = useState<string>("");
    const [openState, setOpenState] = useState(false);




    const stateDropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
                setOpenState(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);











    // rating 

    const [score, setScore] = useState("");




    // price 

    const priceList: number[] = [50, 100, 200, 500, 1000];


    const [selectedPrice, setSelectedPrice] = useState<number | null>(0);
    const [openPrice, setOpenPrice] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenPrice(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);









    const [selectedInsurers, setselectedInsurers] = React.useState<TopInsuranceType[]>([]);
    const [openCompareModal, setOpenCompareModal] = React.useState(false);

    // ✅ Checkbox toggle handler
    const handleCompareChange = (data: TopInsuranceType, checked: boolean) => {
        const stored = localStorage.getItem("selectedInsurers");
        const prevSelected: TopInsuranceType[] = stored ? JSON.parse(stored) : [];

        let newSelected: TopInsuranceType[];

        if (checked) {
            // ✅ Add if not exists
            if (!prevSelected.some(i => i.id === data.id)) {
                newSelected = [...prevSelected, data];
            } else {
                newSelected = prevSelected;
            }
        } else {
            // ✅ Remove if unchecked
            newSelected = prevSelected.filter(i => i.id !== data.id);
        }

        // Update state + LocalStorage
        setselectedInsurers(newSelected);
        localStorage.setItem("selectedInsurers", JSON.stringify(newSelected));

        // Modal open condition
        if (newSelected.length > 0 && !openCompareModal) {
            setOpenCompareModal(true);
        }
    };

    React.useEffect(() => {
        const stored = localStorage.getItem("selectedInsurers");
        if (stored) {
            try {
                const parsed: TopInsuranceType[] = JSON.parse(stored);
                setselectedInsurers(parsed);
                if (parsed.length > 0) setOpenCompareModal(true);
            } catch (error) {
                console.error("Failed to parse localStorage:", error);
            }
        }
    }, []);

    const closeModal = () => {
        setOpenCompareModal(false);  // modal close
        setselectedInsurers([]);             // checkbox uncheck, state empty
        localStorage.removeItem("selectedInsurers"); // LocalStorage clear
    };


    // all policy 


    const { data } = useWebAllPolicyQuery({});

    const policyPolicy: AllPolicyApiResponse[] = data?.data || [];




    // all state 


    const { data: allState } = useAllStateQuery({});


    const stateData: StateType[] = allState?.data || [];



    const { data: insurance, isLoading } = useRankingInsuranceSearchQuery({ score, selectedPrice, selectedState, selected });


    const insuranceData: TopInsuranceType[] = insurance?.data || [];






    const handleClear = () => {

        // setSelectedPolicies([""])
        setSelected("");
        setScore("");
        setSelectedPrice(0)
        setSelectedState("");
    }




    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Skip first 3 items
    const slicedData = insuranceData.slice(0);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentItems = slicedData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(slicedData.length / itemsPerPage);



    if (isLoading) {
        return (
            <div>
                <RankingSkeleton />
            </div>
        )
    }






    return (
        <>
            <div className=' pt-3 lg:pt-5 pb-10 lg:pb-20 ' >
                <div className=' max-w-7xl mx-auto lg:px-4 ' >
                    <div className=' flex flex-wrap gap-y-7 px-3 gap-x-8  ' >
                        {/* policy  */}
                        <div ref={autoDropdownRef} className="relative w-92 z-40 ">
                            {/* Dropdown button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-full flex justify-between items-center px-4 py-2 border border-[#697079] rounded-lg bg-white shadow-sm text-gray-700 hover:border-gray-400 focus:outline-none"
                            >
                                <span className="capitalize">{selected ? selected : "All Policy"}</span>
                                <ChevronDown
                                    className={`h-5 w-5 cursor-pointer text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {open && (
                                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {policyPolicy.map((option) => (
                                        <li
                                            key={option.id}
                                            onClick={() => {
                                                setSelected(option.name);
                                                setOpen(false);
                                            }}
                                            className={`px-4 py-2 cursor-pointer capitalize textColor font-normal lg:text-xl text-[16px] hover:bg-gray-100 ${selected === option?.name ? "bg-gray-100 font-normal" : ""
                                                }`}
                                        >
                                            {option.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* state  */}

                        <div ref={stateDropdownRef} className="relative w-40 z-40 ">
                            {/* Dropdown button */}
                            <button
                                onClick={() => setOpenState(!openState)}
                                className="w-full flex justify-between items-center px-4 py-2 border border-[#697079] rounded-lg bg-white shadow-sm text-gray-700 hover:border-gray-400 focus:outline-none"
                            >
                                <span className="capitalize">{selectedState ? selectedState : "All State"}</span>
                                <ChevronDown
                                    className={`h-5 w-5 cursor-pointer text-gray-500 transition-transform duration-200 ${openState ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {openState && (
                                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {stateData.map((option) => (
                                        <li
                                            key={option.name}
                                            onClick={() => {
                                                setSelectedState(option.name);
                                                setOpenState(false);
                                            }}
                                            className={`px-4 py-2 cursor-pointer textColor font-normal lg:text-xl text-[16px]  capitalize hover:bg-gray-100 ${selectedState === option.name ? "bg-gray-100 font-normal" : ""
                                                }`}
                                        >
                                            {option.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        {/* rating  */}


                        <div className="flex items-center gap-4  rounded-lg px-4 py-2  border border-[#697079]  w-64  ">
                            {/* Label */}
                            <span className="text-gray-600 font-normal">Score: {score}+</span>

                            {/* Slider */}
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={score}
                                onChange={(e) => setScore((e.target.value))}
                                className="w-32 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-yellow-600"
                            />
                        </div>


                        {/* price  */}


                        <div ref={dropdownRef} className="relative z-40 w-36">
                            {/* Dropdown button */}
                            <button
                                onClick={() => setOpenPrice(!openPrice)}
                                className="w-full flex justify-between items-center px-4 py-2 border border-[#697079] rounded-lg bg-white  textColor  focus:outline-none"
                            >
                                <span>{selectedPrice !== null ? `$${selectedPrice}` : "Any Price"}</span>
                                <ChevronDown
                                    className={`h-5 w-5 cursor-pointer textColor transition-transform duration-200 ${openPrice ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {openPrice && (
                                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {priceList.map((price) => (
                                        <li
                                            key={price}
                                            onClick={() => {
                                                setSelectedPrice(price);
                                                setOpenPrice(false);
                                            }}
                                            className={`px-4 py-2 cursor-pointer  textColor font-normal lg:text-xl text-[16px]  ${selectedPrice === price ? "bg-gray-100 font-normal" : ""
                                                }`}
                                        >
                                            ${price}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* reset btn  */}

                        <button onClick={handleClear} className=' font-normal lg:text-xl text-[15px] textColor cursor-pointer  ' >
                            Reset
                        </button>
                    </div>


                    {/* top insurance  */}

                    <TopThree></TopThree>





                    <div className="space-y-4 overflow-x-auto ">
                        {currentItems.map((item, i) => (
                            <div
                                key={item.id}
                                className="flex flex-wrap items-center justify-center lg:justify-between bg-white border border-gray-300 rounded-xl p-4 shadow-[#00000033]"
                            >
                                {/* Left Section: Logo + Company Info */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-y-5 ">
                                    <div className=' flex items-center justify-center ' >
                                        <div>
                                            <span className=' text-[#D09A40] lg:text-4xl text-lg font-bold ' >#{i + 4} </span>
                                        </div>
                                        <div className="    ">

                                            <span className=' block ml-9  w-[79px] h-[82px]   ' >
                                                <Image unoptimized src={item?.logo_url} width={1000} height={1000} alt={item?.name} className={`w-[79px] h-[82px] rounded-[7px] border border-[#E9D1A7] `} />
                                            </span>

                                        </div>

                                        <div className=' ml-10 ' >
                                            <p className="font-normal lg:text-xl text-sm text-black     ">{` ${item.name.slice(0, 10)}`}...</p>
                                            <div className=' flex items-center gap-x-3   ' >
                                                <p

                                                    className={`lg:text-[28px] text-sm font-bold
                                                            ${item?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                            item?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                                item?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                                    item?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                                        "text-[#DC2626 ]"                                    // Default for E or others
                                                        }`}>

                                                    {item?.avg_grade}

                                                </p>
                                                <span>
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.7108 19.5884L6.93171 23.0698C6.67641 23.2323 6.4095 23.3019 6.13099 23.2787C5.85248 23.2555 5.60878 23.1627 5.3999 23.0002C5.19101 22.8377 5.02855 22.6349 4.9125 22.3917C4.79645 22.1484 4.77324 21.8755 4.84287 21.5728L6.37469 14.993L1.25703 10.5716C1.02494 10.3627 0.880114 10.1246 0.822555 9.85723C0.764996 9.58986 0.782171 9.32899 0.87408 9.07461C0.965989 8.82024 1.10524 8.61135 1.29185 8.44796C1.47845 8.28457 1.73375 8.18013 2.05775 8.13464L8.81166 7.5428L11.4227 1.34591C11.5388 1.0674 11.7189 0.858515 11.963 0.71926C12.2072 0.580004 12.4565 0.510376 12.7108 0.510376C12.9652 0.510376 13.2145 0.580004 13.4586 0.71926C13.7028 0.858515 13.8829 1.0674 13.9989 1.34591L16.61 7.5428L23.3639 8.13464C23.6888 8.18105 23.9441 8.2855 24.1298 8.44796C24.3155 8.61043 24.4547 8.81931 24.5476 9.07461C24.6404 9.32992 24.6581 9.59125 24.6005 9.85862C24.5429 10.126 24.3976 10.3637 24.1646 10.5716L19.047 14.993L20.5788 21.5728C20.6484 21.8745 20.6252 22.1475 20.5092 22.3917C20.3931 22.6358 20.2306 22.8387 20.0218 23.0002C19.8129 23.1617 19.5692 23.2546 19.2907 23.2787C19.0122 23.3028 18.7453 23.2332 18.4899 23.0698L12.7108 19.5884Z" fill="#FFED66" />
                                                    </svg>

                                                </span>
                                                <div className=' flex flex-col mt-2 ' >
                                                    <span className=" lg:text-lg text-xs font-bold ">{item.avg_overall_rating}</span>
                                                    <span className="  text-sm font-thin  ">Overall</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=' flex items-center lg:gap-x-4  ' >

                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-12 ">
                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.avg_claims ? item.avg_claims : "0"}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Claim</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8 ">
                                            <span className="px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.avg_service ? item.avg_service : "0"}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Service</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8 ">
                                            <span className="px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.price ? item.price : "0"}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Price</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8">
                                            <span className="px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl">{item.avg_coverage ? item.avg_coverage : "0"}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Cover</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8">
                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.avg_trust ? item.avg_trust : "0"}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Trust</span>
                                        </div>
                                    </div>


                                    <div className=' flex items-center justify-center  ' >
                                        <div>
                                            <p className=" text-[#529F22] font-bold lg:text-2xl text-[15px] ml-8 ">{item.avg_pricing ? item.avg_pricing : "0"}</p>
                                        </div>
                                        <div className=' ml-5 ' >
                                            <Link href={`/insurance-profile/${item?.slug}`}>
                                                <button className="px-2.5 py-2 bg-[#D09A40] text-white rounded-[20px] w-full cursor-pointer ">
                                                    View Profile
                                                </button>
                                            </Link>
                                        </div>
                                        <div className=' ml-7 flex items-center gap-x-3  ' >
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    id={`compare-${item.id}`}
                                                    checked={selectedInsurers.some(i => i.id === item.id)}
                                                    onCheckedChange={(checked) => handleCompareChange(item, checked as boolean)}
                                                />
                                                <span className="cursor-pointer text-[16px] text-[#697079]">
                                                    Compare
                                                </span>
                                            </label>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        ))}
                    </div>


                    {/* Pagination Controls */}
                    {insuranceData.length > itemsPerPage && (
                        <div className="flex justify-center items-center gap-3 mt-7 lg:mt-16">
                            <button
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-[#D09A40] text-white" : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}












                </div>

            </div>
            {openCompareModal && (
                (
                    <div
                        className={`
          fixed px-4 bottom-0 left-0 z-50 w-full  shadow-xl  transition-transform duration-300 ease-in-out
          
        `}
                    >
                        <div className="max-w-[1400px] bg-[#4c545f]  mx-auto  flex justify-between items-center px-9 py-6 rounded-t-[20px]  ">
                            <div className=" flex items-center gap-x-5 " >
                                <span className=" lg:text-[27px] font-bold text-sm text-white " >Comparing {selectedInsurers.length} </span>
                                <span>


                                </span>
                            </div>
                            <div className="  space-x-6 " >
                                <Link href={"/InsuranceTable"} ><button className=" text-white bg-[#D09A40] border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm " >
                                    Compare
                                </button></Link>
                                <button
                                    onClick={closeModal}
                                    className="text-white  border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )
            }
        </>
    )
}

export default RankingInsurance