import React from 'react'
import HomePage from '../pages/home-page/HomePage'
import { Metadata } from 'next';
// ✅ Metadata must be exported outside the component
export const metadata: Metadata = {
    title: "CoverageGrader.com | Honest Insurance Reviews & Ratings.",
    description: "For the description: Compare real insurance company reviews. See how providers score on claims, coverage, pricing, service, and trust all graded by real customers.",
};

const Page: React.FC = () => {
    return (
        <div>
            <HomePage></HomePage>
        </div>
    )
}

export default Page