"use client";

import React from "react";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { InsuranceCard, } from "@/app/components/home/InsuranceCard";
import Link from "next/link";
import { useAllInsuranceApiQuery } from "@/app/api/website/insurance/webInsuranceApi";
import { TopInsuranceType } from "@/utility/types/admin/insurance-provider/providerType";

const TopInsurance = () => {



    const { data } = useAllInsuranceApiQuery([]);

    console.log("top insurance iss", data?.data);


    const insurers: TopInsuranceType[] = data?.data || [];




    return (
        <div className="pb-6 lg:pb-11">
            <MaxWidth>
                <div>
                    <h1 className="text-center font-medium text-2xl lg:text-4xl">Top Insurance Providers</h1>
                    <p className="text-center text-lg lg:text-xl font-light mt-2 lg:mt-3 text-black">
                        Based on community ratings and reviews
                    </p>
                </div>

                <div className="mt-9">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {insurers.slice(0, 4).map((insurer) => (
                            <InsuranceCard key={insurer.id} data={insurer} />
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Link href={"/providers"}>

                            <button className="  cursor-pointer border border-[#D09A40] py-3 px-6 rounded-[26px] text-[#D09A40] font-medium ">
                                View All Providers
                            </button>

                        </Link>

                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default TopInsurance;
