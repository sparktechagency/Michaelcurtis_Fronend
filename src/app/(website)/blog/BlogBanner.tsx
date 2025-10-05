"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth';
import { LucideSearch } from 'lucide-react'
import React, { useState } from 'react'

import Image from "next/image";
import Link from 'next/link';

type Blog = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "Coverage" | "Claims" | "Pricing" | "Digital Tool" | "Community";
};

const categories = ["All", "Coverage", "Claims", "Pricing", "Trust", "Community"];

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

const BlogBanner = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // You can add your search logic here
  };



  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  console.log(filteredBlogs)



  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);














  return (
    <>
      <div className=' bg-[#FAF5EC] py-8 lg:py-16 ' >

        <MaxWidth>
          <h1 className=' text-center lg:text-5xl font-bold text-3xl text-black ' >Insurance Insights & <span className=' text-[#D09A40] ' >Guides</span></h1>
          <p className=' text-center lg:mt-6 mt-3 lg:text-xl text-sm font-thin ' >Stay informed with transparent, easy-to-read articles written by our editorial team.</p>
          <div className=' lg:mt-10 mt-5 ' >
            <form
              onSubmit={handleSearch}
              className="w-full max-w-md mx-auto relative"
            >
              {/* Search Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Policy Guides..."
                className="w-full pl-12 pr-4 py-3  focus:outline-none focus:ring-0 transition bg-white rounded-[42px] shadow shadow-[#00000033]"
              />

              {/* Search Icon */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <LucideSearch size={20} />
              </span>
            </form>
          </div>



        </MaxWidth>
      </div>
      <div  >
        <MaxWidth>
          <div className=" lg:mt-7 mt-3 lg:pb-20 pb-10 ">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 ">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={` py-1.5 px-6 rounded-[4px] border cursor-pointer lg:text-xl text-sm text-black  font-normal  border-[#BABDC1] transition ${activeCategory === cat
                    ? "bg-[#D09A40] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>


            {/* first blog  */}

            <div className=' flex flex-col lg:space-y-0 rounded-md space-y-4 lg:flex-row gap-x-6 lg:mt-20 mt-10 mb-6 lg:mb-12 shadow shadow-[#00000033] bg-white items-center px-2  ' >

              {/* left side  */}
              <div className=' w-full  lg:max-w-[40%] flex-1  ' >
                <Image src={"/images/blog/blog.svg"} width={544} height={400} alt='' className='' />
              </div>
              {/* right side  */}
              <div className=' w-full  lg:max-w-[60%] flex-1 lg:p-0 p-3  ' >
                <button className=' bg-[#E4C4F0] py-1 px-3 rounded-[3px] text-[#942D8D] ' >Editors Pick</button>
                <h1 className=' lg:mt-6 mt-3 lg:text-[33px] text-lg font-normal text-black ' >How to Navigate Insurance Claims After Natural Disasters</h1>
                <p className=' lg:mt-5 mt-3 lg:text-xl text-xs font-thin ' >
                  A comprehensive guide to understanding your coverage, documenting damage, and working with adjusters when disaster strikes.
                </p>
                <div className=' lg:mt-5 mt-3 flex items-center justify-between  ' >

                  <div className=' flex flex-row items-center gap-x-4 ' >
                    <div>
                      <Image src={"/images/blog/author-image.svg"} width={60} height={57} alt='' className=' w-full ' />
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






















            {/* Blog Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-12">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow shadow-[#00000033] overflow-hidden transition"
                >
                  <Image
                    src={"/images/blog/blog-1.svg"}
                    alt={'blog.title'}
                    width={412}
                    height={227}
                    className=" w-full "
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 lg:mt-12 mt-6  ">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              >
                <span>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.843063 7.71114L6.50006 13.3681L7.91406 11.9541L2.96406 7.00414L7.91406 2.05414L6.50006 0.640137L0.843063 6.29714C0.655592 6.48466 0.550276 6.73897 0.550276 7.00414C0.550276 7.2693 0.655592 7.52361 0.843063 7.71114Z" fill="#1E1E1E" />
                  </svg>

                </span>
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded ${currentPage === num
                    ? "bg-[#D09A40] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              >
                <span>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.15694 7.71114L1.49994 13.3681L0.0859375 11.9541L5.03594 7.00414L0.0859375 2.05414L1.49994 0.640137L7.15694 6.29714C7.34441 6.48466 7.44972 6.73897 7.44972 7.00414C7.44972 7.2693 7.34441 7.52361 7.15694 7.71114Z" fill="#1E1E1E" />
                  </svg>

                </span>
              </button>
            </div>


          </div>
        </MaxWidth>
      </div>
    </>
  )
}

export default BlogBanner