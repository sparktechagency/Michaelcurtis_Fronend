import React from "react";
import MaxWidth from "../max-width/MaxWidth";

const InsuranceSkeleton = () => {
    return (
        <div>
            <MaxWidth>
                <main className="max-w-6xl mx-auto p-6">
                    <h1 className="text-center font-medium lg:text-4xl text-2xl mb-10">
                        Browse by Category
                    </h1>

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
                </main>
            </MaxWidth>
        </div>
    );
};

export default InsuranceSkeleton;
