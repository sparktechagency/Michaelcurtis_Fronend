import { BlogApiResponseType } from '@/utility/types/admin/blog/blogType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ currentBlogs }: { currentBlogs: BlogApiResponseType[] }) => {
    const firstBlog = currentBlogs[0]
    return (
        <div>

            <div className=' flex flex-col lg:space-y-0 rounded-md space-y-4 lg:flex-row gap-x-6 lg:mt-20 mt-10 mb-6 lg:mb-12 shadow shadow-[#00000033] bg-white items-center   ' >

                {/* left side  */}
                <div className=' w-full  lg:max-w-[40%] flex-1  ' >
                    <Image src={firstBlog?.featured_image} width={1000} height={1000} alt={firstBlog?.author_name} className=' w-[1500px]  h-[336px]  ' />
                </div>
                {/* right side  */}
                <div className=' w-full  lg:max-w-[60%] flex-1 lg:p-0 p-3  ' >
                    <button className=' bg-[#E4C4F0] py-1 px-3 rounded-[3px] text-[#942D8D] ' >{firstBlog?.policy_categories?.name} </button>
                    <h1 className=' lg:mt-6 mt-3 lg:text-[33px] text-lg font-normal text-black ' > {firstBlog?.author_name} </h1>
                    <p className=' lg:mt-5 mt-3 lg:text-xl text-xs font-thin ' >
                        <span>
                            {firstBlog?.content
                                .replace(/<[^>]+>/g, "") // remove HTML tags
                                .slice(0, 100) + (firstBlog?.content.replace(/<[^>]+>/g, "").length > 100 ? "..." : "")}
                        </span>
                    </p>
                    <div className=' lg:mt-5 mt-3 flex items-center justify-between  ' >

                        <div className=' flex flex-row items-center gap-x-4 ' >
                            <div>
                                <Image src={firstBlog?.user?.avatar || "/images/blog/author-image.svg"} width={60} height={57} alt='' className='   w-10 h-10 rounded-full  ' />
                            </div>
                            <div>
                                <h1 className=' lg:text-lg font-normal text-xl text-black  ' >{firstBlog?.user?.full_name}</h1>
                                <p className=' lg:text-sm text-xs font-thin ' >{new Date(firstBlog?.updated_at).toLocaleDateString()}</p>
                            </div>

                        </div>

                        <div>
                            <Link className=' flex flex-row items-center text-[#D09A40] lg:text-lg text-xs font-normal ' href={`/blog-details/${firstBlog?.slug}`}>
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


            {/* Blog Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-12">
                {currentBlogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-xl shadow shadow-[#00000033] overflow-hidden transition"
                    >
                        <Image
                            src={blog?.featured_image}
                            alt={blog.title}
                            width={412}
                            height={227}
                            className=" w-full h-[250px]"
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
    )
}

export default BlogCard