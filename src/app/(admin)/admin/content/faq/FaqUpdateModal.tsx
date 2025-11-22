"use client"
import { useFaqUpdateMutation, useSingleFaqQuery } from "@/app/api/admin/faqApi";
import { updateAlert } from "@/helper/updertAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Editor } from "primereact/editor";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


type PolicyViewProps = {
    updateModal: boolean;
    setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
    faqId: number | null
};

const FaqUpdateModal: React.FC<PolicyViewProps> = ({
    updateModal,
    setUpdateModal,
    faqId
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (updateModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [updateModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setUpdateModal(false), 500);
    }, [setUpdateModal]);

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

        if (updateModal) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [updateModal, handleClose]);


    const [title, setTitle] = useState("");


    const [description, setDescription] = useState("");






    // faq update 

    const id = faqId;

    const { data } = useSingleFaqQuery(id);



    useEffect(() => {
        if (data) {
            setTitle(data?.data?.question);
            setDescription(data?.data?.answer);
        }
    }, [data]);


    const [faqUpdate, { isLoading }] = useFaqUpdateMutation()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const payload = {
        //     question: title,
        //     answer: description
        // }
        const payload = new FormData();

        payload.append("question", title);
        payload.append("answer", description);
        payload.append("_method", "PUT")

        if (id === null) {
            toast.error("FAQ ID is missing.");
            return;
        }

        try {

            const res = await updateAlert();

            if (res?.isConfirmed) {
                const res = await faqUpdate({ id, payload }).unwrap();
                if (res) {
                    toast.success(res?.message)
                }
            }


        } catch (err) {
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
                    <form

                        className=" rounded-lg   "
                    >
                        {/* Post Title */}
                        <div className="flex flex-col">
                            <label className="mb-3  text-xl font-normal ">Question</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="px-4 py-2 border border-[#989DA3] rounded-[7px] focus:outline-none focus:ring-0 "

                                required
                            />
                        </div>



                        {/* Blog Description */}
                        <div className="flex flex-col mt-7 ">
                            <label className="mb-3  text-xl font-normal">Answer</label>
                            <Editor
                                value={description}
                                onTextChange={(e) => setDescription(e.htmlValue ?? "")}
                                style={{ height: "200px" }}
                                className="border rounded"
                            />
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
                            isLoading ? "Loading..." : 'Save'
                        }
                    </button>
                </div>
            </div>
        </>
    );
};

export default FaqUpdateModal;
