"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { TopInsuranceType } from "@/utility/types/admin/insurance-provider/providerType";

import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation'






export function InsuranceCard({ data }: { data: TopInsuranceType }) {




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

        redirect("/InsuranceTable");

    };







    return (
        <>
            <Card className="rounded-2xl border border-muted-foreground/10 shadow-sm bg-[#FAF5EC] backdrop-blur-sm">
                <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <div className=" flex justify-center items-center shadow-sm shrink-0 ">
                            {/* Logo placeholder */}
                            <span>
                                <Image src={data?.logo_url} width={2000} height={2000} alt={data?.name} className=" w-[68px] h-[71px] rounded-[6px] border border-[#E9D1A7]  " />


                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-[#000000] leading-none">{data.name.slice(0, 15)}....</h3>
                            <div className="mt-2 flex items-center gap-3">
                                <span className="text-lg font-medium text-[#529F22] leading-none">
                                    ${data.price}
                                </span>
                                <div className=" w-1.5 h-1.5 bg-black rounded-full  " ></div>
                                <div>
                                    <h1
                                        className={`text-lg font-bold 
                                            ${data?.avg_grade === "A" ? "text-[#22C55E]" :    // Green for A
                                                data?.avg_grade === "B" ? "text-[#3B82F6]" :      // Blue for B
                                                    data?.avg_grade === "C" ? "text-[#EAB308 " :      // Yellow/Orange for C
                                                        data?.avg_grade === "D" ? "text-[#F97316]" :      // Dark Orange for D
                                                            "text-[#DC2626 ]"                                    // Default for E or others
                                            }`}
                                    >
                                        {data?.avg_grade}
                                    </h1>
                                </div>
                                <div className=" w-1.5 h-1.5 bg-black rounded-full  " ></div>
                                <Badge className="gap-1 bg-[#D9AE66] rounded-md px-2 py-1 text-xs">
                                    <Star className="h-3 w-3 fill-[#FFF07E] text-[#FFF07E]" />
                                    {data?.avg_overall_rating}
                                </Badge>
                            </div>
                            <div>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6 mt-6 ">

                        {/* Claims */}
                        <div className="flex items-center gap-x-5 justify-between  ">

                            {/* Label */}
                            <h1 className="text-gray-700 font-medium w-13 ">Claims</h1>

                            {/* Progress Bar */}
                            <div className=" w-[55%] ">
                                <ProgressBar
                                    completed={data?.avg_claims * 20}
                                    isLabelVisible={false}
                                    height="10px"
                                    bgColor={
                                        data?.avg_claims == 5 ? "#22C55E" :       // Green (A)
                                            data?.avg_claims == 4 ? "#3B82F6" :       // Blue (B)
                                                data?.avg_claims == 3 ? "#EAB308" :       // Yellow (C)
                                                    data?.avg_claims == 2 ? "#F97316" :       // Orange (D)
                                                        "#DC2626"                                 // Red (E)
                                    }
                                />
                            </div>

                            {/* Rating Text */}
                            <div className=" text-right">
                                {
                                    data?.avg_claims == 5 ? (
                                        <span className="text-[#22C55E]">{data?.avg_claims} (A)</span>
                                    ) : data?.avg_claims == 4 ? (
                                        <span className="text-[#3B82F6]">{data?.avg_claims} (B)</span>
                                    ) : data?.avg_claims == 3 ? (
                                        <span className="text-[#EAB308]">{data?.avg_claims} (C)</span>
                                    ) : data?.avg_claims == 2 ? (
                                        <span className="text-[#F97316 ]">{data?.avg_claims} (D)</span>
                                    ) : data?.avg_claims == 1 ? (
                                        <span className="text-[#DC2626 ]">{data?.avg_claims} (E)</span>
                                    ) : (
                                        <span>-</span>
                                    )
                                }
                            </div>

                        </div>

                        {/* Service */}
                        <div className="flex items-center gap-x-5 justify-between  ">

                            {/* Label */}
                            <h1 className="text-gray-700 font-medium w-13  ">Service</h1>

                            {/* Progress Bar */}
                            <div className="w-[55%]">
                                <ProgressBar
                                    completed={data?.avg_service * 20}
                                    isLabelVisible={false}
                                    height="10px"
                                    bgColor={
                                        data?.avg_service == 5 ? "#22C55E" :       // Green (A)
                                            data?.avg_service == 4 ? "#3B82F6" :       // Blue (B)
                                                data?.avg_service == 3 ? "#EAB308" :       // Yellow (C)
                                                    data?.avg_service == 2 ? "#F97316" :       // Orange (D)
                                                        "#DC2626"                                 // Red (E)
                                    }
                                />
                            </div>

                            {/* Rating Text */}
                            <div className=" text-right">
                                {
                                    data?.avg_service == 5 ? (
                                        <span className="text-[#22C55E]">{data?.avg_service} (A)</span>
                                    ) : data?.avg_service == 4 ? (
                                        <span className="text-[#3B82F6]">{data?.avg_service} (B)</span>
                                    ) : data?.avg_service == 3 ? (
                                        <span className="text-[#EAB308]">{data?.avg_service} (C)</span>
                                    ) : data?.avg_service == 2 ? (
                                        <span className="text-[#F97316 ]">{data?.avg_service} (D)</span>
                                    ) : data?.avg_service == 1 ? (
                                        <span className="text-[#DC2626 ]">{data?.avg_service} (E)</span>
                                    ) : (
                                        <span>-</span>
                                    )
                                }
                            </div>

                        </div>

                        {/* Pricing */}
                        <div className="flex items-center justify-between gap-x-5 ">

                            {/* Label */}
                            <h1 className="text-gray-700 font-medium w-13 ">Pricing</h1>

                            {/* Progress Bar */}
                            <div className="w-[55%]">
                                <ProgressBar
                                    completed={data?.avg_pricing * 20}
                                    isLabelVisible={false}
                                    height="10px"
                                    bgColor={
                                        data?.avg_pricing == 5 ? "#22C55E" :       // Green (A)
                                            data?.avg_pricing == 4 ? "#3B82F6" :       // Blue (B)
                                                data?.avg_pricing == 3 ? "#EAB308" :       // Yellow (C)
                                                    data?.avg_pricing == 2 ? "#F97316" :       // Orange (D)
                                                        "#DC2626"                                 // Red (E)
                                    }
                                />
                            </div>

                            {/* Rating Text */}
                            <div className=" text-right">
                                {
                                    data?.avg_pricing == 5 ? (
                                        <span className="text-[#22C55E]">{data?.avg_pricing} (A)</span>
                                    ) : data?.avg_pricing == 4 ? (
                                        <span className="text-[#3B82F6]">{data?.avg_pricing} (B)</span>
                                    ) : data?.avg_pricing == 3 ? (
                                        <span className="text-[#EAB308]">{data?.avg_pricing} (C)</span>
                                    ) : data?.avg_pricing == 2 ? (
                                        <span className="text-[#F97316 ]">{data?.avg_pricing} (D)</span>
                                    ) : data?.avg_pricing == 1 ? (
                                        <span className="text-[#DC2626 ]">{data?.avg_pricing} (E)</span>
                                    ) : (
                                        <span>-</span>
                                    )
                                }
                            </div>

                        </div>

                        {/* Coverage */}
                        <div className="flex items-center justify-between gap-x-5 ">

                            {/* Label */}
                            <h1 className="text-gray-700 font-medium w-13  ">Coverage</h1>

                            {/* Progress Bar */}
                            <div className="w-[55%]">
                                <ProgressBar
                                    completed={data?.avg_coverage * 20}
                                    isLabelVisible={false}
                                    height="10px"
                                    bgColor={
                                        data?.avg_coverage == 5 ? "#22C55E" :       // Green (A)
                                            data?.avg_coverage == 4 ? "#3B82F6" :       // Blue (B)
                                                data?.avg_coverage == 3 ? "#EAB308" :       // Yellow (C)
                                                    data?.avg_coverage == 2 ? "#F97316" :       // Orange (D)
                                                        "#DC2626"                                 // Red (E)
                                    }
                                />
                            </div>

                            {/* Rating Text */}
                            <div className=" text-right">
                                {
                                    data?.avg_coverage == 5 ? (
                                        <span className="text-[#22C55E]">{data?.avg_coverage} (A)</span>
                                    ) : data?.avg_coverage == 4 ? (
                                        <span className="text-[#3B82F6]">{data?.avg_coverage} (B)</span>
                                    ) : data?.avg_coverage == 3 ? (
                                        <span className="text-[#EAB308]">{data?.avg_coverage} (C)</span>
                                    ) : data?.avg_coverage == 2 ? (
                                        <span className="text-[#F97316 ]">{data?.avg_coverage} (D)</span>
                                    ) : data?.avg_coverage == 1 ? (
                                        <span className="text-[#DC2626 ]">{data?.avg_coverage} (E)</span>
                                    ) : (
                                        <span>-</span>
                                    )
                                }
                            </div>

                        </div>

                        {/* Trust */}
                        <div className="flex items-center justify-between gap-x-5 ">

                            {/* Label */}
                            <h1 className="text-gray-700 font-medium w-13  ">Trust</h1>

                            {/* Progress Bar */}
                            <div className="w-[55%]">
                                <ProgressBar
                                    completed={data?.avg_trust * 20}
                                    isLabelVisible={false}
                                    height="10px"
                                    bgColor={
                                        data?.avg_trust == 5 ? "#22C55E" :       // Green (A)
                                            data?.avg_trust == 4 ? "#3B82F6" :       // Blue (B)
                                                data?.avg_trust == 3 ? "#EAB308" :       // Yellow (C)
                                                    data?.avg_trust == 2 ? "#F97316" :       // Orange (D)
                                                        "#DC2626"                                 // Red (E)
                                    }
                                />
                            </div>

                            {/* Rating Text */}
                            <div className=" text-right">
                                {
                                    data?.avg_trust == 5 ? (
                                        <span className="text-[#22C55E]">{data?.avg_trust} (A)</span>
                                    ) : data?.avg_trust == 4 ? (
                                        <span className="text-[#3B82F6]">{data?.avg_trust} (B)</span>
                                    ) : data?.avg_trust == 3 ? (
                                        <span className="text-[#EAB308]">{data?.avg_trust} (C)</span>
                                    ) : data?.avg_trust == 2 ? (
                                        <span className="text-[#F97316 ]">{data?.avg_trust} (D)</span>
                                    ) : data?.avg_trust == 1 ? (
                                        <span className="text-[#DC2626 ]">{data?.avg_trust} (E)</span>
                                    ) : (
                                        <span>-</span>
                                    )
                                }
                            </div>

                        </div>
                    </div>









                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className=" flex flex-row items-center gap-x-3 " >
                            <label className="flex items-center gap-2 text-sm">
                                <Checkbox
                                    id={`compare-${data.id}`}
                                    checked={selected.some(i => i.id === data.id)}
                                    onCheckedChange={(checked) => handleCompareChange(data, checked as boolean)}
                                />
                                <span className="cursor-pointer text-[16px] text-[#697079]">
                                    Compare
                                </span>
                            </label>
                        </div>

                        <Button
                            variant="ghost"
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            asChild
                        >
                            <Link href={`/insurance-profile/${data?.slug}`}>
                                View Profile <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>



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


        </>
    );
}
