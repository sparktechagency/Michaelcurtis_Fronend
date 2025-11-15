import React from 'react'
import ContactFrom from './ContactFrom'
import { Metadata } from 'next';
const url = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ This special function runs **on the server** before rendering
export async function generateMetadata(): Promise<Metadata> {
    if (!url) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");

    }

    try {
        const response = await fetch(`${url}meta-datas/contact`, {

            next: { revalidate: 1 }, // every 1 hour
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();



        return {
            title: data?.data?.title || "",
            description:
                data?.data?.description ||
                "",
        };
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return {
            title: "",
            description: "      ",
        };
    }
}

const Page: React.FC = () => {
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >Contact  <span className=' text-[#D09A40] ' >Us</span></h1>

                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    We’re here to help. Send us your question or feedback and we’ll get back to you.
                </p>
            </div>
            <ContactFrom></ContactFrom>
        </div>
    )
}

export default Page