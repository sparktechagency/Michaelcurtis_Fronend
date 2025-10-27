"use client"
import { useCreateMetaDataMutation, useMetaDataByPageNameQuery } from '@/app/api/admin/metaDataApi'
import { updateAlert } from '@/helper/updertAlert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const MetaForm = () => {

    const { data } = useMetaDataByPageNameQuery("home");





    const [createMetaData] = useCreateMetaDataMutation();
    // home page 
    const [homeTitle, setHomeTitle] = useState<string>();
    const [homeDes, setHomeDes] = useState<string>();

    useEffect(() => {
        if (data?.data) {
            setHomeTitle(data?.data?.title);
            setHomeDes(data?.data?.description);
        }
    }, [data])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "home",
            title: homeTitle,
            description: homeDes
        }
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await createMetaData(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (err) {
            // ❌ Error Handling
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };

    //     Ranking Page



    const [rankingTitle, setRankingTitle] = useState<string>();
    const [raningDes, setRankingDes] = useState<string>();
    const rank = useMetaDataByPageNameQuery("ranking");



    useEffect(() => {
        if (rank.data) {
            setRankingTitle(rank?.data?.data?.title);
            setRankingDes(rank?.data?.data?.description);
        }
    }, [rank])

    const handleSubmitRankingPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "ranking",
            title: rankingTitle,
            description: raningDes
        }
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await createMetaData(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (err) {
            // ❌ Error Handling
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };


    // Provider Page

    const provider = useMetaDataByPageNameQuery("provider");

    const [providerTitle, setProviderTitle] = useState<string>();
    const [providerDes, setProviderDes] = useState<string>();

    useEffect(() => {
        if (provider) {
            setProviderTitle(provider?.data?.data?.title);
            setProviderDes(provider?.data?.data?.description);
        }
    }, [provider])







    const handleSubmitProviderPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "provider",
            title: providerTitle,
            description: providerDes
        }
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await createMetaData(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (err) {
            // ❌ Error Handling
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };





    // Policy Page

    const policy = useMetaDataByPageNameQuery("policy");

    const [policyTitle, setPolicyTitle] = useState<string>();
    const [policyDes, setPolicyDes] = useState<string>();

    useEffect(() => {
        if (policy) {
            setPolicyTitle(policy?.data?.data?.title);
            setPolicyDes(policy?.data?.data?.description);
        }
    }, [policy])







    const handleSubmitPolicyPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "policy",
            title: policyTitle,
            description: policyDes
        }
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await createMetaData(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (err) {
            // ❌ Error Handling
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };





    // blog page 



    const blog = useMetaDataByPageNameQuery("blog");

    const [blogTitle, setBlogTitle] = useState<string>();
    const [blogDes, setBlogDes] = useState<string>();

    useEffect(() => {
        if (blog) {
            setBlogTitle(blog?.data?.data?.title);
            setBlogDes(blog?.data?.data?.description);
        }
    }, [blog])







    const handleSubmitBlogPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "blog",
            title: blogTitle,
            description: blogDes
        }
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await createMetaData(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }
        } catch (err) {
            // ❌ Error Handling
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };





















    return (
        <>
            <div className=' flex justify-between  items-center  ' >
                <div className=' w-full ' >
                    <h1 className=' mb-6 text-3xl font-semibold  ' >Home Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">
                        {/* Home page */}
                        <form onSubmit={handleSubmit} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="homeTitle"
                                    value={homeTitle}
                                    onChange={(e) => { setHomeTitle(e.target.value) }}
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="homeDes"
                                    value={homeDes}
                                    onChange={(e) => { setHomeDes(e.target.value) }}
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Ranking page  */}
                <div className=' w-full ' >
                    <h1 className=' mb-6 text-3xl font-semibold ' >Ranking Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">
                        <form onSubmit={handleSubmitRankingPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="rankingTitle"
                                    value={rankingTitle}
                                    onChange={(e) => { setRankingTitle(e.target.value) }}
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="raningDes"
                                    value={raningDes}
                                    onChange={(e) => { setRankingDes(e.target.value) }}
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className=' flex justify-between mt-6 ' >
                <div className=' w-full ' >
                    {/* Provider page  */}
                    <h1 className=' mb-6 text-3xl font-semibold  ' >Provider Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitProviderPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="providerTitle"
                                    value={providerTitle}
                                    onChange={(e) => { setProviderTitle(e.target.value) }}
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="providerDes"
                                    value={providerDes}
                                    onChange={(e) => { setProviderDes(e.target.value) }}
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Policies Page */}
                <div className=' w-full ' >
                    <h1 className=' mb-6 text-3xl font-semibold ' >Policies Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">
                        <form onSubmit={handleSubmitPolicyPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="policyTitle"
                                    value={policyTitle}
                                    onChange={(e) => { setPolicyTitle(e.target.value) }}

                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="policyDes"
                                    value={policyDes}
                                    onChange={(e) => { setPolicyDes(e.target.value) }}
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className=' flex justify-between mt-6 ' >
                <div className=' w-full ' >
                    {/* Blog  */}
                    <h1 className=' mb-6 text-3xl font-semibold  ' >Blog Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitBlogPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="blogTitle"
                                    value={blogTitle}
                                    onChange={(e) => { setBlogTitle(e.target.value) }}
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="blogDes"
                                    value={blogDes}
                                    onChange={(e) => { setBlogDes(e.target.value) }} cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>








        </>
    )
}

export default MetaForm
