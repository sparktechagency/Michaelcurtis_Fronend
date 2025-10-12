// components/InsuranceTable.tsx
"use client"
import { useCompareProvidersQuery } from '@/app/api/website/insurance/webInsuranceApi';
import { TopInsuranceType } from '@/utility/types/admin/insurance-provider/providerType';
import ProgressBar from '@ramonak/react-progress-bar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const InsuranceTable = () => {
    const [ids, setIds] = useState<number[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("selectedInsurers");
        if (data) {
            const insurers = JSON.parse(data);
            const insurerIds = insurers.map((item: TopInsuranceType) => item.id);
            setIds(insurerIds);
        }
    }, []);

    const { data, isLoading, isError } = useCompareProvidersQuery(ids, {
        skip: ids.length === 0, // Avoid sending request before IDs are available
    });




    const compareData: TopInsuranceType[] = data?.data || [];






    return (
        <div className='  ' >
            <div className="bg-[#f9fafb] py-12 px-4 overflow-x-auto">
                <div className="max-w-7xl mx-auto">


                    <table className="min-w-full border border-gray-300 bg-white rounded-xl">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-300 p-4 lg:text-lg text-xs font-thin ">Feature</th>
                                {compareData?.map((item, i) => (
                                    <th key={i} className="border border-gray-300 p-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            {/* Logo */}
                                            <span className="h-[135px] flex items-center justify-center  w-full">
                                                <Image src={item?.logo_url} width={ 127} height={133 } alt={item?.name} className='' />
                                            </span>

                                            {/* Insurance Name */}
                                            <span className="mt-2 lg:text-[27px] text-sm font-normal h-10 text-center">
                                                Progressive Insurance
                                            </span>

                                            {/* Sponsored Badge */}
                                            <span className="font-normal bg-[#F0E0C4] text-[#946D2D] lg:text-[16px] text-xs px-2 py-1 rounded-[3px]">
                                                Sponsored
                                            </span>
                                        </div>
                                    </th>
                                ))}


                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* Label column */}
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin">
                                    Overall Rating
                                </td>

                                {/* Dynamic rating columns */}
                                {compareData?.map((item, i) => (
                                    <td key={i} className="border border-gray-300 p-4 text-center">
                                        <div className="flex flex-col items-center justify-center gap-y-1">
                                            <div className="flex flex-row items-center justify-center gap-x-1">
                                                <h1
                                                    className={`lg:text-lg text-xs font-normal
                                                        ${item?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                            item?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                                item?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                                    item?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                                        "text-[#DC2626 ]"                                    // Default for E or others
                                                        }`}
                                                >
                                                    {item?.avg_grade}
                                                </h1>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.50049 0.754395C8.57247 0.754468 8.65208 0.773378 8.74561 0.82666C8.78893 0.851369 8.82703 0.884949 8.85889 0.937988L8.89014 1.00049L10.6138 5.09131L10.731 5.36865L11.0308 5.39502L15.4663 5.78271C15.6135 5.80424 15.6804 5.84617 15.7095 5.87158C15.7623 5.91785 15.8098 5.98214 15.8452 6.07959C15.874 6.15896 15.8791 6.23574 15.8608 6.3208C15.8485 6.37808 15.8168 6.44318 15.7349 6.51807L12.356 9.43799L12.1274 9.63525L12.1958 9.9292L13.2075 14.2729C13.2318 14.3787 13.218 14.4411 13.1968 14.4858C13.1531 14.5778 13.0952 14.6491 13.021 14.7065C12.9636 14.7509 12.8952 14.7794 12.8013 14.7876C12.7528 14.7918 12.7024 14.7863 12.645 14.7603L12.5854 14.7271L12.5737 14.7202L8.7583 12.4214L8.50049 12.2661L8.2417 12.4214L4.42627 14.7202L4.4165 14.7261C4.33212 14.7798 4.26347 14.793 4.19775 14.7876C4.10483 14.7799 4.03693 14.7518 3.97998 14.7075C3.90476 14.649 3.84693 14.5765 3.80322 14.4849C3.78258 14.4415 3.76811 14.3796 3.79248 14.2729L4.8042 9.9292L4.87256 9.63525L4.64404 9.43799L1.27197 6.52393C1.18618 6.44641 1.1529 6.3791 1.14014 6.31982C1.12169 6.23396 1.12736 6.15727 1.15576 6.07861C1.19036 5.98285 1.23664 5.91779 1.29053 5.87061C1.32025 5.84466 1.38715 5.80463 1.53076 5.78369L5.96924 5.39502L6.27002 5.36865L6.38623 5.09131L8.11084 1.00049V0.998535C8.14824 0.908767 8.19654 0.859656 8.25439 0.82666C8.34815 0.773231 8.42837 0.754395 8.50049 0.754395Z"
                                                            fill="#FEE453"
                                                            stroke="#BD8C3A"
                                                        />
                                                    </svg>
                                                </span>
                                                <p className="lg:text-lg text-xs font-normal text-[#000000]">{item?.avg_overall_rating}/5</p>
                                            </div>
                                            <p className="text-[#000000] lg:text-[18px] text-xs font-thin">
                                                Based on ({item?.reviews_count}) reviews
                                            </p>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                {/* Label column */}
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin">
                                    Claims Process
                                </td>

                                {/* Dynamic rating columns */}
                                {compareData?.map((item, i) => (
                                    <td key={i} className="border border-gray-300 p-4 text-center">
                                        {/* Progress Bar */}
                                        <div className="w-[75%] bg-gray-200 rounded-full mx-auto h-3">
                                            <ProgressBar
                                                completed={item?.avg_claims * 20}
                                                isLabelVisible={false}
                                                height="12px"
                                                bgColor={
                                                    item?.avg_claims == 5 ? "#22C55E" :       // Green (A)
                                                        item?.avg_claims == 4 ? "#3B82F6" :       // Blue (B)
                                                            item?.avg_claims == 3 ? "#EAB308" :       // Yellow (C)
                                                                item?.avg_claims == 2 ? "#F97316" :       // Orange (D)
                                                                    "#DC2626"                                 // Red (E)
                                                }
                                            />
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex flex-col items-center justify-center mt-2 gap-y-1">

                                            <div className="flex items-center justify-center gap-x-1.5">
                                                <h1
                                                    className="lg:text-lg text-xs font-normal"
                                                    style={{
                                                        color:
                                                            Number(item?.avg_claims) === 5 ? "#22C55E" : // Green (A)
                                                                Number(item?.avg_claims) === 4 ? "#3B82F6" : // Blue (B)
                                                                    Number(item?.avg_claims) === 3 ? "#EAB308" : // Yellow (C)
                                                                        Number(item?.avg_claims) === 2 ? "#F97316" : // Orange (D)
                                                                            "#DC2626",                                      // Red (default)
                                                    }}
                                                >
                                                    {Number(item?.avg_claims) === 5 ? "A" :
                                                        Number(item?.avg_claims) === 4 ? "B" :
                                                            Number(item?.avg_claims) === 3 ? "C" :
                                                                Number(item?.avg_claims) === 2 ? "D" : "F"}
                                                </h1>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.50049 0.754395C8.57247 0.754468 8.65208 0.773378 8.74561 0.82666C8.78893 0.851369 8.82703 0.884949 8.85889 0.937988L8.89014 1.00049L10.6138 5.09131L10.731 5.36865L11.0308 5.39502L15.4663 5.78271C15.6135 5.80424 15.6804 5.84617 15.7095 5.87158C15.7623 5.91785 15.8098 5.98214 15.8452 6.07959C15.874 6.15896 15.8791 6.23574 15.8608 6.3208C15.8485 6.37808 15.8168 6.44318 15.7349 6.51807L12.356 9.43799L12.1274 9.63525L12.1958 9.9292L13.2075 14.2729C13.2318 14.3787 13.218 14.4411 13.1968 14.4858C13.1531 14.5778 13.0952 14.6491 13.021 14.7065C12.9636 14.7509 12.8952 14.7794 12.8013 14.7876C12.7528 14.7918 12.7024 14.7863 12.645 14.7603L12.5854 14.7271L12.5737 14.7202L8.7583 12.4214L8.50049 12.2661L8.2417 12.4214L4.42627 14.7202L4.4165 14.7261C4.33212 14.7798 4.26347 14.793 4.19775 14.7876C4.10483 14.7799 4.03693 14.7518 3.97998 14.7075C3.90476 14.649 3.84693 14.5765 3.80322 14.4849C3.78258 14.4415 3.76811 14.3796 3.79248 14.2729L4.8042 9.9292L4.87256 9.63525L4.64404 9.43799L1.27197 6.52393C1.18618 6.44641 1.1529 6.3791 1.14014 6.31982C1.12169 6.23396 1.12736 6.15727 1.15576 6.07861C1.19036 5.98285 1.23664 5.91779 1.29053 5.87061C1.32025 5.84466 1.38715 5.80463 1.53076 5.78369L5.96924 5.39502L6.27002 5.36865L6.38623 5.09131L8.11084 1.00049V0.998535C8.14824 0.908767 8.19654 0.859656 8.25439 0.82666C8.34815 0.773231 8.42837 0.754395 8.50049 0.754395Z"
                                                            fill="#FEE453"
                                                            stroke="#BD8C3A"
                                                        />
                                                    </svg>
                                                </span>
                                                <p className="lg:text-lg text-xs font-normal text-[#000000]">{item?.avg_claims}/5</p>
                                                <p className="text-[#000000] lg:text-[18px] text-xs font-thin">
                                                    Based on ({item?.reviews_count}) reviews
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                {/* Label column */}
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin">
                                    Customer Service
                                </td>

                                {/* Dynamic rating columns */}
                                {compareData?.map((item, i) => (
                                    <td key={i} className="border border-gray-300 p-4 text-center">
                                        {/* Progress Bar */}
                                        <div className="w-[75%] bg-gray-200 rounded-full mx-auto h-3">
                                            <ProgressBar
                                                completed={item?.avg_service * 20}
                                                isLabelVisible={false}
                                                height="12px"
                                                bgColor={
                                                    item?.avg_service == 5 ? "#22C55E" :       // Green (A)
                                                        item?.avg_service == 4 ? "#3B82F6" :       // Blue (B)
                                                            item?.avg_service == 3 ? "#EAB308" :       // Yellow (C)
                                                                item?.avg_service == 2 ? "#F97316" :       // Orange (D)
                                                                    "#DC2626"                                 // Red (E)
                                                }
                                            />
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex flex-col items-center justify-center mt-2 gap-y-1">

                                            <div className="flex items-center justify-center gap-x-1.5">
                                                <h1
                                                    className="lg:text-lg text-xs font-normal"
                                                    style={{
                                                        color:
                                                            Number(item?.avg_service) === 5 ? "#22C55E" : // Green (A)
                                                                Number(item?.avg_service) === 4 ? "#3B82F6" : // Blue (B)
                                                                    Number(item?.avg_service) === 3 ? "#EAB308" : // Yellow (C)
                                                                        Number(item?.avg_service) === 2 ? "#F97316" : // Orange (D)
                                                                            "#DC2626",                                      // Red (default)
                                                    }}
                                                >
                                                    {Number(item?.avg_service) === 5 ? "A" :
                                                        Number(item?.avg_service) === 4 ? "B" :
                                                            Number(item?.avg_service) === 3 ? "C" :
                                                                Number(item?.avg_service) === 2 ? "D" : "F"}
                                                </h1>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.50049 0.754395C8.57247 0.754468 8.65208 0.773378 8.74561 0.82666C8.78893 0.851369 8.82703 0.884949 8.85889 0.937988L8.89014 1.00049L10.6138 5.09131L10.731 5.36865L11.0308 5.39502L15.4663 5.78271C15.6135 5.80424 15.6804 5.84617 15.7095 5.87158C15.7623 5.91785 15.8098 5.98214 15.8452 6.07959C15.874 6.15896 15.8791 6.23574 15.8608 6.3208C15.8485 6.37808 15.8168 6.44318 15.7349 6.51807L12.356 9.43799L12.1274 9.63525L12.1958 9.9292L13.2075 14.2729C13.2318 14.3787 13.218 14.4411 13.1968 14.4858C13.1531 14.5778 13.0952 14.6491 13.021 14.7065C12.9636 14.7509 12.8952 14.7794 12.8013 14.7876C12.7528 14.7918 12.7024 14.7863 12.645 14.7603L12.5854 14.7271L12.5737 14.7202L8.7583 12.4214L8.50049 12.2661L8.2417 12.4214L4.42627 14.7202L4.4165 14.7261C4.33212 14.7798 4.26347 14.793 4.19775 14.7876C4.10483 14.7799 4.03693 14.7518 3.97998 14.7075C3.90476 14.649 3.84693 14.5765 3.80322 14.4849C3.78258 14.4415 3.76811 14.3796 3.79248 14.2729L4.8042 9.9292L4.87256 9.63525L4.64404 9.43799L1.27197 6.52393C1.18618 6.44641 1.1529 6.3791 1.14014 6.31982C1.12169 6.23396 1.12736 6.15727 1.15576 6.07861C1.19036 5.98285 1.23664 5.91779 1.29053 5.87061C1.32025 5.84466 1.38715 5.80463 1.53076 5.78369L5.96924 5.39502L6.27002 5.36865L6.38623 5.09131L8.11084 1.00049V0.998535C8.14824 0.908767 8.19654 0.859656 8.25439 0.82666C8.34815 0.773231 8.42837 0.754395 8.50049 0.754395Z"
                                                            fill="#FEE453"
                                                            stroke="#BD8C3A"
                                                        />
                                                    </svg>
                                                </span>
                                                <p className="lg:text-lg text-xs font-normal text-[#000000]">{item?.avg_service}/5</p>
                                                <p className="text-[#000000] lg:text-[18px] text-xs font-thin">
                                                    Based on ({item?.reviews_count}) reviews
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                ))}





                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin  ">Pricing & Value</td>

                                {compareData?.map((item, i) => (
                                    <td key={i} className="border border-gray-300 p-4 text-center">
                                        {/* Progress Bar */}
                                        <div className="w-[75%] bg-gray-200 rounded-full mx-auto h-3">
                                            <ProgressBar
                                                completed={item?.avg_pricing * 20}
                                                isLabelVisible={false}
                                                height="12px"
                                                bgColor={
                                                    item?.avg_pricing == 5 ? "#22C55E" :       // Green (A)
                                                        item?.avg_pricing == 4 ? "#3B82F6" :       // Blue (B)
                                                            item?.avg_pricing == 3 ? "#EAB308" :       // Yellow (C)
                                                                item?.avg_pricing == 2 ? "#F97316" :       // Orange (D)
                                                                    "#DC2626"                                 // Red (E)
                                                }
                                            />
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex flex-col items-center justify-center mt-2 gap-y-1">

                                            <div className="flex items-center justify-center gap-x-1.5">
                                                <h1
                                                    className="lg:text-lg text-xs font-normal"
                                                    style={{
                                                        color:
                                                            Number(item?.avg_pricing) === 5 ? "#22C55E" : // Green (A)
                                                                Number(item?.avg_pricing) === 4 ? "#3B82F6" : // Blue (B)
                                                                    Number(item?.avg_pricing) === 3 ? "#EAB308" : // Yellow (C)
                                                                        Number(item?.avg_pricing) === 2 ? "#F97316" : // Orange (D)
                                                                            "#DC2626",                                      // Red (default)
                                                    }}
                                                >
                                                    {Number(item?.avg_pricing) === 5 ? "A" :
                                                        Number(item?.avg_pricing) === 4 ? "B" :
                                                            Number(item?.avg_pricing) === 3 ? "C" :
                                                                Number(item?.avg_pricing) === 2 ? "D" : "F"}
                                                </h1>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.50049 0.754395C8.57247 0.754468 8.65208 0.773378 8.74561 0.82666C8.78893 0.851369 8.82703 0.884949 8.85889 0.937988L8.89014 1.00049L10.6138 5.09131L10.731 5.36865L11.0308 5.39502L15.4663 5.78271C15.6135 5.80424 15.6804 5.84617 15.7095 5.87158C15.7623 5.91785 15.8098 5.98214 15.8452 6.07959C15.874 6.15896 15.8791 6.23574 15.8608 6.3208C15.8485 6.37808 15.8168 6.44318 15.7349 6.51807L12.356 9.43799L12.1274 9.63525L12.1958 9.9292L13.2075 14.2729C13.2318 14.3787 13.218 14.4411 13.1968 14.4858C13.1531 14.5778 13.0952 14.6491 13.021 14.7065C12.9636 14.7509 12.8952 14.7794 12.8013 14.7876C12.7528 14.7918 12.7024 14.7863 12.645 14.7603L12.5854 14.7271L12.5737 14.7202L8.7583 12.4214L8.50049 12.2661L8.2417 12.4214L4.42627 14.7202L4.4165 14.7261C4.33212 14.7798 4.26347 14.793 4.19775 14.7876C4.10483 14.7799 4.03693 14.7518 3.97998 14.7075C3.90476 14.649 3.84693 14.5765 3.80322 14.4849C3.78258 14.4415 3.76811 14.3796 3.79248 14.2729L4.8042 9.9292L4.87256 9.63525L4.64404 9.43799L1.27197 6.52393C1.18618 6.44641 1.1529 6.3791 1.14014 6.31982C1.12169 6.23396 1.12736 6.15727 1.15576 6.07861C1.19036 5.98285 1.23664 5.91779 1.29053 5.87061C1.32025 5.84466 1.38715 5.80463 1.53076 5.78369L5.96924 5.39502L6.27002 5.36865L6.38623 5.09131L8.11084 1.00049V0.998535C8.14824 0.908767 8.19654 0.859656 8.25439 0.82666C8.34815 0.773231 8.42837 0.754395 8.50049 0.754395Z"
                                                            fill="#FEE453"
                                                            stroke="#BD8C3A"
                                                        />
                                                    </svg>
                                                </span>
                                                <p className="lg:text-lg text-xs font-normal text-[#000000]">{item?.avg_pricing}/5</p>
                                                <p className="text-[#000000] lg:text-[18px] text-xs font-thin">
                                                    Based on ({item?.reviews_count}) reviews
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                ))}

                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin   ">Coverage Options</td>

                                {compareData?.map((item, i) => (
                                    <td key={i} className="border border-gray-300 p-4 text-center">
                                        {/* Progress Bar */}
                                        <div className="w-[75%] bg-gray-200 rounded-full mx-auto h-3">
                                            <ProgressBar
                                                completed={item?.avg_coverage * 20}
                                                isLabelVisible={false}
                                                height="12px"
                                                bgColor={
                                                    item?.avg_coverage == 5 ? "#22C55E" :       // Green (A)
                                                        item?.avg_coverage == 4 ? "#3B82F6" :       // Blue (B)
                                                            item?.avg_coverage == 3 ? "#EAB308" :       // Yellow (C)
                                                                item?.avg_coverage == 2 ? "#F97316" :       // Orange (D)
                                                                    "#DC2626"                                 // Red (E)
                                                }
                                            />
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex flex-col items-center justify-center mt-2 gap-y-1">

                                            <div className="flex items-center justify-center gap-x-1.5">
                                                <h1
                                                    className="lg:text-lg text-xs font-normal"
                                                    style={{
                                                        color:
                                                            Number(item?.avg_coverage) === 5 ? "#22C55E" : // Green (A)
                                                                Number(item?.avg_coverage) === 4 ? "#3B82F6" : // Blue (B)
                                                                    Number(item?.avg_coverage) === 3 ? "#EAB308" : // Yellow (C)
                                                                        Number(item?.avg_coverage) === 2 ? "#F97316" : // Orange (D)
                                                                            "#DC2626",                                      // Red (default)
                                                    }}
                                                >
                                                    {Number(item?.avg_coverage) === 5 ? "A" :
                                                        Number(item?.avg_coverage) === 4 ? "B" :
                                                            Number(item?.avg_coverage) === 3 ? "C" :
                                                                Number(item?.avg_coverage) === 2 ? "D" : "F"}
                                                </h1>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.50049 0.754395C8.57247 0.754468 8.65208 0.773378 8.74561 0.82666C8.78893 0.851369 8.82703 0.884949 8.85889 0.937988L8.89014 1.00049L10.6138 5.09131L10.731 5.36865L11.0308 5.39502L15.4663 5.78271C15.6135 5.80424 15.6804 5.84617 15.7095 5.87158C15.7623 5.91785 15.8098 5.98214 15.8452 6.07959C15.874 6.15896 15.8791 6.23574 15.8608 6.3208C15.8485 6.37808 15.8168 6.44318 15.7349 6.51807L12.356 9.43799L12.1274 9.63525L12.1958 9.9292L13.2075 14.2729C13.2318 14.3787 13.218 14.4411 13.1968 14.4858C13.1531 14.5778 13.0952 14.6491 13.021 14.7065C12.9636 14.7509 12.8952 14.7794 12.8013 14.7876C12.7528 14.7918 12.7024 14.7863 12.645 14.7603L12.5854 14.7271L12.5737 14.7202L8.7583 12.4214L8.50049 12.2661L8.2417 12.4214L4.42627 14.7202L4.4165 14.7261C4.33212 14.7798 4.26347 14.793 4.19775 14.7876C4.10483 14.7799 4.03693 14.7518 3.97998 14.7075C3.90476 14.649 3.84693 14.5765 3.80322 14.4849C3.78258 14.4415 3.76811 14.3796 3.79248 14.2729L4.8042 9.9292L4.87256 9.63525L4.64404 9.43799L1.27197 6.52393C1.18618 6.44641 1.1529 6.3791 1.14014 6.31982C1.12169 6.23396 1.12736 6.15727 1.15576 6.07861C1.19036 5.98285 1.23664 5.91779 1.29053 5.87061C1.32025 5.84466 1.38715 5.80463 1.53076 5.78369L5.96924 5.39502L6.27002 5.36865L6.38623 5.09131L8.11084 1.00049V0.998535C8.14824 0.908767 8.19654 0.859656 8.25439 0.82666C8.34815 0.773231 8.42837 0.754395 8.50049 0.754395Z"
                                                            fill="#FEE453"
                                                            stroke="#BD8C3A"
                                                        />
                                                    </svg>
                                                </span>
                                                <p className="lg:text-lg text-xs font-normal text-[#000000]">{item?.avg_coverage}/5</p>
                                                <p className="text-[#000000] lg:text-[18px] text-xs font-thin">
                                                    Based on ({item?.reviews_count}) reviews
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                ))}


                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin   ">Trust</td>

                                {compareData?.map((item, i) => (
                                    <td key={i} className="border border-gray-300 p-4 text-center">
                                        {/* Progress Bar */}
                                        <div className="w-[75%] bg-gray-200 rounded-full mx-auto h-3">
                                            <ProgressBar
                                                completed={item?.avg_trust * 20}
                                                isLabelVisible={false}
                                                height="12px"
                                                bgColor={
                                                    item?.avg_trust == 5 ? "#22C55E" :       // Green (A)
                                                        item?.avg_trust == 4 ? "#3B82F6" :       // Blue (B)
                                                            item?.avg_trust == 3 ? "#EAB308" :       // Yellow (C)
                                                                item?.avg_trust == 2 ? "#F97316" :       // Orange (D)
                                                                    "#DC2626"                                 // Red (E)
                                                }
                                            />
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex flex-col items-center justify-center mt-2 gap-y-1">

                                            <div className="flex items-center justify-center gap-x-1.5">
                                                <h1
                                                    className="lg:text-lg text-xs font-normal"
                                                    style={{
                                                        color:
                                                            Number(item?.avg_trust) === 5 ? "#22C55E" : // Green (A)
                                                                Number(item?.avg_trust) === 4 ? "#3B82F6" : // Blue (B)
                                                                    Number(item?.avg_trust) === 3 ? "#EAB308" : // Yellow (C)
                                                                        Number(item?.avg_trust) === 2 ? "#F97316" : // Orange (D)
                                                                            "#DC2626",                                      // Red (default)
                                                    }}
                                                >
                                                    {Number(item?.avg_trust) === 5 ? "A" :
                                                        Number(item?.avg_trust) === 4 ? "B" :
                                                            Number(item?.avg_trust) === 3 ? "C" :
                                                                Number(item?.avg_trust) === 2 ? "D" : "F"}
                                                </h1>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.50049 0.754395C8.57247 0.754468 8.65208 0.773378 8.74561 0.82666C8.78893 0.851369 8.82703 0.884949 8.85889 0.937988L8.89014 1.00049L10.6138 5.09131L10.731 5.36865L11.0308 5.39502L15.4663 5.78271C15.6135 5.80424 15.6804 5.84617 15.7095 5.87158C15.7623 5.91785 15.8098 5.98214 15.8452 6.07959C15.874 6.15896 15.8791 6.23574 15.8608 6.3208C15.8485 6.37808 15.8168 6.44318 15.7349 6.51807L12.356 9.43799L12.1274 9.63525L12.1958 9.9292L13.2075 14.2729C13.2318 14.3787 13.218 14.4411 13.1968 14.4858C13.1531 14.5778 13.0952 14.6491 13.021 14.7065C12.9636 14.7509 12.8952 14.7794 12.8013 14.7876C12.7528 14.7918 12.7024 14.7863 12.645 14.7603L12.5854 14.7271L12.5737 14.7202L8.7583 12.4214L8.50049 12.2661L8.2417 12.4214L4.42627 14.7202L4.4165 14.7261C4.33212 14.7798 4.26347 14.793 4.19775 14.7876C4.10483 14.7799 4.03693 14.7518 3.97998 14.7075C3.90476 14.649 3.84693 14.5765 3.80322 14.4849C3.78258 14.4415 3.76811 14.3796 3.79248 14.2729L4.8042 9.9292L4.87256 9.63525L4.64404 9.43799L1.27197 6.52393C1.18618 6.44641 1.1529 6.3791 1.14014 6.31982C1.12169 6.23396 1.12736 6.15727 1.15576 6.07861C1.19036 5.98285 1.23664 5.91779 1.29053 5.87061C1.32025 5.84466 1.38715 5.80463 1.53076 5.78369L5.96924 5.39502L6.27002 5.36865L6.38623 5.09131L8.11084 1.00049V0.998535C8.14824 0.908767 8.19654 0.859656 8.25439 0.82666C8.34815 0.773231 8.42837 0.754395 8.50049 0.754395Z"
                                                            fill="#FEE453"
                                                            stroke="#BD8C3A"
                                                        />
                                                    </svg>
                                                </span>
                                                <p className="lg:text-lg text-xs font-normal text-[#000000]">{item?.avg_trust}/5</p>
                                                <p className="text-[#000000] lg:text-[18px] text-xs font-thin">
                                                    Based on ({item?.reviews_count}) reviews
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                ))}


                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin ">Price Signal</td>
                                {
                                    compareData?.map((item, i) => {
                                        return (
                                            <td key={i} className="border border-gray-300 p-4 text-center text-[#529F22] font-normal lg:text-[27px] text-[16px]  ">${item?.price}</td>
                                        )
                                    })
                                }
                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin ">Pros</td>
                                {
                                    compareData?.map((item, i) => {
                                        return (
                                            <td key={i} className="border border-gray-300 p-4 text-[#26994D] lg:text-[16px] text-xs font-thin  ">
                                                {
                                                    item?.pros?.map((i, index) => {
                                                        return (
                                                            <ul key={index} className="list-disc list-inside  ">
                                                                <li>{i}</li>

                                                            </ul>
                                                        )
                                                    })
                                                }
                                            </td>
                                        )
                                    })
                                }

                            </tr>

                            <tr>
                                <td className="border border-gray-300 p-4 lg:text-lg text-xs font-thin ">Cons</td>
                                {
                                    compareData?.map((item, i) => {
                                        return (
                                            <td key={i} className="border border-gray-300 p-4 lg:text-[16px] text-xs font-thin text-[#992626]">
                                                {item?.cons?.length > 0 && (
                                                    <ul className="list-disc list-inside">
                                                        {item.cons.map((consItem, index) => (
                                                            <li key={index}>{consItem}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </td>
                                        )
                                    })
                                }


                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-4 font-medium"></td>
                                {
                                    compareData?.map((item, i) => {
                                        return (
                                            <td key={i} className="border border-gray-300 p-4  ">
                                                <Link href={`/insurance-profile/${item?.slug}`}>
                                                    <button className=" cursor-pointer bg-[#D09A40] w-full py-2 text-[#FFFFFF] font-normal lg:text-xl text-xs rounded-[34px] ">
                                                        View Profile
                                                    </button>
                                                </Link>
                                                <Link href={`/specify-insurance-review/${item?.slug}`}>
                                                    <button className=" text-[#D09A40]   w-full py-2 border border-[#D09A40] cursor-pointer  font-normal lg:text-xl text-xs rounded-[34px] lg:mt-6 mt-3 ">
                                                        Write a Review
                                                    </button>
                                                </Link>
                                            </td>
                                        )
                                    })
                                }


                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default InsuranceTable;
