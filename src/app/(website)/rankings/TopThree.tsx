"use client"
import { useAllInsuranceApiQuery } from '@/app/api/website/insurance/webInsuranceApi'
import { Checkbox } from '@/components/ui/checkbox'
import { TopInsuranceType } from '@/utility/types/admin/insurance-provider/providerType'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const TopThree = () => {

    const [selected, setSelected] = React.useState<TopInsuranceType[]>([]);
    const [openCompareModal, setOpenCompareModal] = React.useState(false);



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




    const [ids, setIds] = React.useState<number[]>([]);
    const router = useRouter();

    // Function to read selected insurers from localStorage
    const updateIds = () => {
        const data = localStorage.getItem("selectedInsurers");
        if (data) {
            const insurers = JSON.parse(data);

            setIds(insurers);
        } else {
            setIds([]);
        }
    };

    React.useEffect(() => {
        // Initial load
        updateIds();

        // Listen to storage changes from other tabs
        window.addEventListener("storage", updateIds);
        return () => window.removeEventListener("storage", updateIds);
    }, []);


    console.log(ids)

    const handleOpenCompare = () => {

        router.push("/InsuranceTable");

    };



    return (
        <div>
            <div className="relative w-full mt-11 mb-40 flex justify-center">
                <div className="relative w-full flex flex-col lg:flex-row items-center justify-center  gap-y-6">

                    {/* Left Card */}
                    <div className=" lg:absolute lg:left-0 lg:top-20  lg:max-w-[30%]   ">
                        <CardTwo bg="#D8D6C8" />
                    </div>

                    {/* Middle Card (always on top) */}
                    <div className="flex-1 lg:relative z-10 lg:max-w-[25%]   ">
                        <Card bg="#D8D6C8" />
                    </div>

                    {/* Right Card */}
                    <div className=" lg:absolute lg:right-0 lg:top-20 lg:max-w-[35%]   ">
                        <CardThree bg="#FFBE56" />
                    </div>

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
                                <span className=" lg:text-[27px] font-bold text-sm text-white " >Comparing {selected.length} </span>
                                <span>


                                </span>
                            </div>
                            <div className="  space-x-6 " >



                                <button onClick={handleOpenCompare} className=" text-white bg-[#D09A40] border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm " >  Compare Now</button>



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

const Card = ({ bg }: { bg: string }) => {
    const { data } = useAllInsuranceApiQuery([]);
    const top1: TopInsuranceType = data?.data[0];

    // const [selected, setSelected] = React.useState<TopInsuranceType[]>([]);
    // const [openCompareModal, setOpenCompareModal] = React.useState(false);

    // // ✅ Checkbox toggle handler
    // const handleCompareChange = (data: TopInsuranceType, checked: boolean) => {
    //     const stored = localStorage.getItem("selectedInsurers");
    //     const prevSelected: TopInsuranceType[] = stored ? JSON.parse(stored) : [];

    //     let newSelected: TopInsuranceType[];

    //     if (checked) {
    //         // ✅ Add if not exists
    //         if (!prevSelected.some(i => i.id === data.id)) {
    //             newSelected = [...prevSelected, data];
    //         } else {
    //             newSelected = prevSelected;
    //         }
    //     } else {
    //         // ✅ Remove if unchecked
    //         newSelected = prevSelected.filter(i => i.id !== data.id);
    //     }

    //     // Update state + LocalStorage
    //     setSelected(newSelected);
    //     localStorage.setItem("selectedInsurers", JSON.stringify(newSelected));

    //     // Modal open condition
    //     if (newSelected.length > 0 && !openCompareModal) {
    //         setOpenCompareModal(true);
    //     }
    // };

    // React.useEffect(() => {
    //     const stored = localStorage.getItem("selectedInsurers");
    //     if (stored) {
    //         try {
    //             const parsed: TopInsuranceType[] = JSON.parse(stored);
    //             setSelected(parsed);
    //             if (parsed.length > 0) setOpenCompareModal(true);
    //         } catch (error) {
    //             console.error("Failed to parse localStorage:", error);
    //         }
    //     }
    // }, []);



    return (
        <>
            {
                top1 && (
                    <div>
                        <div className=' flex justify-center ' >

                            {/* logo  */}
                            {
                                <Image src={top1?.logo_url} width={1000} height={1000} alt={top1?.name} unoptimized className=' w-24 h-28 ' />
                            }
                        </div>
                        <div className="mt-6  ">
                            {/* Trophy Badge */}
                            <div className="flex justify-center">
                                <div className="w-12 h-11 rounded-[5px] shadow  flex justify-center items-center" style={{ backgroundColor: bg }}>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.58333 20.3003V18.1336H8.91667V14.7753C8.03194 14.5767 7.24219 14.2022 6.54742 13.6519C5.85264 13.1015 5.34239 12.4107 5.01667 11.5795C3.6625 11.417 2.52969 10.8258 1.61825 9.80604C0.706806 8.78627 0.250722 7.5899 0.25 6.21696V5.13363C0.25 4.53779 0.462333 4.0279 0.887 3.60396C1.31167 3.18002 1.82156 2.96768 2.41667 2.96696H4.58333V0.800293H15.4167V2.96696H17.5833C18.1792 2.96696 18.6894 3.17929 19.1141 3.60396C19.5388 4.02863 19.7507 4.53852 19.75 5.13363V6.21696C19.75 7.58918 19.2939 8.78554 18.3818 9.80604C17.4696 10.8265 16.3368 11.4177 14.9833 11.5795C14.6583 12.41 14.1484 13.1008 13.4537 13.6519C12.7589 14.2029 11.9688 14.5774 11.0833 14.7753V18.1336H15.4167V20.3003H4.58333ZM4.58333 9.25029V5.13363H2.41667V6.21696C2.41667 6.90307 2.61528 7.52165 3.0125 8.07271C3.40972 8.62377 3.93333 9.01629 4.58333 9.25029ZM15.4167 9.25029C16.0667 9.01557 16.5903 8.62268 16.9875 8.07163C17.3847 7.52057 17.5833 6.90235 17.5833 6.21696V5.13363H15.4167V9.25029Z" fill="#807F65" />
                                    </svg>

                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow shadow-[#00000033]  px-4 pt-6 pb-9 text-center -mt-4">
                                {/* Title & Price */}
                                <div className="flex justify-between items-center mt-8">
                                    <h2 className="lg:text-xl text-[15px] text-black font-normal">{top1?.name.slice(0, 10)}...</h2>
                                    <span className="text-green-600 font-bold text-lg">${top1?.price}</span>
                                </div>

                                {/* Rating */}
                                {/* font-bold lg:text-2xl */}
                                <div className="flex items-center gap-x-2 mt-2">
                                    <span

                                        className={`font-bold lg:text-2xl 
                                    ${top1?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                top1?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                    top1?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                        top1?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                            "text-[#DC2626 ]"                                    // Default for E or others
                                            }`}
                                    >
                                        {top1?.avg_grade}

                                    </span>
                                    <div className=' w-1.5 h-1.5 bg-black rounded-full ' />
                                    <span>
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99996 14.275L4.84996 16.775C4.66663 16.8917 4.47496 16.9417 4.27496 16.925C4.07496 16.9083 3.89996 16.8417 3.74996 16.725C3.59996 16.6083 3.4833 16.4627 3.39996 16.288C3.31663 16.1133 3.29996 15.9173 3.34996 15.7L4.44996 10.975L0.774963 7.80001C0.608296 7.65001 0.504296 7.47901 0.462963 7.28701C0.421629 7.09501 0.433963 6.90768 0.499963 6.72501C0.565963 6.54235 0.665963 6.39235 0.799963 6.27501C0.933963 6.15768 1.1173 6.08268 1.34996 6.05001L6.19996 5.62501L8.07496 1.17501C8.1583 0.975012 8.28763 0.825012 8.46296 0.725012C8.6383 0.625012 8.8173 0.575012 8.99996 0.575012C9.18263 0.575012 9.36163 0.625012 9.53696 0.725012C9.7123 0.825012 9.84163 0.975012 9.92496 1.17501L11.8 5.62501L16.65 6.05001C16.8833 6.08335 17.0666 6.15835 17.2 6.27501C17.3333 6.39168 17.4333 6.54168 17.5 6.72501C17.5666 6.90835 17.5793 7.09601 17.538 7.28801C17.4966 7.48001 17.3923 7.65068 17.225 7.80001L13.55 10.975L14.65 15.7C14.7 15.9167 14.6833 16.1127 14.6 16.288C14.5166 16.4633 14.4 16.609 14.25 16.725C14.1 16.841 13.925 16.9077 13.725 16.925C13.525 16.9423 13.3333 16.8923 13.15 16.775L8.99996 14.275Z" fill="#F6CF2F" />
                                        </svg>

                                    </span>
                                    <span className="text-black text-xs lg:text-[16px] font-normal">{top1?.avg_overall_rating}</span>
                                </div>

                                {/* Scores */}

                                <div className="flex justify-between gap-2 mt-5">
                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_claims ? top1?.avg_claims : "0"}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Claim</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_service ? top1?.avg_service : "0"} </span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Service</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_pricing ? top1?.avg_pricing : "0"}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Price</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_coverage ? top1?.avg_coverage : "0"}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Cover</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_trust ? top1?.avg_trust : "0"}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Trust</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 mt-8 lg:mt-16 mb-5"></div>

                                {/* Footer */}
                                <div className="flex justify-between items-center">
                                    {/* <label className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            id={`compare-${data.id}`}
                                            checked={selected.some(i => i.id === data.id)}
                                            onCheckedChange={(checked) => handleCompareChange(data, checked as boolean)}
                                        />
                                        <span className="cursor-pointer text-[16px] text-[#697079]">
                                            Compare
                                        </span>
                                    </label> */}

                                    <Link href={`/insurance-profile/${top1?.slug}`}>
                                        <button className="flex items-center gap-x-2 lg:text-[16px] cursor-pointer text-sm text-[#D09A40] font-normal hover:underline">
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

const CardTwo = ({ bg }: { bg: string }) => {
    const { data } = useAllInsuranceApiQuery([]);
    const top1: TopInsuranceType = data?.data[1];
    // const [selected, setSelected] = React.useState<TopInsuranceType[]>([]);
    // const [openCompareModal, setOpenCompareModal] = React.useState(false);

    // ✅ Checkbox toggle handler
    // const handleCompareChange = (data: TopInsuranceType, checked: boolean) => {
    //     const stored = localStorage.getItem("selectedInsurers");
    //     const prevSelected: TopInsuranceType[] = stored ? JSON.parse(stored) : [];

    //     let newSelected: TopInsuranceType[];

    //     if (checked) {
    //         // ✅ Add if not exists
    //         if (!prevSelected.some(i => i.id === data.id)) {
    //             newSelected = [...prevSelected, data];
    //         } else {
    //             newSelected = prevSelected;
    //         }
    //     } else {
    //         // ✅ Remove if unchecked
    //         newSelected = prevSelected.filter(i => i.id !== data.id);
    //     }

    //     // Update state + LocalStorage
    //     setSelected(newSelected);
    //     localStorage.setItem("selectedInsurers", JSON.stringify(newSelected));

    //     // Modal open condition
    //     if (newSelected.length > 0 && !openCompareModal) {
    //         setOpenCompareModal(true);
    //     }
    // };

    // React.useEffect(() => {
    //     const stored = localStorage.getItem("selectedInsurers");
    //     if (stored) {
    //         try {
    //             const parsed: TopInsuranceType[] = JSON.parse(stored);
    //             setSelected(parsed);
    //             if (parsed.length > 0) setOpenCompareModal(true);
    //         } catch (error) {
    //             console.error("Failed to parse localStorage:", error);
    //         }
    //     }
    // }, []);



    return (
        <>
            {
                top1 && (
                    <div>
                        <div className=' flex justify-center  ' >

                            {
                                <Image unoptimized src={top1?.logo_url} width={1000} height={1000} alt={top1?.name} className=' w-24 h-28 ' />
                            }
                        </div>
                        <div className="mt-6   ">
                            {/* Trophy Badge */}
                            <div className="flex justify-center">
                                <div className="w-12 h-11 rounded-[5px] shadow  flex justify-center items-center" style={{ backgroundColor: bg }}>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.58333 20.3003V18.1336H8.91667V14.7753C8.03194 14.5767 7.24219 14.2022 6.54742 13.6519C5.85264 13.1015 5.34239 12.4107 5.01667 11.5795C3.6625 11.417 2.52969 10.8258 1.61825 9.80604C0.706806 8.78627 0.250722 7.5899 0.25 6.21696V5.13363C0.25 4.53779 0.462333 4.0279 0.887 3.60396C1.31167 3.18002 1.82156 2.96768 2.41667 2.96696H4.58333V0.800293H15.4167V2.96696H17.5833C18.1792 2.96696 18.6894 3.17929 19.1141 3.60396C19.5388 4.02863 19.7507 4.53852 19.75 5.13363V6.21696C19.75 7.58918 19.2939 8.78554 18.3818 9.80604C17.4696 10.8265 16.3368 11.4177 14.9833 11.5795C14.6583 12.41 14.1484 13.1008 13.4537 13.6519C12.7589 14.2029 11.9688 14.5774 11.0833 14.7753V18.1336H15.4167V20.3003H4.58333ZM4.58333 9.25029V5.13363H2.41667V6.21696C2.41667 6.90307 2.61528 7.52165 3.0125 8.07271C3.40972 8.62377 3.93333 9.01629 4.58333 9.25029ZM15.4167 9.25029C16.0667 9.01557 16.5903 8.62268 16.9875 8.07163C17.3847 7.52057 17.5833 6.90235 17.5833 6.21696V5.13363H15.4167V9.25029Z" fill="#807F65" />
                                    </svg>

                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow shadow-[#00000033]   pt-6 pb-9 text-center -mt-4 px-10 ">
                                {/* Title & Price */}
                                <div className="flex justify-between items-center mt-8">
                                    <h2 className="lg:text-xl text-[15px] text-black font-normal">{top1?.name.slice(0, 10)}...</h2>
                                    <span className="text-green-600 font-bold text-lg">${top1?.price}</span>
                                </div>

                                {/* Rating */}
                                {/* font-bold lg:text-2xl */}
                                <div className="flex items-center gap-x-2 mt-2">
                                    <span

                                        className={`font-bold lg:text-2xl 
                                    ${top1?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                top1?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                    top1?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                        top1?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                            "text-[#DC2626 ]"                                    // Default for E or others
                                            }`}
                                    >
                                        {top1?.avg_grade}

                                    </span>
                                    <div className=' w-1.5 h-1.5 bg-black rounded-full ' />
                                    <span>
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99996 14.275L4.84996 16.775C4.66663 16.8917 4.47496 16.9417 4.27496 16.925C4.07496 16.9083 3.89996 16.8417 3.74996 16.725C3.59996 16.6083 3.4833 16.4627 3.39996 16.288C3.31663 16.1133 3.29996 15.9173 3.34996 15.7L4.44996 10.975L0.774963 7.80001C0.608296 7.65001 0.504296 7.47901 0.462963 7.28701C0.421629 7.09501 0.433963 6.90768 0.499963 6.72501C0.565963 6.54235 0.665963 6.39235 0.799963 6.27501C0.933963 6.15768 1.1173 6.08268 1.34996 6.05001L6.19996 5.62501L8.07496 1.17501C8.1583 0.975012 8.28763 0.825012 8.46296 0.725012C8.6383 0.625012 8.8173 0.575012 8.99996 0.575012C9.18263 0.575012 9.36163 0.625012 9.53696 0.725012C9.7123 0.825012 9.84163 0.975012 9.92496 1.17501L11.8 5.62501L16.65 6.05001C16.8833 6.08335 17.0666 6.15835 17.2 6.27501C17.3333 6.39168 17.4333 6.54168 17.5 6.72501C17.5666 6.90835 17.5793 7.09601 17.538 7.28801C17.4966 7.48001 17.3923 7.65068 17.225 7.80001L13.55 10.975L14.65 15.7C14.7 15.9167 14.6833 16.1127 14.6 16.288C14.5166 16.4633 14.4 16.609 14.25 16.725C14.1 16.841 13.925 16.9077 13.725 16.925C13.525 16.9423 13.3333 16.8923 13.15 16.775L8.99996 14.275Z" fill="#F6CF2F" />
                                        </svg>

                                    </span>
                                    <span className="text-black text-xs lg:text-[16px] font-normal">{top1?.avg_overall_rating}</span>
                                </div>

                                {/* Scores */}

                                <div className="flex justify-between gap-2 mt-5">
                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_claims}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Claim</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_service} </span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Service</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_pricing}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Price</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_coverage}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Cover</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_trust}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Trust</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 mt-8 lg:mt-16 mb-5"></div>

                                {/* Footer */}
                                <div className="flex justify-between items-center">
                                    {/* <label className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            id={`compare-${data.id}`}
                                            checked={selected.some(i => i.id === data.id)}
                                            onCheckedChange={(checked) => handleCompareChange(data, checked as boolean)}
                                        />
                                        <span className="cursor-pointer text-[16px] text-[#697079]">
                                            Compare
                                        </span>
                                    </label> */}

                                    <Link href={`/insurance-profile/${top1?.slug}`}>
                                        <button className="flex items-center gap-x-2 lg:text-[16px] cursor-pointer text-sm text-[#D09A40] font-normal hover:underline">
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}


const CardThree = ({ bg }: { bg: string }) => {
    const { data } = useAllInsuranceApiQuery([]);
    const top1: TopInsuranceType = data?.data[2];

    return (
        <>
            {
                top1 && (
                    <div>
                        <div className=' flex justify-center  ' >

                            {
                                <Image unoptimized src={top1?.logo_url} width={1000} height={1000} alt={top1?.name} className=' w-24 h-28 ' />
                            }
                        </div>
                        <div className="mt-6   ">
                            {/* Trophy Badge */}
                            <div className="flex justify-center">
                                <div className="w-12 h-11 rounded-[5px] shadow  flex justify-center items-center" style={{ backgroundColor: bg }}>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.58333 20.3003V18.1336H8.91667V14.7753C8.03194 14.5767 7.24219 14.2022 6.54742 13.6519C5.85264 13.1015 5.34239 12.4107 5.01667 11.5795C3.6625 11.417 2.52969 10.8258 1.61825 9.80604C0.706806 8.78627 0.250722 7.5899 0.25 6.21696V5.13363C0.25 4.53779 0.462333 4.0279 0.887 3.60396C1.31167 3.18002 1.82156 2.96768 2.41667 2.96696H4.58333V0.800293H15.4167V2.96696H17.5833C18.1792 2.96696 18.6894 3.17929 19.1141 3.60396C19.5388 4.02863 19.7507 4.53852 19.75 5.13363V6.21696C19.75 7.58918 19.2939 8.78554 18.3818 9.80604C17.4696 10.8265 16.3368 11.4177 14.9833 11.5795C14.6583 12.41 14.1484 13.1008 13.4537 13.6519C12.7589 14.2029 11.9688 14.5774 11.0833 14.7753V18.1336H15.4167V20.3003H4.58333ZM4.58333 9.25029V5.13363H2.41667V6.21696C2.41667 6.90307 2.61528 7.52165 3.0125 8.07271C3.40972 8.62377 3.93333 9.01629 4.58333 9.25029ZM15.4167 9.25029C16.0667 9.01557 16.5903 8.62268 16.9875 8.07163C17.3847 7.52057 17.5833 6.90235 17.5833 6.21696V5.13363H15.4167V9.25029Z" fill="#807F65" />
                                    </svg>

                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow shadow-[#00000033]   pt-6 pb-9 text-center -mt-4 px-10 ">
                                {/* Title & Price */}
                                <div className="flex justify-between items-center mt-8">
                                    <h2 className="lg:text-xl text-[15px] text-black font-normal">{top1?.name.slice(0, 10)}...</h2>
                                    <span className="text-green-600 font-bold text-lg">${top1?.price}</span>
                                </div>

                                {/* Rating */}
                                {/* font-bold lg:text-2xl */}
                                <div className="flex items-center gap-x-2 mt-2">
                                    <span

                                        className={`font-bold lg:text-2xl 
                                    ${top1?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                top1?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                    top1?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                        top1?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                            "text-[#DC2626 ]"                                    // Default for E or others
                                            }`}
                                    >
                                        {top1?.avg_grade}

                                    </span>
                                    <div className=' w-1.5 h-1.5 bg-black rounded-full ' />
                                    <span>
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99996 14.275L4.84996 16.775C4.66663 16.8917 4.47496 16.9417 4.27496 16.925C4.07496 16.9083 3.89996 16.8417 3.74996 16.725C3.59996 16.6083 3.4833 16.4627 3.39996 16.288C3.31663 16.1133 3.29996 15.9173 3.34996 15.7L4.44996 10.975L0.774963 7.80001C0.608296 7.65001 0.504296 7.47901 0.462963 7.28701C0.421629 7.09501 0.433963 6.90768 0.499963 6.72501C0.565963 6.54235 0.665963 6.39235 0.799963 6.27501C0.933963 6.15768 1.1173 6.08268 1.34996 6.05001L6.19996 5.62501L8.07496 1.17501C8.1583 0.975012 8.28763 0.825012 8.46296 0.725012C8.6383 0.625012 8.8173 0.575012 8.99996 0.575012C9.18263 0.575012 9.36163 0.625012 9.53696 0.725012C9.7123 0.825012 9.84163 0.975012 9.92496 1.17501L11.8 5.62501L16.65 6.05001C16.8833 6.08335 17.0666 6.15835 17.2 6.27501C17.3333 6.39168 17.4333 6.54168 17.5 6.72501C17.5666 6.90835 17.5793 7.09601 17.538 7.28801C17.4966 7.48001 17.3923 7.65068 17.225 7.80001L13.55 10.975L14.65 15.7C14.7 15.9167 14.6833 16.1127 14.6 16.288C14.5166 16.4633 14.4 16.609 14.25 16.725C14.1 16.841 13.925 16.9077 13.725 16.925C13.525 16.9423 13.3333 16.8923 13.15 16.775L8.99996 14.275Z" fill="#F6CF2F" />
                                        </svg>

                                    </span>
                                    <span className="text-black text-xs lg:text-[16px] font-normal">{top1?.avg_overall_rating}</span>
                                </div>

                                {/* Scores */}

                                <div className="flex justify-between gap-2 mt-5">
                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_claims}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Claim</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_service} </span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Service</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_pricing}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Price</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_coverage}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Cover</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="bg-[#E9EAEB] rounded-md px-4 py-2.5 font-normal">{top1?.avg_trust}</span>
                                        <span className="font-thin lg:text-[16px] text-xs text-black mt-1">Trust</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 mt-8 lg:mt-16 mb-5"></div>

                                {/* Footer */}
                                <div className="flex justify-between items-center">
                                    {/* <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <Checkbox /> Compare
                                    </label> */}

                                    <Link href={`/insurance-profile/${top1?.slug}`}>
                                        <button className="flex items-center gap-x-2 lg:text-[16px] cursor-pointer text-sm text-[#D09A40] font-normal hover:underline">
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}







export default TopThree
