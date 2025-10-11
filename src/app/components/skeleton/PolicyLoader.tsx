"use client";

import React from "react";
import MaxWidth from "../max-width/MaxWidth";

export default function PolicyLoader() {
    return (
        <MaxWidth>
            <main className=" max-w-6xl mx-auto  p-6 h-[600px] ">

                <h1 className=' text-center font-medium lg:text-4xl text-2xl mb-10 ' >Browse by Category</h1>
                <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "repeat(auto-fill, 260px)" }}
                >
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse w-[260px] h-[136px] bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="p-3 flex flex-col h-full">
                                {/* Top Section (Avatar + Text) */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-24" />
                                        <div className="h-2 bg-gray-200 rounded w-16" />
                                    </div>
                                </div>

                                {/* Bottom Section (Content Lines) */}
                                <div className="mt-3 flex-1">
                                    <div className="h-3 bg-gray-200 rounded w-32 mb-2" />
                                    <div className="h-3 bg-gray-200 rounded w-28 mb-2" />
                                    <div className="h-2 bg-gray-200 rounded w-24 mt-auto" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </MaxWidth>
    );
}
