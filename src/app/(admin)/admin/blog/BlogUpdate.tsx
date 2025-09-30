"use client"
import { Editor } from "primereact/editor";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSingleBlogQuery, useUserBlogUpdateMutation } from "@/app/api/admin/blogApi";
import { useAllPolicyQuery } from "@/app/api/admin/policyApi";
import { AllPolicyApiResponse } from "@/utility/types/admin/policy/policyType";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { updateAlert } from "@/helper/updertAlert";


type PolicyViewProps = {
    blogUpdate: boolean;
    setBlogUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    blogSlug: string | null
};

const BlogUpdate: React.FC<PolicyViewProps> = ({
    blogUpdate,
    setBlogUpdate,
    blogSlug
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (blogUpdate) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [blogUpdate]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setBlogUpdate(false), 500);
    }, [setBlogUpdate]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClose]);

    // Close on ESC and handle focus trap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();

            if (e.key === "Tab" && modalRef.current) {
                const focusableEls = modalRef.current.querySelectorAll(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const firstEl = focusableEls[0] as HTMLElement;
                const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

                if (!e.shiftKey && document.activeElement === lastEl) {
                    firstEl.focus();
                    e.preventDefault();
                } else if (e.shiftKey && document.activeElement === firstEl) {
                    lastEl.focus();
                    e.preventDefault();
                }
            }
        };

        if (blogUpdate) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [blogUpdate, handleClose]);



    const { data } = useSingleBlogQuery(blogSlug);

    console.log(`policy_categories data is-------------`, data?.data?.policy_categories?.name);

    const { data: policyResponse } = useAllPolicyQuery({});


    const policyData: AllPolicyApiResponse[] = policyResponse?.data || [];




    useEffect(() => {
        if (data?.data) {
            setTitle(data?.data?.title);
            setAuthor(data?.data?.author_name);
            setDescription(data?.data?.content);
            setPreview(data?.data?.featured_image);
            setCategory(data?.data?.policy_categories?.id)
        }
    }, [data]);

    const [userBlogUpdate, { isLoading }] = useUserBlogUpdateMutation();






    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const payload = new FormData();
        payload.append("category_id", category);
        payload.append("title", title);
        payload.append("author_name", author);
        if (image) {
            payload.append("featured_image", image)
        }
        payload.append("content", description);
        payload.append("_method", "PUT");
        e.preventDefault();
        try {

            const res = await updateAlert();
            if (res?.isConfirmed) {
                const res = await userBlogUpdate({ blogSlug, payload }).unwrap();

                if (res) {
                    toast.success(res?.message)
                    handleClose();
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
                className={`fixed inset-0   bg-opacity-50 transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`fixed top-10 h-[80vh] overflow-y-auto left-1/2 transform -translate-x-1/2 max-w-3xl w-full mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
          ${showModal ? "translate-y-20 opacity-100 scale-100" : "-translate-y-40 opacity-0 scale-95"}`}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    ref={firstFocusableRef}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ✕
                </button>


                <div className="">
                    <h1 className="text-2xl font-semibold mb-6">Create Blog Post</h1>
                    <form

                        className=" rounded-lg   "
                    >
                        {/* Post Title */}
                        <div className="flex flex-col">
                            <label className="mb-3  text-xl font-normal ">Post Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="px-4 py-2 border border-[#989DA3] rounded-[7px] focus:outline-none focus:ring-0 "
                                // placeholder="Enter post title"
                                required
                            />
                        </div>

                        <div className=" mt-3.5 flex flex-row gap-x-10 " >
                            {/* Author Name */}
                            <div className="w-full flex flex-col ">
                                <label className="mb-3  text-xl font-normal">Author Name</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="px-4 py-2 border border-[#989DA3] rounded-[7px] focus:outline-none focus:ring-0  "
                                    // placeholder="Enter author name"
                                    required
                                />
                            </div>

                            {/* Select Category */}
                            <div className="w-full flex flex-col">
                                <label className="mb-3 text-xl font-normal">Select Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="px-4 py-2 border border-[#989DA3] rounded-[7px] focus:outline-none focus:ring-0"
                                    required
                                >
                                    {/* <option value="">-- Select Category --</option> */}
                                    {policyData.map((cat) => (
                                        <option key={cat?.id} value={cat?.id}>
                                            {cat?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Blog Description */}
                        <div className="flex flex-col mt-10 ">
                            <label className="mb-3  text-xl font-normal">Blog Description</label>
                            <Editor
                                value={description}
                                onTextChange={(e) => setDescription(e.htmlValue ?? "")}
                                style={{ height: "200px" }}
                                className="border rounded"
                            />
                        </div>

                        {/* Post Image */}
                        <div className="flex flex-col mt-3.5 ">
                            <label className="mb-3  text-xl font-normal">Post Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="px-4 py-2 border border-[#989DA3] rounded-[7px] focus:outline-none focus:ring-0 "
                            />
                            {preview && (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={1000}
                                    height={1000}
                                    className="mt-2 w-48 h-48 object-cover rounded"
                                />
                            )}
                        </div>


                    </form>
                </div>



                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        onClick={handleClose}
                        className="flex items-center space-x-2 px-8 cursor-pointer py-3 text-[#D09A40] rounded-[36px] border border-[#D09A40] transition"
                    >
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-8 cursor-pointer py-3 bg-[#D09A40] text-white rounded-[36px] hover:bg-[#b8802f] transition">
                        {
                            isLoading ? "Loading..." : "Save"
                        }
                    </button>
                </div>
            </div>
        </>
    );
};

export default BlogUpdate;
