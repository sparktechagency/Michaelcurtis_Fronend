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

    // about us page 


    const about = useMetaDataByPageNameQuery("about");

    const [aboutTitle, setAboutTitle] = useState<string>();
    const [aboutDes, setAboutDes] = useState<string>();

    useEffect(() => {
        if (about) {
            setAboutTitle(about?.data?.data?.title);
            setAboutDes(about?.data?.data?.description);
        }
    }, [about])







    const handleSubmitAboutPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "about",
            title: aboutTitle,
            description: aboutDes
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


    // faq page 


    const [faqTitle, setFaqTitle] = useState<string>();
    const [faqDes, setFaqDes] = useState<string>();
    const faq = useMetaDataByPageNameQuery("faq");

    const handleSubmitFaqPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "faq",
            title: faqTitle,
            description: faqDes
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

    useEffect(() => {
        if (faq) {
            setFaqTitle(faq?.data?.data?.title);
            setFaqDes(faq?.data?.data?.description);
        }
    }, [faq])



    // Accessibility Statement Page



    const [statementTitle, setStatementTitle] = useState<string>();
    const [statementDes, setStatementDes] = useState<string>();
    const statement = useMetaDataByPageNameQuery("statement");

    const handleSubmitStatementPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "statement",
            title: statementTitle,
            description: statementDes
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

    useEffect(() => {
        if (statement) {
            setStatementTitle(statement?.data?.data?.title);
            setStatementDes(statement?.data?.data?.description);
        }
    }, [statement])


    // Community Guidelines Page




    const [communityTitle, setCommunityTitle] = useState<string>();
    const [communityDes, setCommunityDes] = useState<string>();
    const community = useMetaDataByPageNameQuery("community");

    const handleSubmitCommunityPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "community",
            title: communityTitle,
            description: communityDes
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

    useEffect(() => {
        if (community) {
            setCommunityTitle(community?.data?.data?.title);
            setCommunityDes(community?.data?.data?.description);
        }
    }, [community])


    // Terms of Service Page



    const [serviceTitle, setServiceTitle] = useState<string>();
    const [serviceDes, setServiceDes] = useState<string>();
    const service = useMetaDataByPageNameQuery("service");

    console.log("service page is", service?.data?.data)

    const handleSubmitServicePage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "service",
            title: serviceTitle,
            description: serviceDes
        }
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await createMetaData(payload).unwrap();
                console.log("service meta data is", res);
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

    useEffect(() => {
        if (service) {
            setServiceTitle(service?.data?.data?.title);
            setServiceDes(service?.data?.data?.description);
        }
    }, [service])



    // privacy page 




    const [privacyTitle, setPrivacyTitle] = useState<string>();
    const [privacyeDes, setPrivacyDes] = useState<string>();
    const privacy = useMetaDataByPageNameQuery("privacy");

    const handleSubmitPrivacyPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "privacy",
            title: privacyTitle,
            description: privacyeDes
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

    useEffect(() => {
        if (privacy) {
            setServiceTitle(privacy?.data?.data?.title);
            setServiceDes(privacy?.data?.data?.description);
        }
    }, [privacy])





    // Contact Page 





    const [contactTitle, setContactTitle] = useState<string>();
    const [contactDes, setContactDes] = useState<string>();
    const contact = useMetaDataByPageNameQuery("contact");

    const handleSubmitContactPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "contact",
            title: contactTitle,
            description: contactDes
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

    useEffect(() => {
        if (contact) {
            setContactTitle(contact?.data?.data?.title);
            setContactDes(contact?.data?.data?.description);
        }
    }, [contact])


    //  Methodology  page 





    const [metholodgyTitle, setMetholodgyTitle] = useState<string>();
    const [metholodgyDes, setMetholodgyDes] = useState<string>();
    const metholodgy = useMetaDataByPageNameQuery("metholodgy");

    const handleSubmitMetholodgyPage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            page_name: "metholodgy",
            title: metholodgyTitle,
            description: metholodgyDes
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

    useEffect(() => {
        if (metholodgy) {
            setMetholodgyTitle(metholodgy?.data?.data?.title);
            setMetholodgyDes(metholodgy?.data?.data?.description);
        }
    }, [metholodgy])



















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

                {/* Blog  */}
                <div className=' w-full ' >

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

                {/* about  */}

                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >About Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitAboutPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="aboutTitle"
                                    value={aboutTitle}
                                    onChange={(e) => { setAboutTitle(e.target.value) }}
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
                                    name="aboutDes"
                                    value={aboutDes}
                                    onChange={(e) => { setAboutDes(e.target.value) }} cols={30}
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

                {/* Methodology  page   */}
                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >Methodology Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitMetholodgyPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="metholodgyTitle"
                                    value={metholodgyTitle}
                                    onChange={(e) => { setMetholodgyTitle(e.target.value) }}
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
                                    name="metholodgyDes"
                                    value={metholodgyDes}
                                    onChange={(e) => { setMetholodgyDes(e.target.value) }} cols={30}
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

                {/* Contact page  */}

                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >Contact Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitContactPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="contactTitle"
                                    value={contactTitle}
                                    onChange={(e) => { setContactTitle(e.target.value) }}
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
                                    name="contactDes"
                                    value={contactDes}
                                    onChange={(e) => { setContactDes(e.target.value) }} cols={30}
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

                {/* Privacy Policy  */}
                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >Privacy Policy Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitPrivacyPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="privacyTitle"
                                    value={privacyTitle}
                                    onChange={(e) => { setPrivacyTitle(e.target.value) }}
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
                                    name="privacyeDes"
                                    value={privacyeDes}
                                    onChange={(e) => { setPrivacyDes(e.target.value) }} cols={30}
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

                {/* Terms of Service Page  */}

                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >Terms of Service Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitServicePage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="serviceTitle"
                                    value={serviceTitle}
                                    onChange={(e) => { setServiceTitle(e.target.value) }}
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
                                    name="serviceDes"
                                    value={serviceDes}
                                    onChange={(e) => { setServiceDes(e.target.value) }} cols={30}
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

                {/* Community Guidelines Page  */}
                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >Community Guidelines Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitCommunityPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="communityTitle"
                                    value={communityTitle}
                                    onChange={(e) => { setCommunityTitle(e.target.value) }}
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
                                    name="communityDes"
                                    value={communityDes}
                                    onChange={(e) => { setCommunityDes(e.target.value) }} cols={30}
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

                {/* Accessibility Statement Page  */}

                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >Accessibility Statement Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitStatementPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="statementTitle"
                                    value={statementTitle}
                                    onChange={(e) => { setStatementTitle(e.target.value) }}
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
                                    name="statementDes"
                                    value={statementDes}
                                    onChange={(e) => { setStatementDes(e.target.value) }} cols={30}
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

                {/* FAQ  */}
                <div className=' w-full ' >

                    <h1 className=' mb-6 text-3xl font-semibold  ' >FAQ Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form onSubmit={handleSubmitFaqPage} >
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="faqTitle"
                                    value={faqTitle}
                                    onChange={(e) => { setFaqTitle(e.target.value) }}
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
                                    name="faqDes"
                                    value={faqDes}
                                    onChange={(e) => { setFaqDes(e.target.value) }} cols={30}
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
