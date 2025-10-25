import React from 'react'
import BlogBanner from './BlogBanner'
export const metadata = {
    title: "CoverageGrader Blog | Expert Insurance Tips & Insights",
    description:
        "Stay informed with expert advice, honest reviews, and the latest insights from CoverageGrader. Learn how to choose the best insurance plans with confidence.",
};

const Page: React.FC = () => {
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <BlogBanner></BlogBanner>
        </div>
    )
}

export default Page