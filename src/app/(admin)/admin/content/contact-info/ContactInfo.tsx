"use client"

import { useGetSocialMediaLinkQuery, useStoreSocialMedialMutation } from "@/app/api/admin/socialLinkApi";
import { updateAlert } from "@/helper/updertAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ContactInfo = () => {



    const [facebook, setFacebook] = useState<string>();
    const [instagram, setInstagram] = useState<string>();
    const [twitter, setTwitter] = useState<string>();
    const [linkedin, setLinkedin] = useState<string>();

    const { data } = useGetSocialMediaLinkQuery([]);



    useEffect(() => {
        if (data?.data) {
            setFacebook(data?.data.facebook);
            setInstagram(data?.data?.instagram);
            setTwitter(data?.data?.twitter);
            setLinkedin(data?.data?.linkedin);
        }
    }, [data])

    const payload = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        linkedin: linkedin
    }


    const [storeSocialMedial, { isLoading }] = useStoreSocialMedialMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const confirm = await updateAlert();
            if (confirm.isConfirmed) {
                // unwrap() returns the actual data or throws on error, so message is available on the returned value
                const result = await storeSocialMedial(payload).unwrap();
                if (result) {
                    toast.success(result.message);
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
        <div className="flex items-center justify-center  px-4">
            <div className="w-full  rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Add Your Social Media Links
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Facebook */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Facebook Link
                        </label>
                        <input
                            type="url"
                            name="facebook"
                            placeholder="https://facebook.com/yourprofile"
                            value={facebook}
                            onChange={(e) => { setFacebook(e.target.value) }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-0  focus:outline-none"
                        />
                    </div>

                    {/* Instagram */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Instagram Link
                        </label>
                        <input
                            type="url"
                            name="instagram"
                            value={instagram}
                            onChange={(e) => { setInstagram(e.target.value) }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-0  focus:outline-none"
                        />
                    </div>

                    {/* Twitter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Twitter Link
                        </label>
                        <input
                            type="url"
                            name="twitter"
                            placeholder="https://twitter.com/yourprofile"
                            value={twitter}
                            onChange={(e) => { setTwitter(e.target.value) }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-0  focus:outline-none"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            LinkedIn Link
                        </label>
                        <input
                            type="url"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={linkedin}
                            onChange={(e) => { setLinkedin(e.target.value) }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-0  focus:outline-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="flex flex-row items-center gap-x-1 bg-[#D09A40] border border-[#D09A40] rounded-[34px] px-5 py-2 cursor-pointer text-white text-xl font-norma justify-center "
                    >
                        {
                            isLoading ? "loading..." : "Save Links"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactInfo;
