import React from "react";
import RankingBanner from "./RankingBanner";
import RankingInsurance from "./RankingInsurance";
import RakingReview from "./RakingReview";
import type { Metadata } from "next";

// ✅ Metadata must be exported outside the component
export const metadata: Metadata = {
    title: "CoverageGrader.com | Honest Insurance Reviews & Ratings.",
    description: "For the description: Compare real insurance company reviews. See how providers score on claims, coverage, pricing, service, and trust all graded by real customers.",
};

const Page: React.FC = () => {
    return (
        <div className="border-b border-[#989DA3] pb-10 lg:pb-20">
            <RankingBanner />
            <RankingInsurance />
            <RakingReview />
        </div>
    );
};

export default Page;
