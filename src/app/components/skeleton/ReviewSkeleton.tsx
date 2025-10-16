import React from "react";
import MaxWidth from "../max-width/MaxWidth";

const ReviewSkeleton = () => {
    return (
        <div className="lg:pb-[57px] pb-7 " >
            <MaxWidth>

                <div className='text-center'>
                    <h1 className='lg:text-4xl text-2xl font-medium text-black'>Community Highlights</h1>
                    <p className='mt-2.5 font-thin lg:text-xl text-sm mb-6 lg:mb-9'>
                        See what policyholders are saying in the latest verified reviews.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white h-[300px] rounded-xl shadow-md border border-gray-200 p-4 relative overflow-hidden"
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse opacity-80"></div>

                            <div className="relative z-10 flex flex-col space-y-4">
                                {/* Top Avatar Placeholder */}
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gray-300"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                                    </div>
                                </div>

                                {/* Body lines */}
                                <div className="space-y-4 mt-6">
                                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                                    <div className="h-4 bg-gray-300 rounded w-36"></div>
                                    <div className="h-3 bg-gray-300 rounded w-28"></div>
                                </div>

                                {/* Footer line */}
                                <div className="mt-auto">
                                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </MaxWidth>
        </div >
    );
};

export default ReviewSkeleton;
