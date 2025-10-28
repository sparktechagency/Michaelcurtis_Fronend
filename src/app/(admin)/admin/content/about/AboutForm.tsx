"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useAboutContentCreateMutation, useGetAboutContentQuery } from "@/app/api/admin/contentApi";
import Cookies from "js-cookie";

const AboutForm: React.FC = () => {
    const [about, setAbout] = useState<string | null>(null);
    const [aboutContentCreate, { isLoading }] = useAboutContentCreateMutation();
    const { data } = useGetAboutContentQuery({});

    // Redirect if not logged in
    useEffect(() => {
        const adminToken = Cookies.get("admin_token");
        if (!adminToken) window.location.href = "/admin/login";
    }, []);

    // Load content once
    useEffect(() => {
        if (data?.data?.content !== undefined) {
            setAbout(data.data.content);
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!about?.trim()) {
            toast.error("Content cannot be empty ❌");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("type", "about");
            formData.append("content", about);

            const res = await aboutContentCreate(formData).unwrap();
            toast.success(res?.message || "Saved successfully ✅");
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    // Only render editor after content is loaded
    if (about === null) return <p>Loading editor...</p>;

    return (
        <div className="pb-10 pt-3.5 px-5 border border-[#B0B0B0] rounded-[14px] max-w-4xl mx-auto">
            <h1 className="text-[#10101E] font-bold text-4xl">About</h1>
            <p className="mt-3.5 text-gray-600">Admin can edit disclaimer</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 space-y-6">
                <Editor
                    value={about} // controlled editor
                    onTextChange={(e) => setAbout(e.htmlValue || "")}
                    style={{ height: "400px" }}
                    placeholder="Write about yourself..."
                />

                <div className="flex justify-end gap-4 mt-16">
                    <Button
                        type="submit"
                        label={isLoading ? "Loading..." : "Save"}
                        icon="pi pi-check"
                        className="p-button-primary w-full border border-[#D1D1D1] bg-[#D09A40] py-3 font-bold text-sm text-white rounded-[8px]"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default AboutForm;
