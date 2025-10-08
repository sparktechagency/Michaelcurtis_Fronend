import React from 'react'
import BlogDetails from './BlogDetails'
import MoreBlog from './MoreBlog'
interface PageProps {
    params: { id: string }
}

const Page: React.FC<PageProps> = ({ params }) => {
    const { id } = params
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <BlogDetails slug={id} ></BlogDetails>
            <MoreBlog></MoreBlog>
        </div>
    )
}

export default Page