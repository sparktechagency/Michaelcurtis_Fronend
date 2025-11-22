"use client"

import MaxWidth from '@/app/components/max-width/MaxWidth'
import React, { useEffect, useState } from 'react'
import { InsuranceCard } from '@/app/components/home/InsuranceCard'
import { TopInsuranceType } from '@/utility/types/admin/insurance-provider/providerType'

interface PageProps {
    params: { name: string }
}

const SearchPage: React.FC<PageProps> = ({ params }) => {
    const [insurers, setInsurers] = useState<TopInsuranceType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const { name } = params;

    useEffect(() => {
        const fetchInsurers = async () => {
            const url = process.env.NEXT_PUBLIC_API_BASE_URL
            if (!url) {
                setError("API_BASE_URL is missing")
                setLoading(false)
                return
            }

            try {
                const res = await fetch(`${url}search?search=${name}`)
                if (!res.ok) {
                    setError("Failed to fetch data")
                    setLoading(false)
                    return
                }

                const json = await res.json()
                const data: TopInsuranceType[] = Array.isArray(json.data) ? json.data : []
                setInsurers(data)
            } catch (e) {
                setError(e instanceof Error ? e.message : "An error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchInsurers()
    }, [name])

    if (loading) {
        return (
            <MaxWidth>
                <p className="text-center text-gray-500 text-lg py-10">Loading...</p>
            </MaxWidth>
        )
    }

    if (error) {
        return (
            <MaxWidth>
                <p className="text-center text-red-500 text-lg py-10">{error}</p>
            </MaxWidth>
        )
    }

    return (
        <MaxWidth>
            <div className="pb-6 lg:pb-11 mt-9">
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
        </MaxWidth>
    )
}

export default SearchPage
