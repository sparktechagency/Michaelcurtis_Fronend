import { ReviewInt } from '@/app/pages/home-page/Review';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ReviewCard = ({ data }: { data: ReviewInt }) => {
    return (
        <div className='w-full max-w-[480px] border border-[#697079] p-5 rounded-[10px]'>
            <div className='flex items-center gap-x-5'>
                {/* Image */}
                <div>
                    <Image
                        src={data.image}
                        width={60}
                        height={60}
                        alt={data.name}
                        className='rounded-full object-cover'
                    />
                </div>

                <div>
                    <div className='flex items-center gap-x-2'>
                        <h1 className='font-medium'>{data.name}</h1>
                        <Badge className="flex items-center gap-1 bg-[#D9AE66] rounded-md px-2 py-1 text-xs">
                            <Star className="h-3 w-3 fill-[#FFF07E] text-[#FFF07E]" />
                            {data.rating.toFixed(1)}
                        </Badge>
                    </div>
                    <div>
                        <p className='text-gray-600 text-xs lg:text-sm'>{data.desiganition}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className='mt-5 lg:mt-8'>
                <p className='text-[#000000] text-xs lg:text-[16px] font-thin'>
                    {data.des}
                </p>
            </div>

            {/* Divider */}
            <div className='bg-[#989DA3] w-full h-[1px] my-5'></div>

            {/* Verified Review */}
            {data.isVerified && (
                <div className='flex items-center gap-x-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.02299 21.23L7.35299 18.416L4.17699 17.731L4.48899 14.454L2.34599 12L4.48999 9.54604L4.17699 6.27004L7.35399 5.58504L9.02299 2.77004L12 4.02704L14.977 2.76904L16.647 5.58504L19.823 6.26904L19.511 9.54604L21.655 12L19.513 14.454L19.824 17.731L16.647 18.415L14.978 21.231L12 19.973L9.02299 21.23ZM10.95 14.858L15.908 9.90004L15.2 9.18004L10.95 13.43L8.79999 11.292L8.09199 12L10.95 14.858Z" fill="#39C85F" />
                    </svg>
                    <p className='text-[#39C85F] font-normal text-xs lg:text-[16px]'>
                        Verified Review
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
