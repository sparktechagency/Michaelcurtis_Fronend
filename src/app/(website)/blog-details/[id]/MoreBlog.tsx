import MaxWidth from '@/app/components/max-width/MaxWidth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Blog = {
    id: number;
    title: string;
    description: string;
    image: string;
    category: "Coverage" | "Claims" | "Pricing" | "Digital Tool" | "Community";
};

const MoreBlog = () => {
    const blogs: Blog[] = [
        {
            id: 1,
            title: "Understanding Insurance Coverage",
            description: "A detailed guide to help you understand what coverage means in your policy.",
            image: "/images/blog/coverage.jpg",
            category: "Coverage",
        },
        {
            id: 2,
            title: "How to File Claims Easily",
            description: "Step-by-step process to make your claim approval faster and easier.",
            image: "/images/blog/claims.jpg",
            category: "Claims",
        },
        {
            id: 3,
            title: "Smart Pricing Explained",
            description: "Learn how insurance pricing works and how you can save money.",
            image: "/images/blog/pricing.jpg",
            category: "Pricing",
        },
        {
            id: 4,
            title: "Top Digital Tools for Policy Management",
            description: "Explore the latest apps and tools to manage your policies digitally.",
            image: "/images/blog/digital.jpg",
            category: "Digital Tool",
        },
        {
            id: 5,
            title: "Building a Supportive Community",
            description: "Discover how community-driven insurance groups add value to your policy.",
            image: "/images/blog/community.jpg",
            category: "Community",
        },
    ];
    return (
        <div className=' lg:py-10 py-5 ' >
            <MaxWidth>
                <div>
                    <h1 className=' text-center lg:text-4xl text-lg font-normal  ' >Continue Reading</h1>
                </div>
                <div className=' lg:mt-7 mt-3 ' >
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-12">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-xl shadow shadow-[#00000033] overflow-hidden transition"
                            >
                                <Image
                                    src={"/images/blog/blog-1.svg"}
                                    alt={'blog.title'}
                                    width={412}
                                    height={227}
                                    className=""
                                />
                                <div className="px-6 pb-8 pt-6 ">
                                    <button className=' py-0.5 px-3 bg-[#C4F0C9] text-[#2D9434] rounded-[4px] ' >Coverage</button>
                                    <h2 className=" mt-2 lg:text-xl text-xs  font-normal text-black h-16  ">{blog.title}</h2>
                                    <p className=" lg:mt-4 mt-3 lg:text-[16px] text-[9px] text-[#000000] h-auto my-auto  ">{blog.description}</p>

                                    <div className=' lg:mt-5 mt-3 flex items-center justify-between my-auto ' >

                                        <div className=' flex flex-row items-center gap-x-4 ' >
                                            <div>
                                                <Image src={"/images/blog/author-image.svg"} width={57} height={57} alt='' className='' />
                                            </div>
                                            <div>
                                                <h1 className=' lg:text-lg font-normal text-xl text-black  ' >JD Vance</h1>
                                                <p className=' lg:text-sm text-xs font-thin ' >October 15,2025</p>
                                            </div>

                                        </div>

                                        <div>
                                            <Link className=' flex flex-row items-center text-[#D09A40] lg:text-lg text-xs font-normal ' href={`/blog-details/${1}`}>
                                                Read Article
                                                <span>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.5 12H19.5M19.5 12L13.875 6M19.5 12L13.875 18" stroke="#D09A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </span>
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MaxWidth>
        </div>
    )
}

export default MoreBlog