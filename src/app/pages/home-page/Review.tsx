"use client"
import { useHomePageAllReviewQuery } from '@/app/api/website/review/homeReview';
import ReviewCard from '@/app/components/home/ReviewCard';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import ReviewSkeleton from '@/app/components/skeleton/ReviewSkeleton';
import { ReviewResponseType } from '@/utility/types/website/review-type/reviewType';
import React, { useState } from 'react';



const Review = () => {

    const { data, isLoading } = useHomePageAllReviewQuery({});


    const reviewData: ReviewResponseType[] = data?.data || [];

    const [showAll, setShowAll] = useState(false);

    const toggleShow = () => {
        setShowAll(!showAll);
    };

    if (isLoading) {
        return (
            <div>
                <ReviewSkeleton></ReviewSkeleton>
            </div>
        )
    }

    return (
        <div className=' lg:pb-[57px] pb-7  ' >
            <MaxWidth>
                <div className='text-center'>
                    <h1 className='lg:text-4xl text-2xl font-medium text-black'>Community Highlights</h1>
                    <p className='mt-2.5 font-thin lg:text-xl text-sm mb-6 lg:mb-9'>
                        See what policyholders are saying in the latest verified reviews.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 lg:gap-x-7 gap-y-6 transition-all duration-500 ease-in-out">
                    {(showAll ? reviewData : reviewData.slice(0, 3)).map((item) => (
                        <ReviewCard key={item.id} data={item} />
                    ))}
                </div>

                <div className="text-center lg:mt-9 mt-5  ">
                    {reviewData.length > 3 && (
                        <button
                            onClick={toggleShow}
                            className=" py-2 px-5 border border-[#D09A40] rounded-[26px] text-[#D09A40] font-normal lg:text-xl text-lg cursor-pointer "
                        >
                            {showAll ? 'Show Less' : 'See All Reviews'}
                        </button>
                    )}
                </div>
            </MaxWidth>
        </div>
    );
};

export default Review;
