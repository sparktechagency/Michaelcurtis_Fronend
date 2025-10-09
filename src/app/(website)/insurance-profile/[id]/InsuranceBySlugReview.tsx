"use client";
import { useReviewByInsuranceSlugQuery } from '@/app/api/website/review/reviewApi';
import { useAddVoteOrRemoveMutation } from '@/app/api/website/user/webUserApi';
import { ReviewWithVote } from '@/utility/types/website/review-type/reviewType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const InsuranceBySlugReview = ({ slug }: { slug: string }) => {
    const { data } = useReviewByInsuranceSlugQuery(slug);
    const [addVoteOrRemove] = useAddVoteOrRemoveMutation();

    const [reviews, setReviews] = useState<ReviewWithVote[]>([]);
    const [visibleCount, setVisibleCount] = useState(2);

    // Initialize reviews when data loads
    useEffect(() => {
        if (data?.data?.data) {
            setReviews(data.data.data);
        }
    }, [data]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    const handleAddVote = async (id: number) => {
        try {
            const payload = { vote: 1 };
            const res = await addVoteOrRemove({ payload, id }).unwrap();

            if (res) {
                // Optimistically update UI
                setReviews(prev =>
                    prev.map(review =>
                        review.id === id
                            ? { ...review, upvotes: review.upvotes + 1 }
                            : review
                    )
                );
                toast.success(res?.message);
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    const handleRemoveVote = async (id: number, type: "upvote" | "downvote") => {
        // Optimistic update: update UI immediately
        setReviews(prev =>
            prev.map(review => {
                if (review.id === id) {
                    if (type === "upvote" && review.upvotes > 0) {
                        return { ...review, upvotes: review.upvotes - 1 };
                    }
                    if (type === "downvote" && review.downvotes > 0) {
                        return { ...review, downvotes: review.downvotes - 1 };
                    }
                }
                return review;
            })
        );

        try {
            const payload = { vote: type === "upvote" ? 1 : -1 }; // backend expects 1 for upvote, -1 for downvote
            const res = await addVoteOrRemove({ payload, id }).unwrap();

            if (res) {
                // Sync with backend in case counts differ
                setReviews(prev =>
                    prev.map(review =>
                        review.id === id
                            ? {
                                ...review,
                                upvotes: res.data?.upvotes ?? review.upvotes,
                                downvotes: res.data?.downvotes ?? review.downvotes,
                            }
                            : review
                    )
                );
                toast.success(res?.message);
            }
        } catch (err) {
            // Rollback UI if API fails
            setReviews(prev =>
                prev.map(review => {
                    if (review.id === id) {
                        if (type === "upvote") return { ...review, upvotes: review.upvotes + 1 };
                        if (type === "downvote") return { ...review, downvotes: review.downvotes + 1 };
                    }
                    return review;
                })
            );

            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };


    const visibleReviews = reviews.slice(0, visibleCount);

    return (
        <div>
            {visibleReviews.map((item, i) => (
                <div key={i}>
                    <div className='shadow shadow-[#00000033] border border-[#989DA3] pt-6 pb-4 px-6 mt-4 rounded-[4px]'>
                        <div className='flex flex-row gap-x-9'>
                            <div>
                                <Image
                                    src={item?.user?.avatar || "/images/review/user-img.svg"}
                                    width={65}
                                    height={65}
                                    alt={item?.user?.first_name}
                                    className="w-16 h-16 rounded-full"
                                />
                            </div>
                            <div>
                                <h1 className='lg:text-[27px] text-[16px] font-normal'>
                                    {item?.user?.full_name || "Anonymous"}
                                </h1>
                            </div>
                        </div>

                        <p className='mt-8 text-[#000000] lg:text-[16px] text-xs font-thin'>
                            {item?.comment || "No review text available."}
                        </p>

                        <div className='flex items-center gap-x-5'>
                            <button
                                onClick={() => handleAddVote(item.id)}
                                className='cursor-pointer flex flex-row items-center mt-6 border border-[#697079] px-2 py-1 gap-x-1 rounded-2xl'
                            >
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49996 14.6667V8.00004H1.51162C1.34683 8 1.18575 7.95111 1.04874 7.85954C0.911732 7.76797 0.804949 7.63783 0.741891 7.48558C0.678833 7.33333 0.66233 7.1658 0.69447 7.00418C0.726609 6.84255 0.805948 6.69408 0.922456 6.57754L6.41079 1.0892C6.56706 0.932978 6.77899 0.845215 6.99996 0.845215C7.22093 0.845215 7.43285 0.932978 7.58912 1.0892L13.0775 6.57754C13.194 6.69408 13.2733 6.84255 13.3054 7.00418C13.3376 7.1658 13.3211 7.33333 13.258 7.48558C13.195 7.63783 13.0882 7.76797 12.9512 7.85954C12.8142 7.95111 12.6531 8 12.4883 8.00004H9.49996V14.6667C9.49996 14.8877 9.41216 15.0997 9.25588 15.256C9.0996 15.4122 8.88764 15.5 8.66662 15.5H5.33329C5.11228 15.5 4.90031 15.4122 4.74403 15.256C4.58775 15.0997 4.49996 14.8877 4.49996 14.6667Z" fill="#D09A40" stroke="#D09A40" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{item?.upvotes}</span>
                            </button>

                            <button
                                onClick={() => handleRemoveVote(item.id)}
                                className='cursor-pointer flex flex-row items-center mt-6 border border-[#697079] px-2 py-1 gap-x-1 rounded-2xl'
                            >
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49996 1.3333V7.99996H1.51162C1.34683 8 1.18575 8.04889 1.04874 8.14046C0.911732 8.23203 0.804949 8.36217 0.741891 8.51442C0.678833 8.66667 0.66233 8.8342 0.69447 8.99582C0.726609 9.15745 0.805948 9.30592 0.922456 9.42246L6.41079 14.9108C6.56706 15.067 6.77899 15.1548 6.99996 15.1548C7.22093 15.1548 7.43285 15.067 7.58912 14.9108L13.0775 9.42246C13.194 9.30592 13.2733 9.15745 13.3054 8.99582C13.3376 8.8342 13.3211 8.66667 13.258 8.51442C13.195 8.36217 13.0882 8.23203 12.9512 8.14046C12.8142 8.04889 12.6531 8 12.4883 7.99996H9.49996V1.3333C9.49996 1.11228 9.41216 0.900321 9.25588 0.74404C9.0996 0.58776 8.88764 0.499963 8.66662 0.499963H5.33329C5.11228 0.499963 4.90031 0.58776 4.74403 0.74404C4.58775 0.900321 4.49996 1.11228 4.49996 1.3333Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{item?.downvotes}</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {visibleCount < reviews.length && (
                <div className='mt-8'>
                    <button
                        onClick={handleLoadMore}
                        className='py-2 px-8 rounded-[5px] bg-[#E9EAEB] block mx-auto font-bold cursor-pointer text-[#000000] text-[16px]'
                    >
                        Load More Reviews
                    </button>
                </div>
            )}
        </div>
    );
};

export default InsuranceBySlugReview;
