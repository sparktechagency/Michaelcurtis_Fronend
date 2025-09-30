"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { usePolicyUpdateMutation, useSinglePolicyQuery } from "@/app/api/admin/policyApi";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { updateAlert } from "@/helper/updertAlert";

type PolicyViewProps = {
    policyUpdateModal: boolean;
    setPolicyUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
    policySlug: string | undefined
};

const PolicyUpdate: React.FC<PolicyViewProps> = ({
    policyUpdateModal,
    setPolicyUpdateModal,
    policySlug
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation when modal mounts
    useEffect(() => {
        if (policyUpdateModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [policyUpdateModal]);

    // Close modal smoothly
    const handleClose = useCallback(() => {
        setShowModal(false);
        setTimeout(() => setPolicyUpdateModal(false), 500);
    }, [setPolicyUpdateModal]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClose]);

    // logo 











    const policyId = policySlug

    const { data } = useSinglePolicyQuery(policyId);

    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState(true);
    console.log(status)
    const [categoryName, setCategoryName] = useState("");
    const [logo, setLogo] = useState<File | null>(null);



    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file)); // create preview
        }
    };

    const [editorValue, setEditorValue] = useState<string>("");

    const handleEditorChange = (e: EditorTextChangeEvent) => {
        setEditorValue(e.htmlValue ?? "");
    };

    const [active, setActive] = useState(true); // true = Active, false = Inactive

    useEffect(() => {
        if (data?.data) {
            setStatus(data?.data.status);
            setCategoryName(data?.data.name);
            setPreview(data?.data.logo_url); // show logo from API
            setEditorValue(data?.data.description);
        }
    }, [data]);




    const [policyUpdate] = usePolicyUpdateMutation();




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("status", active ? "active" : "inactive");
        formData.append("name", categoryName);
        formData.append("_method", "PUT");
        if (logo) formData.append("logo_url", logo);
        formData.append("description", editorValue);

        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await policyUpdate({ policySlug, formData }).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }

        } catch (err) {
            console.log(err)
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };







    return (
        <>
            {/* Backdrop */}
            <div
                className={` inset-0   transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className={` max-h-[80vh] overflow-y-auto  fixed top-10 left-1/2 transform -translate-x-1/2 max-w-3xl w-full mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
          ${showModal ? "translate-y-20 opacity-100 scale-100" : "-translate-y-40 opacity-0 scale-95"}  `}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ✕
                </button>

                {/* Modal Content */}
                <div className="">

                    <h1 className=" text-black text-4xl font-normal">Update Policy Category</h1>
                </div>

                <form onSubmit={handleSubmit}  >
                    <div className="mt-8 flex items-center gap-x-10">
                        <h1 className="text-lg font-normal text-black">Status</h1>
                        <span className="cursor-pointer flex items-center gap-x-5 ">
                            <div
                                onClick={() => {
                                    setActive(!active);

                                }}
                                className={`relative w-[67px] h-[26px] rounded-full cursor-pointer transition-colors ${active ? "bg-[#45E03C]" : "bg-gray-400"
                                    }`}
                            >
                                {/* Circle */}
                                <div
                                    className={`absolute top-1/2 -translate-y-1/2 w-[19px] h-[19px] rounded-full bg-white shadow-md transition-all duration-300 ${active ? "right-1" : "left-1"
                                        }`}
                                ></div>

                            </div>
                            <span
                                className={`text-sm font-medium ${active ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {active ? "active" : "inactive"}
                            </span>

                        </span>
                    </div>

                    <div>

                        <div className="mt-8">
                            <label className="block  text-lg font-normal text-[#000000] mb-3 ">Category Name</label>
                            <input
                                type="text"
                                className="w-full p-3 mt-2 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>

                        <div className=" mt-4  " >
                            <label className="block text-lg font-normal text-[#000000] mb-3">Logo</label>
                            <div className="mt-2 w h-[150px] border border-dotted flex items-center justify-center relative">
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    id="logoUpload"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={handleLogoChange}
                                />

                                {/* Custom Upload Button */}
                                <label
                                    htmlFor="logoUpload"
                                    className="cursor-pointer flex flex-col items-center justify-center"
                                >
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.6667 19.9999C36.6667 27.8566 36.6667 31.7849 34.225 34.2249C31.7867 36.6666 27.8567 36.6666 20 36.6666C12.1434 36.6666 8.21504 36.6666 5.77337 34.2249C3.33337 31.7866 3.33337 27.8566 3.33337 19.9999C3.33337 12.1433 3.33337 8.21492 5.77337 5.77325C8.21671 3.33325 12.1434 3.33325 20 3.33325" stroke="#989DA3" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M3.33337 20.8333L6.25337 18.2783C6.98527 17.6384 7.93295 17.3005 8.90458 17.333C9.8762 17.3655 10.7992 17.7659 11.4867 18.4533L18.6367 25.6033C19.1916 26.158 19.9243 26.4992 20.706 26.5669C21.4876 26.6346 22.2681 26.4244 22.91 25.9733L23.4084 25.6233C24.3344 24.9729 25.4536 24.6559 26.5831 24.724C27.7126 24.7921 28.7856 25.2413 29.6267 25.9983L35 30.8333M25 9.16659H30.8334M30.8334 9.16659H36.6667M30.8334 9.16659V14.9999M30.8334 9.16659V3.33325" stroke="#989DA3" strokeWidth="2" strokeLinecap="round" />
                                    </svg>

                                    <span className=" text-[16px] font-normal text-[#677BFF] mt-1.5 flex flex-row ">Upload a fill <p className=" font-thin text-black " >or drag and drop</p> </span>
                                    <h1 className="text-xs font-thin" >PNG,JPG,GIF up to 10 MB</h1>
                                </label>
                            </div>

                            {/* Image Preview */}
                            {preview && (
                                <div className="mt-3">
                                    <Image
                                        src={preview}
                                        width={100}
                                        height={100}
                                        alt="Logo Preview"
                                        className="object-contain border rounded-md w-24 h-24"
                                    />
                                </div>
                            )}


                        </div>

                        <label className="block  text-lg font-normal text-[#000000] mb-4 mt-4" htmlFor="">Detailed Explainer</label>

                        <Editor

                            value={editorValue}      // now always string
                            onTextChange={handleEditorChange}
                            style={{ height: "320px" }}
                        />

                    </div>



                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            onClick={handleClose}
                            className="flex items-center space-x-2 px-8 py-3 text-[#D09A40] rounded-[36px] border border-[#D09A40] transition"
                        >
                            <span>Cancel</span>
                        </button>
                        <button className=" cursor-pointer px-8 py-3 bg-[#D09A40] text-white rounded-[36px] hover:bg-[#b8802f] transition">
                            Save
                        </button>
                    </div>
                </form>



            </div>
        </>
    );
};

export default PolicyUpdate;
