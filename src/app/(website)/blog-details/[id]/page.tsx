'use client'


import { useParams } from 'next/navigation'
import BlogDetails from './BlogDetails'
import MoreBlog from './MoreBlog'

const Page = () => {
    const params = useParams()
    const id = params.id as string



    return (
        <div className="bg-[#f9fafb] border-b border-[#989DA3]">
            <BlogDetails slug={id} />
            <MoreBlog />
        </div>
    )
}

export default Page
