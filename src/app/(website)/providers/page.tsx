import React from 'react'
import ProviderBanner from './ProviderBanner'
import { Metadata } from 'next';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ This special function runs **on the server** before rendering
export async function generateMetadata(): Promise<Metadata> {
  if (!url) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not defined");

  }

  try {
    const response = await fetch(`${url}meta-datas/provider`, {

      next: { revalidate: 3600 }, // every 1 hour
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
    <div className=' border-b border-[#989DA3] ' >
      <ProviderBanner></ProviderBanner>
    </div>
  )
}

export default Page