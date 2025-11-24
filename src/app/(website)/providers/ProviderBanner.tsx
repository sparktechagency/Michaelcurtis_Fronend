"use client"
import { useAllStateQuery } from '@/app/api/admin/insuranceApi';
import { useSearchInsuranceQuery } from '@/app/api/website/insurance/webInsuranceApi';
import { useWebAllPolicyQuery } from '@/app/api/website/policy/webPolicyApi';
import MaxWidth from '@/app/components/max-width/MaxWidth'
import ProviderSkeleton from '@/app/components/skeleton/ProviderSkeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { TopInsuranceType } from '@/utility/types/admin/insurance-provider/providerType';
import { AllPolicyApiResponse } from '@/utility/types/admin/policy/policyType';

import { ChevronDown, LucideSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa6';
type StateType = {
    id: number;
    name: string;
    code: string
}

const ProviderBanner = () => {
    const [query, setQuery] = useState("");










    // state 

    const [selectedState, setSelectedState] = useState("");

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



    // policy 


    const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

    const handleSelectPolicy = (policyName: string) => {
        if (selectedPolicies.includes(policyName)) {
            // Remove from selected
            setSelectedPolicies(selectedPolicies.filter((p) => p !== policyName));
        } else {
            // Add to selected
            setSelectedPolicies([...selectedPolicies, policyName]);
        }
    };



    // rating 






    // price 

    const priceList: number[] = [50, 100, 200, 500, 1000, 1100, 1200];

    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [openPrice, setOpenPrice] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);






    const [score, setScore] = useState<number | string>("");



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










    // compare 





    const [selected, setSelected] = React.useState<TopInsuranceType[]>([]);
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
        setSelected(newSelected);
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
                setSelected(parsed);
                if (parsed.length > 0) setOpenCompareModal(true);
            } catch (error) {
                console.error("Failed to parse localStorage:", error);
            }
        }
    }, []);

    const closeModal = () => {
        setOpenCompareModal(false);  // modal close
        setSelected([]);             // checkbox uncheck, state empty
        localStorage.removeItem("selectedInsurers"); // LocalStorage clear
    };



    // all policy 


    const { data } = useWebAllPolicyQuery({});

    const policyPolicy: AllPolicyApiResponse[] = data?.data || [];


    // all state 


    const { data: allState } = useAllStateQuery({});


    const stateData: StateType[] = allState?.data || [];



    const { data: insurance, isLoading } = useSearchInsuranceQuery({ query, selectedPrice, selectedPolicies, score, selectedState });
    // const { data: insurance } = useWebAllInsuranceQuery([]);


    const allInsuranceData: TopInsuranceType[] = insurance?.data || [];






    const handleClear = () => {
        setQuery("");
        setSelectedPolicies([""])
        setScore("");
        setSelectedPrice(0)
        setSelectedState("");
    }


    if (isLoading) {
        return (
            <div>
                <ProviderSkeleton />
            </div>
        )
    }








    return (
        <div>
            <MaxWidth>
                <div className=' flex flex-col md:flex-row gap-x-6 my-10  lg:space-y-0 space-y-6 mb-20 ' >
                    {/* left side  */}
                    <div className=' md:max-w-[20%]  flex-1 p-6 shadow shadow-[#00000033] w-full h-[80vh] ' >
                        <div className=' flex justify-between ' >
                            <h1 className=' lg:text-2xl text-sm font-normal ' >Filters</h1>
                            <p onClick={handleClear} className='lg:text-2xl  cursor-pointer font-normal text-[#D09A40] lg:text-[16px] text-xs ' >Clear all</p>
                        </div>
                        {/* search  */}
                        <div className=' lg:mt-5 mt-3 ' >
                            <div

                                className="w-full max-w-md mx-auto relative"
                            >
                                {/* Search Input */}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search providers..."
                                    className="w-full pl-12 pr-4 py-3 rounded-[3px] border border-[#989DA3] focus:outline-none focus:ring-0 transition"
                                />

                                {/* Search Icon */}
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <LucideSearch size={20} />
                                </span>
                            </div>
                        </div>
                        {/* Policy Type */}

                        {/* policy */}
                        <div className='   ' >
                            <h1 className='mt-5 font-normal lg:text-lg text-black'>Policy Type</h1>

                            <div className='h-52 overflow-y-scroll' >
                                {policyPolicy.map((type, index) => (
                                    <div key={index} className='flex items-center gap-x-3  mt-4'>
                                        <label className="text-[#697079] font-normal cursor-pointer flex items-center gap-x-2">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-2xl cursor-pointer"
                                                style={{ accentColor: '#D09A40' }}
                                                onChange={() => handleSelectPolicy(type.slug)}
                                                checked={selectedPolicies.includes(type.slug)}
                                            />
                                            {type.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* State */}
                        <div className='mt-2' >
                            <h1 className=' lg:text-lg text-xs font-normal  ' >State</h1>
                            <div ref={stateDropdownRef} className="relative cursor-pointer  mt-4  ">
                                {/* Dropdown button */}
                                <button
                                    onClick={() => setOpenState(!openState)}
                                    className="w-full flex justify-between cursor-pointer items-center px-4 py-3 border border-[#697079] rounded-[4px] bg-white shadow-sm text-gray-700 hover:border-gray-400 focus:outline-none"
                                >
                                    <span className="capitalize">{selectedState ? selectedState : "Select State"}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 cursor-pointer text-gray-500 transition-transform duration-200 ${openState ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>

                                {/* Dropdown menu */}
                                {openState && (
                                    <ul className="absolute mt-2 w-full bg-white border border-gray-200 cursor-pointer rounded-lg shadow-lg z-10 h-52 overflow-y-auto ">
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
                        </div>


                        {/* Minimum Rating */}


                        <div className='mt-4 ' >
                            <h1 className=' lg:text-lg text-xs font-normal text-black ' >Minimum Rating</h1>
                            <div className=" gap-x-3 lg:gap-x-10 items-center   rounded-lg px-4 py-3  border border-[#697079]   mt-2  flex flex-col space-y-2 ">
                                {/* Label */}
                                <span className="text-gray-600 font-normal">Score: {score}+</span>

                                {/* Slider */}
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={score}
                                    onChange={(e) => setScore(Number(e.target.value))}
                                    className="w-32 h-2  rounded-lg appearance-none cursor-pointer bg-gray-200 accent-yellow-600"
                                />
                            </div>
                        </div>


                        {/* Price Signal */}


                        <div className=' mt-4 ' >

                            {/* price  */}

                            <h1 className='lg:text-lg text-xs font-normal text-black' >Price Signal</h1>


                            <div ref={dropdownRef} className="relative pb-7 ">
                                {/* Dropdown button */}
                                <button
                                    onClick={() => setOpenPrice(!openPrice)}
                                    className="w-full mt-2 flex justify-between cursor-pointer items-center px-4 py-3 border border-[#697079] rounded-[4px] bg-white  textColor  focus:outline-none"
                                >
                                    <span>{selectedPrice !== null ? `$${selectedPrice}` : "Low to High"}</span>
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

                        </div>




                    </div>
                    {/* right side  */}
                    <div className=' max-w-[80%]  flex-1 mx-auto  ' >
                        <div>
                            <h1 className=' lg:text-4xl text-xl font-normal ' >{allInsuranceData?.length} Insurance Providers</h1>
                        </div>
                        <div className='  grid lg:grid-cols-3 justify-between  gap-x-5 gap-y-6  mx-auto mt-6 ' >
                            {
                                allInsuranceData?.map((item, i) => {
                                    return (
                                        <div className=' rounded-xl shadow shadow-[#00000040] ' key={i} >

                                            <div className=' mt-5 ' >
                                                <div className='  py-6 px-4  ' >
                                                    <div className=' flex justify-between items-center ' >
                                                        <div className=' flex gap-x-5  ' >
                                                            <div className=' w-[51px] h-[53px] bg-[#E9D1A7] flex justify-center items-center rounded-[6px]  ' >
                                                                {/* logo  */}
                                                                <Image unoptimized src={item?.logo_url} width={1000} height={1000} alt={item?.name} className='  w-8 h-6    ' />
                                                            </div>
                                                            <div>
                                                                <h1 className=' text-black font-normal lg:text-xl text-sm  ' >{item?.name.slice(0, 15)}...</h1>
                                                                {item?.is_sponsored && item?.sponsored_url && (
                                                                    <Link target='_blank' className=' cursor-pointer ' href={item.sponsored_url}>
                                                                        <button className=" cursor-pointer text-[#946D2D] lg:text-[14px] font-normal bg-[#F0E0C4] py-1 px-2 rounded-[3px] mt-1">
                                                                            Sponsored
                                                                        </button>
                                                                    </Link>
                                                                )}
                                                            </div>

                                                        </div>



                                                    </div>
                                                    <div className=' mt-3  ' >

                                                        <div className="flex items-center space-x-1 mt-2 ">
                                                            <h1
                                                                className={`text-lg font-bold 
                                                                    ${item?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                                        item?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                                            item?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                                                item?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                                                    "text-[#DC2626 ]"                                    // Default for E or others
                                                                    }`}
                                                            >
                                                                {item?.avg_grade}
                                                            </h1>
                                                            <span className="font-bold text-black lg:text-[16px] text-xs ">4.5</span>
                                                            {/* Full Stars */}
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <FaStar
                                                                    key={star}
                                                                    className={`w-4 h-4 ${star <= Math.round(Number(item?.avg_overall_rating || 0))
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                        }`}
                                                                />
                                                            ))}

                                                            {/* Rating Text */}

                                                            <span className=" text-black font-thin lg:text-[16px] text-xs ml-2 ">({item?.reviews_count})</span>
                                                        </div>
                                                    </div>
                                                    <div className=' flex flex-row gap-x-5 mt-3 ' >
                                                        <div className="flex flex-col space-y-1  ">
                                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.avg_claims ? item?.avg_claims : "0"}</span>
                                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Claim</span>
                                                        </div>
                                                        <div className="flex flex-col space-y-1  ">
                                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.avg_service ? item?.avg_service : "0"}</span>
                                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Service</span>
                                                        </div>
                                                        <div className="flex flex-col space-y-1  ">
                                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.avg_pricing ? item?.avg_pricing : "0"}</span>
                                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Price</span>
                                                        </div>
                                                        <div className="flex flex-col space-y-1  ">
                                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.avg_coverage ? item?.avg_coverage : "0"}</span>
                                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Cover</span>
                                                        </div>
                                                        <div className="flex flex-col space-y-1  ">
                                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item?.avg_trust ? item?.avg_trust : "0"}</span>
                                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Trust</span>
                                                        </div>
                                                    </div>
                                                    <div className=' flex items-center mt-3 gap-x-3 ' >
                                                        <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.85425 19.3673C9.85425 19.3673 3.5 14.0157 3.5 8.75C3.5 6.89348 4.2375 5.11301 5.55025 3.80025C6.86301 2.4875 8.64348 1.75 10.5 1.75C12.3565 1.75 14.137 2.4875 15.4497 3.80025C16.7625 5.11301 17.5 6.89348 17.5 8.75C17.5 14.0157 11.1457 19.3673 11.1457 19.3673C10.7922 19.6928 10.2104 19.6893 9.85425 19.3673ZM10.5 11.8125C10.9022 11.8125 11.3004 11.7333 11.672 11.5794C12.0435 11.4255 12.3811 11.1999 12.6655 10.9155C12.9499 10.6311 13.1755 10.2935 13.3294 9.92197C13.4833 9.55041 13.5625 9.15217 13.5625 8.75C13.5625 8.34783 13.4833 7.94959 13.3294 7.57803C13.1755 7.20647 12.9499 6.86887 12.6655 6.58449C12.3811 6.30011 12.0435 6.07452 11.672 5.92062C11.3004 5.76671 10.9022 5.6875 10.5 5.6875C9.68777 5.6875 8.90882 6.01016 8.33449 6.58449C7.76016 7.15882 7.4375 7.93777 7.4375 8.75C7.4375 9.56223 7.76016 10.3412 8.33449 10.9155C8.90882 11.4898 9.68777 11.8125 10.5 11.8125Z" fill="#697079" />
                                                            </svg>

                                                        </span>
                                                        <h1 className=' font-thin lg:text-[14px] text-xs text-black ' >
                                                            Available in {item?.states_count} states
                                                        </h1>
                                                    </div>


                                                    <div className='  flex items-center gap-x-3 mt-4 ' >
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <Checkbox
                                                                id={`compare-${item.id}`}
                                                                checked={selected.some(i => i.id === item.id)}
                                                                onCheckedChange={(checked) => handleCompareChange(item, checked as boolean)}
                                                            />
                                                            <span className="cursor-pointer text-[16px] text-[#697079]">
                                                                Compare
                                                            </span>
                                                        </label>

                                                    </div>

                                                    <div>
                                                        <Link href={`/insurance-profile/${item?.slug}`}>
                                                            <button className=' cursor-pointer bg-[#D09A40] border border-[#D09A40] py-1 w-full rounded-[34px] lg:mt-12 mt-4 text-[#FFFFFF] lg:text-xl text-sm font-normal ' >View Profile</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </MaxWidth>
            {openCompareModal && (
                (
                    <div
                        className={`
          fixed px-4 bottom-0 left-0 z-50 w-full  shadow-xl  transition-transform duration-300 ease-in-out
          
        `}
                    >
                        <div className="max-w-[1400px] bg-[#4c545f]  mx-auto  flex justify-between items-center px-9 py-6 rounded-t-[20px]  ">
                            <div className=" flex items-center gap-x-5 " >
                                <span className=" lg:text-[27px] font-bold text-sm text-white " >Comparing {selected.length} </span>
                                <span>


                                </span>
                            </div>
                            <div className="  space-x-6 " >
                                <Link href={"/InsuranceTable"}>
                                    <button className=" text-white bg-[#D09A40] border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm " >  Compare Now</button>
                                </Link>
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
        </div>
    )
}

export default ProviderBanner