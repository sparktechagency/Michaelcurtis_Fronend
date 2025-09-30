"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Banner = () => {
    const router = useRouter();
    const handleSearch = () => {
        router.push("search")
    }
    return (
        <div className=' bg-[#faf5ec]  lg:py-20 py-10 ' >
            <MaxWidth>
                <div className='mx-auto ' >
                    <div className=' flex flex-col lg:flex-row gap-x-20 items-start lg:space-y-0 space-y-10  ' >
                        {/* left side  */}
                        <div className=' w-full  lg:max-w-[55%] mx-auto  '  >
                            <div>
                                <h1 className=' text-[#4C545F] font-bold lg:text-[55px] text-3xl ' >
                                    Transparent Insurance Reviews, <span className=' text-[#D09A40] ' >Powered by the Community</span>
                                </h1>
                                <p className=' mt-4 text-[#697079] lg:text-xl text-[15px] ' >
                                    The first platform built for real people to share real insurance experiences — no paid placements, no sales pitches
                                </p>
                            </div>
                            <div className="lg:mt-6 mt-3">
                                <div className="relative flex items-center">
                                    {/* Search Icon */}
                                    <SearchIcon
                                        size={23}
                                        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    />

                                    {/* Input */}
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Search by company, state, or policy type..."
                                        className="text-[#989DA3] w-full text-lg pl-[50px] pr-[120px] py-4 border-4 border-[#F8F2E5] focus:outline-none focus:ring-0 bg-white rounded-[42px]"
                                        style={{
                                            boxShadow: "0 4px 10px rgba(248, 242, 229, 0.8)",
                                        }}
                                    />

                                    {/* Search Button */}
                                    <button
                                        onClick={handleSearch}
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D19B40] text-white cursor-pointer font-medium px-6 py-2 rounded-[30px]  transition"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                        </div >
                        {/* right side  */}
                        <div className=' w-full  lg:max-w-[45%] mx-auto  ' >
                            <Image src={"/images/home/banner/banner-image.png"} width={1500} height={1500} alt='banner' className=' object-cover  ' />
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default Banner