"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import {
    useGetPrivacyContentQuery,
    usePrivacyContentCreateMutation,
} from "@/app/api/admin/contentApi";

// Define type for the form state
type PrivacyFormState = {
    about: string;
};

const PrivacyForm: React.FC = () => {
    const [formData, setFormData] = useState<PrivacyFormState>({
        about: "",
    });

    // Mutations & Queries
    const [privacyContentCreate, { isLoading }] =
        usePrivacyContentCreateMutation();
    const { data } = useGetPrivacyContentQuery({});

    // Handle Editor change
    const handleEditorChange = (e: EditorTextChangeEvent) => {
        setFormData({ ...formData, about: e.htmlValue || "" });
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.about.trim()) {
            toast.error("Privacy policy cannot be empty ❌");
            return;
        }

        try {
            const payload = {
                type: "privacy",
                content: formData.about,
            };

            const res = await privacyContentCreate(payload).unwrap();

            if (res) {
                toast.success(res?.message || "Privacy policy saved ✅");
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & {
                data?: { message?: string };
            };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };

    // Load existing content
    useEffect(() => {
        if (data?.data?.content) {
            setFormData({ about: data.data.content });
        }
    }, [data]);

    return (
        <div className="pb-10 pt-3.5 px-5 border border-[#B0B0B0] rounded-[14px]">
            <h1 className="text-[#10101E] font-bold text-4xl">Privacy Policy</h1>
            <p className="mt-3.5">Admin can edit disclaimer</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 space-y-6">
                {/* PrimeReact Editor */}
                <Editor
                    value={formData.about}
                    onTextChange={handleEditorChange}
                    style={{ height: "400px" }}
                    placeholder="Write your privacy policy..."
                />

                {/* Submit Button */}
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
