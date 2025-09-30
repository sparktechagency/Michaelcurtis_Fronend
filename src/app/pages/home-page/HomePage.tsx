import React from 'react'
import Banner from './Banner'
import Category from './Category'
import TopInsurance from './TopInsurance'
import Review from './Review'
import WriteReview from './WriteReview'

const HomePage: React.FC = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <TopInsurance></TopInsurance>
            <Review></Review>
            <WriteReview></WriteReview>
        </div>
    )
}

export default HomePage