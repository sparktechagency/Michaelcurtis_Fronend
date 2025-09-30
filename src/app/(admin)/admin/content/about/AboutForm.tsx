"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useAboutContentCreateMutation, useGetAboutContentQuery } from "@/app/api/admin/contentApi";

const AboutForm: React.FC = () => {
    const [about, setAbout] = useState("");

    const [aboutContentCreate, { isLoading }] = useAboutContentCreateMutation();


    const formData = new FormData();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formData.append("type", "about");
        formData.append("content", about);

        try {

            const res = await aboutContentCreate(formData).unwrap();

            if (res) {
                toast.success(res?.message)
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }

    };



    const { data } = useGetAboutContentQuery({});

    useEffect(() => {
        if (data) {
            setAbout(data?.data?.content)
        }
    }, [data])


    return (
        <div className="pb-10 pt-3.5 px-5 border border-[#B0B0B0] rounded-[14px] max-w-4xl mx-auto">
            <h1 className="text-[#10101E] font-bold text-4xl">About</h1>
            <p className="mt-3.5 text-gray-600">Admin can edit disclaimer</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 space-y-6">
                {/* PrimeReact Editor */}
                <Editor
                    value={about}
                    onTextChange={(e) => setAbout(e.htmlValue || "")}
                    style={{ height: "400px" }}
                    placeholder="Write about yourself..."
                />

                {/* Submit Button */}
                <div className="flex justify-end gap-4 mt-16">
                    <Button
                        type="submit"
                        label={isLoading ? "Loading..." : "Save"}
                        icon="pi pi-check"
                        className="p-button-primary w-full border border-[#D1D1D1] bg-[#D09A40] py-3 font-bold text-sm text-white rounded-[8px]"
                    />
                </div>
            </form>
        </div>
    );
};

export default AboutForm;
