import React from "react";

const MaxWidth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default MaxWidth;
