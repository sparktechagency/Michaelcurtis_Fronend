import { useReviewByInsuranceSlugQuery } from '@/app/api/website/review/reviewApi'
import Image from 'next/image'
import React from 'react'

const InsuranceBySlugReview = ({ slug }: { slug: string }) => {
    const { data } = useReviewByInsuranceSlugQuery(slug);

    console.log("Review data is", data);
    return (
        <div>
            <div className=' shadow shadow-[#00000033] border border-[#989DA3] pt-6 pb-4 px-6 mt-4 rounded-[4px] ' >
                <div className=' flex flex-row gap-x-9 ' >
                    <div>
                        <Image src={"/images/review/user-img.svg"} width={65} height={65} alt='' className='' />
                    </div>
                    <div>
                        <div>
                            <h1 className=' lg:text-[27px] text-[16px] font-normal  ' >John D.</h1>
                        </div>
                        <div>
                            <div className=' flex items-center gap-x-4   ' >
                                {/* <span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.02295 19.23L5.35295 16.416L2.17695 15.731L2.48895 12.454L0.345947 10L2.48995 7.54604L2.17695 4.27004L5.35395 3.58504L7.02295 0.770043L9.99995 2.02704L12.9769 0.769043L14.6469 3.58504L17.8229 4.26904L17.5109 7.54604L19.6549 10L17.5129 12.454L17.8239 15.731L14.6469 16.415L12.9779 19.231L9.99995 17.973L7.02295 19.23ZM8.94995 12.858L13.9079 7.90004L13.1999 7.18004L8.94995 11.43L6.79995 9.29204L6.09195 10L8.94995 12.858Z" fill="#39C85F" />
                                            </svg>

                                        </span> */}
                                {/* <div><p className=' text-[#39C85F] font-normal lg:text-[16px] text-xs ' >Verified Review</p></div> */}
                                {/* <div className='  w-2 h-2 bg-black rounded-full ' ></div> */}
                                {/* <div><p className=' font-thin lg:text-[16px] text-xs ' >Auto</p></div>
                                        <div className='  w-2 h-2 bg-black rounded-full ' ></div>
                                        <div><p className=' font-thin lg:text-[16px] text-xs ' >California</p></div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className=' mt-8 text-[#000000] lg:text-[16px] text-xs font-thin  ' >&quot;I&apos;ve been with Liberty Mutual for 5 years and they&apos;ve been fantastic. When I had a fender bender last year, their claims process was smooth and stress-free. The digital app makes everything so easy to manage - I can view my ID cards, make payments, and even file a claim right from my phone. Their rates are a bit higher than some competitors, but the service is worth it.&quot;</p>
                </div>
                <div className=' flex items-center gap-x-5 ' >
                    <button className=' flex flex-row items-center mt-6 border border-[#697079] px-2 py-1 gap-x-1 rounded-2xl ' >
                        <span><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.49996 14.6667V8.00004H1.51162C1.34683 8 1.18575 7.95111 1.04874 7.85954C0.911732 7.76797 0.804949 7.63783 0.741891 7.48558C0.678833 7.33333 0.66233 7.1658 0.69447 7.00418C0.726609 6.84255 0.805948 6.69408 0.922456 6.57754L6.41079 1.0892C6.56706 0.932978 6.77899 0.845215 6.99996 0.845215C7.22093 0.845215 7.43285 0.932978 7.58912 1.0892L13.0775 6.57754C13.194 6.69408 13.2733 6.84255 13.3054 7.00418C13.3376 7.1658 13.3211 7.33333 13.258 7.48558C13.195 7.63783 13.0882 7.76797 12.9512 7.85954C12.8142 7.95111 12.6531 8 12.4883 8.00004H9.49996V14.6667C9.49996 14.8877 9.41216 15.0997 9.25588 15.256C9.0996 15.4122 8.88764 15.5 8.66662 15.5H5.33329C5.11228 15.5 4.90031 15.4122 4.74403 15.256C4.58775 15.0997 4.49996 14.8877 4.49996 14.6667Z" fill="#D09A40" stroke="#D09A40" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </span>
                        <span>24</span>
                    </button>
                    <button className=' flex flex-row items-center mt-6 border border-[#697079] px-2 py-1 gap-x-1 rounded-2xl ' >
                        <span>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.49996 1.3333V7.99996H1.51162C1.34683 8 1.18575 8.04889 1.04874 8.14046C0.911732 8.23203 0.804949 8.36217 0.741891 8.51442C0.678833 8.66667 0.66233 8.8342 0.69447 8.99582C0.726609 9.15745 0.805948 9.30592 0.922456 9.42246L6.41079 14.9108C6.56706 15.067 6.77899 15.1548 6.99996 15.1548C7.22093 15.1548 7.43285 15.067 7.58912 14.9108L13.0775 9.42246C13.194 9.30592 13.2733 9.15745 13.3054 8.99582C13.3376 8.8342 13.3211 8.66667 13.258 8.51442C13.195 8.36217 13.0882 8.23203 12.9512 8.14046C12.8142 8.04889 12.6531 8 12.4883 7.99996H9.49996V1.3333C9.49996 1.11228 9.41216 0.900321 9.25588 0.74404C9.0996 0.58776 8.88764 0.499963 8.66662 0.499963H5.33329C5.11228 0.499963 4.90031 0.58776 4.74403 0.74404C4.58775 0.900321 4.49996 1.11228 4.49996 1.3333Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </span>
                        <span>24</span>
                    </button>
                </div>
            </div>

            <div className=' mt-8 ' >
                <button className=' py-2 px-8 rounded-[5px] bg-[#E9EAEB] block mx-auto font-bold cursor-pointer   text-[#000000] text-[16px] ' >Load More Reviews</button>
            </div>
        </div>
    )
}

export default InsuranceBySlugReview