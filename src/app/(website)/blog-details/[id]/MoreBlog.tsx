"use client"
import { useWebAllBlogQuery } from '@/app/api/website/blog/webBlogApi'
import MaxWidth from '@/app/components/max-width/MaxWidth'
import { BlogApiResponseType } from '@/utility/types/admin/blog/blogType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const MoreBlog = () => {

    const { data } = useWebAllBlogQuery([]);
    const blogs: BlogApiResponseType[] = data?.data || [];

    return (
        <div className=' lg:py-10 py-5 ' >
            <MaxWidth>
                <div>
                    <h1 className=' text-center lg:text-4xl text-lg font-normal  ' >Continue Reading</h1>
                </div>
                <div className=' lg:mt-7 mt-3 ' >
                    {/* Blog Grid */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-12">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-xl shadow shadow-[#00000033] overflow-hidden transition"
                            >
                                <Image
                                    src={blog?.featured_image}
                                    alt={'blog.title'}
                                    width={412}
                                    height={227}
                                    className=" w-full h-[300px] "
                                />
                                <div className="px-6 pb-8 pt-6 ">
                                    <button className=' py-0.5 px-3 bg-[#C4F0C9] text-[#2D9434] rounded-[4px] ' >{blog?.policy_categories?.name}</button>
                                    <h2 className=" mt-2 lg:text-xl text-xs  font-normal text-black h-14  ">{blog.title}</h2>
                                    <p className=" mt-3 lg:mt-4 h-16 lg:text-[16px] text-[9px] text-[#000000]  my-auto">
                                        <span>
                                            {blog.content
                                                .replace(/<[^>]+>/g, "") // remove HTML tags
                                                .slice(0, 100) + (blog.content.replace(/<[^>]+>/g, "").length > 100 ? "..." : "")}
                                        </span>
                                    </p>

                                    <div className=' lg:mt-5 mt-3 flex items-center justify-between my-auto ' >

                                        <div className=' flex flex-row items-center gap-x-4 ' >
                                            <div>
                                                <Image src={blog?.user?.avatar} width={500} height={500} alt={blog?.author_name} className=' w-10 h-10 rounded-full ' />
                                            </div>
                                            <div>
                                                <h1 className=' lg:text-lg font-normal text-xl text-black  ' >{blog?.user?.full_name}</h1>
                                                <p className=' lg:text-sm text-xs font-thin ' >{new Date(blog?.updated_at).toLocaleDateString()}</p>
                                            </div>

                                        </div>

                                        <div>
                                            <Link className=' flex flex-row items-center text-[#D09A40] lg:text-lg text-xs font-normal ' href={`/blog-details/${blog?.slug}`}>
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