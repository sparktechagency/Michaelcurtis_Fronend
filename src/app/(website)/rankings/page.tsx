import React from 'react'
import RankingBanner from './RankingBanner'
import RankingInsurance from './RankingInsurance'
import RakingReview from './RakingReview'

const Page: React.FC = () => {
    return (
        <div className=' border-b border-[#989DA3] pb-10 lg:pb-20 ' >
            <RankingBanner />
            <RankingInsurance></RankingInsurance>
            <RakingReview></RakingReview>
        </div>
    )
}

export default Page