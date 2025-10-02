"use client";
import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center  bg-white">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="w-20 h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                {/* Middle Ring */}
                <div className="absolute w-14 h-14 border-4 border-purple-500 border-dashed rounded-full animate-spin [animation-duration:3s]"></div>
                {/* Inner Ring */}
                <div className="absolute w-8 h-8 border-4 border-pink-500 border-dashed rounded-full animate-spin [animation-duration:1.5s]"></div>
            </div>
        </div>
    );
};

export default Loading;
