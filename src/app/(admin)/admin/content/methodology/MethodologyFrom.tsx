"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
    useGetMetholodgyContentQuery,
    useMetholodgyContentCreateMutation,
} from "@/app/api/admin/contentApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const MethodologyForm: React.FC = () => {
    const [editorContent, setEditorContent] = useState<string | null>(null);

    const [metholodgyContentCreate, { isLoading }] = useMetholodgyContentCreateMutation();
    const { data } = useGetMetholodgyContentQuery({});

    // Redirect if not logged in
    useEffect(() => {
        const adminToken = Cookies.get("admin_token");
        if (!adminToken) window.location.href = "/admin/login";
    }, []);

    // Load existing content once
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
            toast.error("Methodology content cannot be empty ❌");
            return;
        }

        try {
            const payload = { type: "metholodgy", content: editorContent };
            const res = await metholodgyContentCreate(payload).unwrap();
            toast.success(res?.message || "Saved successfully ✅");
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    // Only render editor after content is loaded
    if (editorContent === null) return <p>Loading editor...</p>;

    return (
        <div className="pb-10 pt-3.5 px-5 border border-[#B0B0B0] rounded-[14px]">
            <h1 className="text-[#10101E] font-bold text-4xl">Methodology</h1>
            <p className="mt-3.5">Admin can edit disclaimer</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 space-y-6">
                <Editor
                    value={editorContent} // controlled editor
                    onTextChange={handleEditorChange}
                    style={{ height: "400px" }}
                    placeholder="Write about methodology..."
                />

                <div className="flex justify-end gap-4 mt-16">
                    <Button
                        type="submit"
                        label={isLoading ? "Loading..." : "Save"}
                        icon="pi pi-check"
                        className="w-full border border-[#D1D1D1] bg-[#D09A40] py-3 font-bold text-sm text-white rounded-[8px]"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default MethodologyForm;
