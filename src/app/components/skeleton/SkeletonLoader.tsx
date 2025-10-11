// components/SkeletonLoader.tsx
import React from 'react';
import MaxWidth from '../max-width/MaxWidth';

type SkeletonLoaderProps = {
    count?: number; // Number of skeleton items
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 18 }) => {
    return (
        <MaxWidth>
            <div className="space-y-4 my-20 ">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4 p-4 border border-gray-200 rounded-md shadow-sm">
                        <div className="rounded-full bg-gray-300 h-12 w-12 flex-shrink-0"></div>
                        <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </MaxWidth>
    );
};

export default SkeletonLoader;
