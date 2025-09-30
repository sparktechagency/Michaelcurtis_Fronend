"use client"
import ReviewCard from '@/app/components/home/ReviewCard';
import MaxWidth from '@/app/components/max-width/MaxWidth';
import React, { useState } from 'react';

export interface ReviewInt {
    id: number;
    image: string;
    name: string;
    desiganition: string;
    isVerified: boolean;
    rating: number;
    des: string;
}

const Review = () => {
    const reviewData: ReviewInt[] = [
        {
            id: 1,
            image: "/images/home/review/img-1.png",
            name: "Sarah M.",
            desiganition: "From San Diego, CA",
            des: "The claims process was surprisingly smooth. I filed everything through their app and had a check within a week. Highly recommend for their digital experience.",
            isVerified: true,
            rating: 4.5
        },
        {
            id: 2,
            image: "/images/home/review/img-1.png",
            name: "Sarah M.",
            desiganition: "From San Diego, CA",
            des: "The claims process was surprisingly smooth. I filed everything through their app and had a check within a week. Highly recommend for their digital experience.",
            isVerified: true,
            rating: 4.5
        },
        {
            id: 3,
            image: "/images/home/review/img-1.png",
            name: "Sarah M.",
            desiganition: "From San Diego, CA",
            des: "The claims process was surprisingly smooth. I filed everything through their app and had a check within a week. Highly recommend for their digital experience.",
            isVerified: true,
            rating: 4.5
        },
        {
            id: 4,
            image: "/images/home/review/img-1.png",
            name: "Sarah M.",
            desiganition: "From San Diego, CA",
            des: "The claims process was surprisingly smooth. I filed everything through their app and had a check within a week. Highly recommend for their digital experience.",
            isVerified: true,
            rating: 4.5
        },
        {
            id: 5,
            image: "/images/home/review/img-1.png",
            name: "Sarah M.",
            desiganition: "From San Diego, CA",
            des: "The claims process was surprisingly smooth. I filed everything through their app and had a check within a week. Highly recommend for their digital experience.",
            isVerified: true,
            rating: 4.5
        }
    ];

    const [showAll, setShowAll] = useState(false);

    const toggleShow = () => {
        setShowAll(!showAll);
    };

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
