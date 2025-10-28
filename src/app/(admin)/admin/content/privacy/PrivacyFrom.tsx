"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
    useGetPrivacyContentQuery,
    usePrivacyContentCreateMutation,
} from "@/app/api/admin/contentApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const PrivacyForm: React.FC = () => {
    const [editorContent, setEditorContent] = useState<string | null>(null);

    const [privacyContentCreate, { isLoading }] = usePrivacyContentCreateMutation();
    const { data } = useGetPrivacyContentQuery({});

    // Redirect if not logged in
    useEffect(() => {
        const adminToken = Cookies.get("admin_token");
        if (!adminToken) window.location.href = "/admin/login";
    }, []);

    // Load initial content once
    useEffect(() => {
        if (data?.data?.content !== undefined) {
            setEditorContent(data.data.content);
        }
    }, [data]);

    const handleEditorChange = (e: EditorTextChangeEvent) => {
        setEditorContent(e.htmlValue || "");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editorContent?.trim()) {
            toast.error("Privacy policy cannot be empty ❌");
            return;
        }

        try {
            const payload = { type: "privacy", content: editorContent };
            const res = await privacyContentCreate(payload).unwrap();
            toast.success(res?.message || "Privacy policy saved ✅");
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    // ✅ Only render editor after content is loaded
    if (editorContent === null) return <p>Loading editor...</p>;

    return (
        <div className="pb-10 pt-3.5 px-5 border border-[#B0B0B0] rounded-[14px]">
            <h1 className="text-[#10101E] font-bold text-4xl">Privacy Policy</h1>
            <p className="mt-3.5">Admin can edit disclaimer</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 space-y-6">
                <Editor
                    value={editorContent} // now fully controlled
                    onTextChange={handleEditorChange}
                    style={{ height: "400px" }}
                    placeholder="Write your privacy policy..."
                />

                <div className="flex justify-end gap-4 mt-16">
                    <Button
                        type="submit"
                        label={isLoading ? "Saving..." : "Save"}
                        icon="pi pi-check"
                        className="w-full border border-[#D1D1D1] bg-[#D09A40] py-3 font-bold text-sm text-white rounded-[8px]"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default PrivacyForm;
