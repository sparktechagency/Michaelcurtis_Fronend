"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

// ----- TYPES (scores are individual fields) -----
export type ScoreKey =
    | "Claims"
    | "Service"
    | "Pricing"
    | "Coverage"
    | "Trust";

export type Insurer = {
    id: number;
    name: string;
    logoUrl: string;
    priceUSD: number;
    rating: number;
    profileHref?: string;
    grade: string;
    claims: number;
    service: number;
    pricing: number;
    coverage: number;
    digitalTools: number;
};

const metricColors: Record<ScoreKey, string> = {
    Claims: "bg-emerald-500",
    Service: "bg-cyan-500",
    Pricing: "bg-amber-500",
    Coverage: "bg-fuchsia-500",
    "Trust": "bg-orange-500",
};

function Meter({ value, colorClass }: { value: number; colorClass: string }) {
    const pct = Math.max(0, Math.min(100, (value / 5) * 100));

    return (
        <div className="flex items-center gap-3 w-full">
            {/* Background gray bar */}
            <div className="relative h-2 w-full rounded-full bg-gray-300">
                {/* Colored portion */}
                <div
                    className={`absolute left-0 top-0 h-2 rounded-full ${colorClass} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="text-muted-foreground text-sm tabular-nums">
                {value.toFixed(1)}
            </span>
        </div>
    );
}


export function InsuranceCard({ data }: { data: Insurer }) {
    // build rows from individual fields
    const rows: Array<{ label: ScoreKey; value: number }> = [
        { label: "Claims", value: data.claims },
        { label: "Service", value: data.service },
        { label: "Pricing", value: data.pricing },
        { label: "Coverage", value: data.coverage },
        { label: "Trust", value: data.digitalTools },
    ];



    const [selected, setSelected] = React.useState<Insurer[]>([]);
    const [openCompareModal, setOpenCompareModal] = React.useState(false);

    // ✅ Checkbox toggle handler
    const handleCompareChange = (data: Insurer, checked: boolean) => {
        const stored = localStorage.getItem("selectedInsurers");
        const prevSelected: Insurer[] = stored ? JSON.parse(stored) : [];

        let newSelected: Insurer[];

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
                const parsed: Insurer[] = JSON.parse(stored);
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












    return (
        <>
            <Card className="rounded-2xl border border-muted-foreground/10 shadow-sm bg-[#FAF5EC] backdrop-blur-sm">
                <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <div className="border border-[#E9D1A7] rounded-[6px] flex justify-center items-center shadow-sm shrink-0 w-[68px] h-[71px]">
                            {/* Logo placeholder */}
                            <span>


                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-[#000000] leading-none">{data.name}</h3>
                            <div className="mt-2 flex items-center gap-3">
                                <span className="text-lg font-medium text-[#529F22] leading-none">
                                    ${data.priceUSD}
                                </span>
                                <div className=" w-1.5 h-1.5 bg-black rounded-full  " ></div>
                                <div>
                                    <h1
                                        className={`text-lg font-bold ${data?.grade === "B+" ? "text-[#00B8DB]" :
                                            data?.grade === "C+" ? "text-[#FE9A00]" :
                                                data?.grade === "D+" ? "text-[#FF6900]" :
                                                    "text-[#23C223]"
                                            }`}
                                    >
                                        {data?.grade}
                                    </h1>
                                </div>
                                <div className=" w-1.5 h-1.5 bg-black rounded-full  " ></div>
                                <Badge className="gap-1 bg-[#D9AE66] rounded-md px-2 py-1 text-xs">
                                    <Star className="h-3 w-3 fill-[#FFF07E] text-[#FFF07E]" />
                                    {data.rating.toFixed(1)}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="mt-5 gap-y-3">
                        {rows.map((r) => (
                            <React.Fragment key={r.label}>
                                <div className="flex flex-row">
                                    <div className="text-muted-foreground w-[200px]">{r.label}</div>
                                    <Meter value={r.value} colorClass={metricColors[r.label]} />
                                </div>
                            </React.Fragment>
                        ))}
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
                            <Link href={`/insurance-profile/${data?.id}`}>
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


        </>
    );
}
