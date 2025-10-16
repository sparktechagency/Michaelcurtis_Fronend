"use client"
import React from 'react';
import MaxWidth from '@/app/components/max-width/MaxWidth';

const ProviderSkeleton = () => {
    return (
        <MaxWidth>
            <div className='flex flex-col md:flex-row gap-x-6 my-10 mb-20'>
                {/* Left Filters Skeleton */}
                <div className='md:max-w-[20%] flex-1 p-6 shadow shadow-[#00000033] w-full h-auto space-y-4'>
                    {/* Title */}
                    <div className='h-6 w-32 bg-gray-300 rounded animate-pulse'></div>
                    <div className='h-4 w-20 bg-gray-300 rounded animate-pulse'></div>

                    {/* Search Input */}
                    <div className='w-full h-10 bg-gray-300 rounded animate-pulse mt-4'></div>

                    {/* Policy Type Skeleton */}
                    <div className='mt-5 space-y-2 h-52 overflow-y-scroll'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className='flex items-center gap-x-3'>
                                <div className='w-5 h-5 bg-gray-300 rounded-full animate-pulse'></div>
                                <div className='h-4 w-24 bg-gray-300 rounded animate-pulse'></div>
                            </div>
                        ))}
                    </div>

                    {/* State Dropdown Skeleton */}
                    <div className='mt-4'>
                        <div className='w-full h-10 bg-gray-300 rounded animate-pulse'></div>
                        <div className='mt-2 space-y-2'>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className='h-6 w-full bg-gray-200 rounded animate-pulse'></div>
                            ))}
                        </div>
                    </div>

                    {/* Rating Slider Skeleton */}
                    <div className='mt-4 space-y-2'>
                        <div className='h-4 w-24 bg-gray-300 rounded animate-pulse'></div>
                        <div className='h-2 w-32 bg-gray-200 rounded animate-pulse'></div>
                    </div>

                    {/* Price Dropdown Skeleton */}
                    <div className='mt-4 space-y-2'>
                        <div className='h-10 w-full bg-gray-300 rounded animate-pulse'></div>
                        <div className='space-y-2 mt-2'>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className='h-6 w-full bg-gray-200 rounded animate-pulse'></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Insurance Cards Skeleton */}
                <div className='max-w-[80%] flex-1 mx-auto'>
                    {/* Title Skeleton */}
                    <div className='h-6 w-64 bg-gray-300 rounded animate-pulse'></div>

                    <div className='grid lg:grid-cols-3 gap-x-5 gap-y-6 mt-6'>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className='rounded-xl shadow shadow-[#00000040] p-5 space-y-4 animate-pulse'>
                                {/* Logo & Name */}
                                <div className='flex gap-x-3 items-center'>
                                    <div className='w-12 h-12 bg-gray-300 rounded'></div>
                                    <div className='flex-1 space-y-2'>
                                        <div className='h-4 w-32 bg-gray-300 rounded'></div>
                                        <div className='h-3 w-16 bg-gray-200 rounded'></div>
                                    </div>
                                </div>

                                {/* Ratings */}
                                <div className='flex items-center gap-x-2'>
                                    <div className='h-4 w-6 bg-gray-300 rounded'></div>
                                    <div className='flex gap-x-1'>
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <div key={j} className='w-4 h-4 bg-gray-200 rounded-full'></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats Skeleton */}
                                <div className='flex justify-between gap-x-2'>
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <div key={j} className='flex flex-col space-y-1 items-center'>
                                            <div className='h-6 w-12 bg-gray-300 rounded'></div>
                                            <div className='h-3 w-12 bg-gray-200 rounded'></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Button Skeleton */}
                                <div className='h-10 w-full bg-gray-300 rounded'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MaxWidth>
    )
}

export default ProviderSkeleton;
