import React from 'react'
import FaqBanner from './FaqBanner'
import FaqText from './FaqText'
import FaqReview from './FaqReview'

const Page: React.FC = () => {
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3]  ' >
            <FaqBanner></FaqBanner>
            <FaqText></FaqText>
            <FaqReview></FaqReview>
        </div>
    )
}

export default Page