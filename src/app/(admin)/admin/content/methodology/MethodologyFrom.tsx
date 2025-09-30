"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import {
    useGetMetholodgyContentQuery,
    useMetholodgyContentCreateMutation,
} from "@/app/api/admin/contentApi";

// Define type for the form state
type MethodologyFormState = {
    about: string;
};

const MethodologyForm: React.FC = () => {
    const [formData, setFormData] = useState<MethodologyFormState>({
        about: "",
    });

    const [metholodgyContentCreate, { isLoading }] =
        useMetholodgyContentCreateMutation();

    // Handle Editor change
    const handleEditorChange = (e: EditorTextChangeEvent) => {
        setFormData({ ...formData, about: e.htmlValue || "" });
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const payload = {
                type: "metholodgy",
                content: formData.about,
            };

            const res = await metholodgyContentCreate(payload).unwrap();

            if (res) {
                toast.success(res?.message || "Saved successfully ✅");
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

    // Fetch existing content
    const { data } = useGetMetholodgyContentQuery({});

    useEffect(() => {
        if (data?.data?.content) {
            setFormData({ about: data.data.content });
        }
    }, [data]);

    return (
        <div className="pb-10 pt-3.5 px-5 border border-[#B0B0B0] rounded-[14px]">
            <h1 className="text-[#10101E] font-bold text-4xl">Methodology</h1>
            <p className="mt-3.5">Admin can edit disclaimer</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 space-y-6">
                {/* PrimeReact Editor */}
                <Editor
                    value={formData.about}
                    onTextChange={handleEditorChange}
                    style={{ height: "400px" }}
                    placeholder="Write about methodology..."
                />

                {/* Submit Button */}
                <div className="flex justify-end gap-4 mt-16">
                    <Button
                        type="submit"
                        label={isLoading ? "Loading..." : "Save"}
                        icon="pi pi-check"
                        className="w-full border border-[#D1D1D1] bg-[#D09A40] py-3 font-bold text-sm text-white rounded-[8px]"
                    />
                </div>
            </form>
        </div>
    );
};

export default MethodologyForm;
