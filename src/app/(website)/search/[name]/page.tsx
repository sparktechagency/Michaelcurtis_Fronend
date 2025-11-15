import MaxWidth from '@/app/components/max-width/MaxWidth'
import React from 'react'
import { InsuranceCard } from '@/app/components/home/InsuranceCard'
import { TopInsuranceType } from '@/utility/types/admin/insurance-provider/providerType'

interface PageProps {
    params: { name: string }
}

const Page = async ({ params }: PageProps) => {
    const { name } = params;
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${url}/search?search=${name}`, { cache: "no-store" });
    const json = await res.json();
    const insurers: TopInsuranceType[] = json?.data || [];

    return (
        <MaxWidth>
            <div className="pb-6 lg:pb-11">
                <div className="mt-9">
                    {insurers.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg">
                            No results found for {name}
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
                            {insurers.map((insurer) => (
                                <div key={insurer.id} className="h-full">
                                    <InsuranceCard data={insurer} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MaxWidth>
    )
}

export default Page;
