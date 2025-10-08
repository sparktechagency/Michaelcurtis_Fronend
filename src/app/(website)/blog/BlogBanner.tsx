"use client";
import MaxWidth from "@/app/components/max-width/MaxWidth";
import { LucideSearch } from "lucide-react";
import React, { useState } from "react";
import { useWebAllBlogQuery } from "@/app/api/website/blog/webBlogApi";
import { BlogApiResponseType } from "@/utility/types/admin/blog/blogType";
import { useWebAllPolicyQuery } from "@/app/api/website/policy/webPolicyApi";
import { SinglePolicyApiResponseType } from "@/utility/types/admin/policy/policyType";
import BlogCard from "./BlogCard";

const BlogBanner = () => {
  const { data: policy } = useWebAllPolicyQuery({});
  const categories: SinglePolicyApiResponseType[] = policy?.data || [];

  const { data } = useWebAllBlogQuery([]);
  const blogs: BlogApiResponseType[] = data?.data || [];

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Filter by category
  const filteredByCategory =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
        (blog) => blog.policy_categories?.name === activeCategory
      );

  // Filter by search query
  const filteredBlogs = filteredByCategory.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="bg-[#FAF5EC] py-8 lg:py-16">
        <MaxWidth>
          <h1 className="text-center lg:text-5xl font-bold text-3xl text-black">
            Insurance Insights &{" "}
            <span className="text-[#D09A40]">Guides</span>
          </h1>
          <p className="text-center lg:mt-6 mt-3 lg:text-xl text-sm font-thin">
            Stay informed with transparent, easy-to-read articles written by
            our editorial team.
          </p>

          {/* Search Form */}
          <div className="lg:mt-10 mt-5">
            <form
              onSubmit={handleSearch}
              className="w-full max-w-md mx-auto relative"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Policy Guides..."
                className="w-full pl-12 pr-4 py-3 focus:outline-none focus:ring-0 transition bg-white rounded-[42px] shadow shadow-[#00000033]"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <LucideSearch size={20} />
              </span>
            </form>
          </div>
        </MaxWidth>
      </div>

      {/* Blogs Section */}
      <div>
        <MaxWidth>
          <div className="lg:mt-7 mt-3 lg:pb-20 pb-10">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {/* "All" Tab */}
              <button
                onClick={() => setActiveCategory("All")}
                className={`py-1.5 px-6 rounded-[4px] border cursor-pointer lg:text-xl text-sm text-black font-normal border-[#BABDC1] transition ${activeCategory === "All"
                    ? "bg-[#D09A40] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                All
              </button>

              {/* Map through categories */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`py-1.5 px-6 rounded-[4px] border cursor-pointer lg:text-xl text-sm text-black font-normal border-[#BABDC1] transition ${activeCategory === cat.name
                      ? "bg-[#D09A40] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat?.name}
                </button>
              ))}
            </div>

            {/* Blog Cards or Fallback */}
            {currentBlogs.length > 0 ? (
              <BlogCard currentBlogs={currentBlogs} />
            ) : (
              <div className="text-center py-16 text-gray-500 text-lg font-medium">
                No blog posts found.
              </div>
            )}

            {/* Pagination */}
            {filteredBlogs.length > 0 && (
              <div className="flex justify-center items-center gap-2 lg:mt-12 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.843063 7.71114L6.50006 13.3681L7.91406 11.9541L2.96406 7.00414L7.91406 2.05414L6.50006 0.640137L0.843063 6.29714C0.655592 6.48466 0.550276 6.73897 0.550276 7.00414C0.550276 7.2693 0.655592 7.52361 0.843063 7.71114Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (num) => (
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
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.15694 7.71114L1.49994 13.3681L0.0859375 11.9541L5.03594 7.00414L0.0859375 2.05414L1.49994 0.640137L7.15694 6.29714C7.34441 6.48466 7.44972 6.73897 7.44972 7.00414C7.44972 7.2693 7.34441 7.52361 7.15694 7.71114Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </MaxWidth>
      </div>
    </>
  );
};

export default BlogBanner;
