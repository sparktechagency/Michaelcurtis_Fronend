"use client"
import React from 'react';
import MaxWidth from '../max-width/MaxWidth';

const RankingSkeleton = () => {
    return (
        <MaxWidth>
            <div className="flex items-center justify-between p-4 border rounded-xl shadow bg-white animate-pulse">
                {/* Rank */}
                <div className="w-6 h-6 bg-gray-300 rounded font-bold text-center text-sm"></div>

                {/* Logo & Name */}
                <div className="flex items-center gap-4 flex-1 ml-2">
                    <div className="w-12 h-12 bg-gray-300 rounded"></div>
                    <div className="flex flex-col gap-1">
                        <div className="h-4 w-24 bg-gray-300 rounded"></div> {/* Provider Name */}
                        <div className="h-3 w-16 bg-gray-200 rounded"></div> {/* Rating A+ */}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4">
                    {/* Claim */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-8 bg-gray-300 rounded"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    </div>
                    {/* Service */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-8 bg-gray-300 rounded"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    </div>
                    {/* Price */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-8 bg-gray-300 rounded"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    </div>
                    {/* Cover */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-8 bg-gray-300 rounded"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    </div>
                    {/* Trust */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-8 bg-gray-300 rounded"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center gap-4 ml-4">
                    <div className="h-6 w-14 bg-gray-300 rounded"></div> {/* Price */}
                    <div className="h-8 w-24 bg-gray-300 rounded"></div> {/* View Profile */}
                </div>

                {/* Compare Checkbox */}
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
        </MaxWidth>
    );
};

export default RankingSkeleton;
